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

    // Add the product to the cart
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    })

    return {
      status: 'success',
      message: 'Proizvod dodat u korpu.',
    }
  } catch (error) {
    // Remove media if there is an error
    //   if (mediaId) {
    //     await deleteMedia(mediaId)
    //   }

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

export async function removeCartItem({ cartItemId }: { cartItemId: string }) {
  try {
    const { userId } = await loggedInActionGuard()

    // Fetch the cart item and include the cart relation
    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
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
      where: { id: cartItemId },
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
