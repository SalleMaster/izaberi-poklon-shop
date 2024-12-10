import 'server-only'

import { unstable_noStore } from 'next/cache'
import { cache } from 'react'
import prisma from '@/lib/db'
import { slow } from '@/lib/slow'
import { loggedInActionGuard } from '@/lib/actionGuard'
import { subDays } from 'date-fns'
import {
  CartItem,
  Media,
  Product,
  PriceRange,
  Cart,
  Coupon,
} from '@prisma/client'
import { updateCartOverviewData } from '@/app/(shop)/_actions/cart/actions'

export type CartItemWithRelations = CartItem & {
  product: Product & {
    coverImage: Media | null
    priceTable: PriceRange[]
  }
}

export type CartWithRelations = Cart & {
  items: CartItemWithRelations[]
  coupon: Coupon | null
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
        coupon: true,
      },
    })
  }

  let cart = await getCart()

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
        coupon: true,
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

      await updateCartOverviewData({ userId })

      cart = await getCart()
    }
  }

  return cart
})
