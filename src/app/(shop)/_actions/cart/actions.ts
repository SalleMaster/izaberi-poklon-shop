'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { loggedInActionGuard } from '@/lib/actionGuard'
import {
  productDetailsSchema,
  ProductDetailsValues,
} from '@/app/(shop)/products/[id]/_components/product-details-form/validation'
import {
  cartCouponSchema,
  CartCouponValues,
} from '../../cart/_components/cart-coupon-form/validation'
import { deleteMediaFromS3 } from '@/lib/actions'
import { DiscountType } from '@prisma/client'
import { priceFormatter } from '@/lib/format'

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
          onlinePrice: 0,
          totalPrice: 0,
          discount: 0,
          deliveryFee: 0,
          totalPriceWithDeliveryFee: 0,
        },
      })
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        priceTable: {
          include: { deliveryFee: true },
        },
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

    const cartItemDeliveryFee = product.priceTable.find(
      (priceItem) => quantity >= priceItem.from && quantity <= priceItem.to
    )?.deliveryFee.fee

    if (cartItemDeliveryFee === undefined) {
      throw new Error('Cena poštarine nije pronadjena za datu kolicinu.')
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
        deliveryFee: cartItemDeliveryFee,
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

    await updateCartOverviewData({ userId })

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
        priceTable: {
          include: { deliveryFee: true },
        },
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

    const cartItemDeliveryFee = product.priceTable.find(
      (priceItem) => quantity >= priceItem.from && quantity <= priceItem.to
    )?.deliveryFee.fee

    if (cartItemDeliveryFee === undefined) {
      throw new Error('Cena poštarine nije pronadjena za datu kolicinu.')
    }

    const totalCartItemPrice = cartItemPrice * quantity

    // Update the cart item
    await prisma.cartItem.update({
      where: { id },
      data: {
        quantity,
        price: totalCartItemPrice,
        deliveryFee: cartItemDeliveryFee,
      },
    })

    await updateCartOverviewData({ userId })

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

    await updateCartOverviewData({ userId })

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

export async function cartApplyCoupon(values: CartCouponValues) {
  try {
    const { userId } = await loggedInActionGuard()

    const { coupon } = cartCouponSchema.parse(values)

    const couponExists = await prisma.coupon.findUnique({
      where: { code: coupon },
    })

    if (!couponExists) {
      throw new Error('Kupon kod nije pronadjen.')
    }

    // Connect the coupon to the cart
    const cart = await prisma.cart.update({
      where: { userId },
      data: {
        coupon: {
          connect: { code: coupon },
        },
      },
      include: { items: true, coupon: true },
    })

    if (!cart) {
      throw new Error('Korpa nije pronadjena.')
    }

    if (cart.coupon) {
      const allItemsPrice = cart.items.reduce(
        (acc, item) => acc + item.price,
        0
      )
      const isCouponExpired = cart.coupon.expiresAt < new Date()
      const isCouponActive = cart.coupon.active
      const isCouponAvailable = cart.coupon.used < cart.coupon.available
      const isMinCartValue = allItemsPrice >= cart.coupon.cartValue

      const couponConditions =
        !isCouponExpired &&
        isCouponActive &&
        isCouponAvailable &&
        isMinCartValue

      if (!couponConditions) {
        await prisma.cart.update({
          where: { userId },
          data: {
            coupon: {
              disconnect: true,
            },
          },
        })

        let message = 'Kupon kod nije validan.'

        if (isCouponExpired) {
          message = 'Kupon kod je istekao.'
        } else if (!isCouponActive) {
          message = 'Kupon kod nije aktivan.'
        } else if (!isCouponAvailable) {
          message = 'Kupon kod više nije dostupan.'
        } else if (!isMinCartValue) {
          message = `Minimalna vrednost korpe za ovaj kupon je ${priceFormatter(cart.coupon.cartValue)}.`
        }

        throw new Error(message)
      }
    }

    await updateCartOverviewData({ userId })

    return {
      status: 'success',
      message: 'Kupon kod uspešno primenjen.',
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

export async function updateCartOverviewData({ userId }: { userId: string }) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: true, coupon: true },
  })

  if (cart) {
    const allItemsPrice = cart.items.reduce((acc, item) => acc + item.price, 0)
    const deliveryFee =
      cart.items.sort((a, b) => b.deliveryFee - a.deliveryFee)[0]
        ?.deliveryFee || 0
    const onlinePrice = allItemsPrice
    let totalPrice = allItemsPrice
    let totalPriceWithDeliveryFee = allItemsPrice + deliveryFee
    let discount = 0

    if (cart.coupon) {
      const isCouponExpired = cart.coupon.expiresAt < new Date()
      const isCouponActive = cart.coupon.active
      const isCouponAvailable = cart.coupon.used < cart.coupon.available
      const isMinCartValue = allItemsPrice >= cart.coupon.cartValue

      const couponConditions =
        !isCouponExpired &&
        isCouponActive &&
        isCouponAvailable &&
        isMinCartValue

      if (!couponConditions) {
        await prisma.cart.update({
          where: { userId },
          data: {
            coupon: {
              disconnect: true,
            },
          },
        })
      }

      if (couponConditions && cart.coupon.discountType === DiscountType.fixed) {
        totalPrice = allItemsPrice - cart.coupon.discount
        totalPriceWithDeliveryFee = totalPrice + deliveryFee
        discount = cart.coupon.discount
      } else if (
        couponConditions &&
        cart.coupon.discountType === DiscountType.percentage
      ) {
        totalPrice =
          allItemsPrice - (allItemsPrice * cart.coupon.discount) / 100
        totalPriceWithDeliveryFee = totalPrice + deliveryFee
        discount = (allItemsPrice * cart.coupon.discount) / 100
      }
    }

    await prisma.cart.update({
      where: { userId },
      data: {
        onlinePrice,
        totalPrice,
        discount,
        deliveryFee,
        totalPriceWithDeliveryFee,
      },
    })
  }
}
