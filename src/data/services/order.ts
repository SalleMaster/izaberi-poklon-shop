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
  OrderStatusType,
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

export type GetOrdersReturnType = Promise<Order[]>

export type GetOrdersProps = {
  orderBy?: { createdAt: 'asc' | 'desc' }
  status?: string | string[]
  skip?: number
  take?: number
}

export const getOrders = cache(
  async ({
    orderBy = { createdAt: 'desc' },
    status,
    skip,
    take,
  }: GetOrdersProps): GetOrdersReturnType => {
    console.log('getOrders')

    unstable_noStore()
    await slow(1000)

    await loggedInActionGuard()

    const filterByStatus =
      !Array.isArray(status) && status && status in OrderStatusType

    const orders = await prisma.order.findMany({
      where: {
        ...(filterByStatus
          ? {
              status: status as OrderStatusType,
            }
          : {}),
      },
      skip: skip && skip > 0 ? skip : undefined,
      take: take && take > 0 ? take : undefined,
      orderBy,
    })

    return orders
  }
)

export type GetOrdersCountReturnType = Promise<number>

export type GetOrdersCountProps = {
  status?: string | string[]
}

export const getOrdersCount = cache(
  async ({ status }: GetOrdersCountProps): GetOrdersCountReturnType => {
    console.log('getOrdersCount')

    unstable_noStore()
    await slow(1000)

    await loggedInActionGuard()

    const filterByStatus =
      !Array.isArray(status) && status && status in OrderStatusType

    return await prisma.order.count({
      where: {
        ...(filterByStatus
          ? {
              status: status as OrderStatusType,
            }
          : {}),
      },
    })
  }
)
