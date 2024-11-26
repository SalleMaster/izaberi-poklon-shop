'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { loggedInActionGuard } from '@/lib/actionGuard'
import {
  productDetailsSchema,
  ProductDetailsValues,
} from '@/app/(shop)/products/[id]/_components/product-details-form/validation'
import { deleteMediaFromS3 } from '@/lib/actions'

type ProductDetailsWithoutImageFiles = Omit<
  ProductDetailsValues,
  'imagePersonalizations'
>
const productDetailsSchemaWithoutImages = productDetailsSchema.omit({
  imagePersonalizations: true,
})

export async function addCartItem(
  values: ProductDetailsWithoutImageFiles,
  imageMedias?: { fieldName: string; ids: string[] }[]
) {
  try {
    const { userId } = await loggedInActionGuard()

    const { productId, quantity, fontType, textPersonalizations } =
      productDetailsSchemaWithoutImages.parse(values)

    // Find or create a cart for the user
    let cart = await prisma.cart.findUnique({
      where: { userId },
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
        },
      })
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        priceTable: true,
        discount: true,
      },
    })

    if (!product) {
      throw new Error('Poklon nije prodadjen.')
    }

    let cartItemPrice = product.priceTable.find(
      (priceItem) => quantity >= priceItem.from && quantity <= priceItem.to
    )?.price

    if (cartItemPrice === undefined) {
      throw new Error('Cena nije pronadjena za datu kolicinu.')
    }

    if (product.discount?.active) {
      cartItemPrice = Math.floor(
        cartItemPrice - (cartItemPrice * product.discount.percentage) / 100
      )
    }

    const totalCartItemPrice = cartItemPrice * quantity

    // Add the product to the cart
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
        fontType,
        price: totalCartItemPrice,
        textPersonalizations: {
          create: textPersonalizations?.map((field) => ({
            name: field.name,
            value: field.value,
          })),
        },
        imagePersonalizations: {
          create: imageMedias?.map((imageMedia) => ({
            name: imageMedia.fieldName,
            images: {
              connect: imageMedia.ids.map((id) => ({ id })),
            },
          })),
        },
      },
    })

    return {
      status: 'success',
      message: 'Proizvod dodat u korpu.',
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 'fail',
        message: error.message,
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/cart') // Revalidate cart page
  }
}

export type updateCartItemType = {
  id: string
  quantity: number
}

export async function updateCartItem({ id, quantity }: updateCartItemType) {
  console.log('updateCartItem ', quantity)
  try {
    const { userId } = await loggedInActionGuard()

    // Fetch the cart item and include the cart relation
    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
      include: { cart: true, product: true },
    })

    // Verify that the cart item belongs to the user's cart
    if (!cartItem || cartItem.cart.userId !== userId) {
      return {
        status: 'fail',
        message: 'Došlo je do greške. Molimo pokušajte ponovo.',
      }
    }

    const product = await prisma.product.findUnique({
      where: { id: cartItem.productId },
      include: {
        priceTable: true,
        discount: true,
      },
    })

    if (!product) {
      throw new Error('Poklon nije prodadjen.')
    }

    let cartItemPrice = product.priceTable.find(
      (priceItem) => quantity >= priceItem.from && quantity <= priceItem.to
    )?.price

    if (cartItemPrice === undefined) {
      throw new Error('Cena nije pronadjena za datu kolicinu.')
    }

    if (product.discount?.active) {
      cartItemPrice = Math.floor(
        cartItemPrice - (cartItemPrice * product.discount.percentage) / 100
      )
    }

    const totalCartItemPrice = cartItemPrice * quantity

    // Update the cart item
    await prisma.cartItem.update({
      where: { id },
      data: {
        quantity,
        price: totalCartItemPrice,
      },
    })

    return {
      status: 'success',
      message: 'Kolicina promenjena.',
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 'fail',
        message: error.message,
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/cart') // Revalidate cart page
  }
}

export type removeCartItemType = {
  id: string
}

export async function removeCartItem({ id }: removeCartItemType) {
  try {
    const { userId } = await loggedInActionGuard()

    // Fetch the cart item and include the cart relation
    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
      include: {
        cart: true,
        imagePersonalizations: { include: { images: true } },
      },
    })

    // Verify that the cart item belongs to the user's cart
    if (!cartItem || cartItem.cart.userId !== userId) {
      return {
        status: 'fail',
        message: 'Došlo je do greške. Molimo pokušajte ponovo.',
      }
    }

    // Delete the cart item
    await prisma.cartItem.delete({
      where: { id },
    })

    if (cartItem.imagePersonalizations.length > 0) {
      const imageKeys = cartItem.imagePersonalizations
        .map((imagePersonalization) => imagePersonalization.images)
        .flat()
        .map((image) => image.key)

      await Promise.all(
        imageKeys.map(async (key) => {
          await deleteMediaFromS3(key)
        })
      )
    }

    return {
      status: 'success',
      message: 'Proizvod uklonjen iz korpe.',
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 'fail',
        message: error.message,
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/cart') // Revalidate cart page
  }
}
