'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { loggedInActionGuard } from '@/lib/actionGuard'

export async function addCartItem({
  productId,
  quantity,
}: {
  productId: string
  quantity: number
}) {
  try {
    const { userId } = await loggedInActionGuard()

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
      },
    })

    if (!product) {
      throw new Error('Poklon nije prodadjen.')
    }

    const cartItemPrice = product.priceTable.find(
      (priceItem) => quantity >= priceItem.from && quantity <= priceItem.to
    )?.price

    if (cartItemPrice === undefined) {
      throw new Error('Cena nije pronadjena za datu kolicinu.')
    }

    // Add the product to the cart
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
        price: cartItemPrice,
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

export type removeCartItemType = {
  id: string
}

export async function removeCartItem({ id }: removeCartItemType) {
  try {
    const { userId } = await loggedInActionGuard()

    // Fetch the cart item and include the cart relation
    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
      include: { cart: true },
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

export type updateCartItemType = {
  id: string
  quantity: number
}

export async function updateCartItem({ id, quantity }: updateCartItemType) {
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
      },
    })

    if (!product) {
      throw new Error('Poklon nije prodadjen.')
    }

    const cartItemPrice = product.priceTable.find(
      (priceItem) => quantity >= priceItem.from && quantity <= priceItem.to
    )?.price

    if (cartItemPrice === undefined) {
      throw new Error('Cena nije pronadjena za datu kolicinu.')
    }

    // Update the cart item
    await prisma.cartItem.update({
      where: { id },
      data: {
        quantity,
        price: cartItemPrice,
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
