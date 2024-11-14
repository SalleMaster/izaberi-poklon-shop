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
