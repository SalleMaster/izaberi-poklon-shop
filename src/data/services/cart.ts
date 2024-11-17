import 'server-only'

import { unstable_noStore } from 'next/cache'
import { cache } from 'react'
import prisma from '@/lib/db'
import { slow } from '@/lib/slow'
import { loggedInActionGuard } from '@/lib/actionGuard'
import { subDays } from 'date-fns'
import { CartItem, Media, Product, PriceRange, Cart } from '@prisma/client'

export type CartItemWithRelations = CartItem & {
  product: Product & {
    coverImage: Media | null
    priceTable: PriceRange[]
  }
}

type CartWithRelations = Cart & {
  items: CartItemWithRelations[]
}

export type GetCartReturnType = Promise<CartWithRelations | null>

export const getCart = cache(async (): GetCartReturnType => {
  console.log('getCart')

  unstable_noStore()
  await slow(1000)

  const { userId } = await loggedInActionGuard()

  const getCart = async () => {
    return await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                coverImage: true,
                priceTable: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })
  }

  let cart = await getCart()

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                coverImage: true,
                priceTable: true,
              },
            },
          },
        },
      },
    })
  }

  // Remove cart items that are older than 2 days
  if (cart.items.length > 0) {
    const twoDaysAgo = subDays(new Date(), 2)

    const itemsToDelete = cart.items.filter(
      (item) => item.updatedAt < twoDaysAgo
    )
    if (itemsToDelete.length > 0) {
      await prisma.cartItem.deleteMany({
        where: {
          id: {
            in: itemsToDelete.map((item) => item.id),
          },
        },
      })

      cart = await getCart()
    }
  }

  return cart
})
