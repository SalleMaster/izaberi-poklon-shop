import 'server-only'

import { unstable_noStore } from 'next/cache'
import { cache } from 'react'
import prisma from '@/lib/db'
import { slow } from '@/lib/slow'
import { loggedInActionGuard } from '@/lib/actionGuard'
import {
  Cart,
  CartItem,
  Coupon,
  ImagePersonalization,
  Media,
  Order,
  PriceRange,
  Product,
  TextPersonalization,
} from '@prisma/client'

type ImagePersonalizationWithRelations = ImagePersonalization & {
  images: Media[]
}

export type OrderCartItemWithRelations = CartItem & {
  product: Product & {
    coverImage: Media | null
    priceTable: PriceRange[]
  }
  textPersonalizations: TextPersonalization[]
  imagePersonalizations: ImagePersonalizationWithRelations[]
}

export type OrderCartWithRelations = Cart & {
  items: OrderCartItemWithRelations[]
  coupon: Coupon | null
}

export type GetAllOrdersReturnType = Promise<Order[]>

export const getAllOrders = cache(async (): GetAllOrdersReturnType => {
  console.log('getAllOrders')

  unstable_noStore()
  await slow(1000)

  await loggedInActionGuard()

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return orders
})
