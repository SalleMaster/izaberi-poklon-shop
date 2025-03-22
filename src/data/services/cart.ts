import 'server-only'

import { unstable_noStore } from 'next/cache'
import { cache } from 'react'
import prisma from '@/lib/db'
import { slow } from '@/lib/slow'
import { loggedInActionGuard, loggedInUser } from '@/lib/actionGuard'
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

  return cart
})

export type GetCartItemsNumberReturnType = Promise<number>

export const getCartItemsNumber = cache(
  async (): GetCartItemsNumberReturnType => {
    console.log('getCartItemsNumber')

    unstable_noStore()
    await slow(1000)

    const { userId } = await loggedInUser()

    if (!userId) {
      return 0
    }

    const getCart = async () => {
      return await prisma.cart.findUnique({
        where: { userId },
        include: {
          items: true,
        },
      })
    }

    const cart = await getCart()

    if (!cart) {
      return 0
    }

    const cartItemsNumber = cart?.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    )
    return cartItemsNumber
  }
)
