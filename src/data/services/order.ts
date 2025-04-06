import 'server-only'

import { connection } from 'next/server'
import { cache } from 'react'
import prisma from '@/lib/db'

import { loggedInActionGuard, loggedInUser } from '@/lib/actionGuard'
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
  UserRoleType,
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
  userId?: string
  userRole: string | null
}

export const getOrders = cache(
  async ({
    orderBy = { createdAt: 'desc' },
    status,
    skip,
    take,
    userId,
    userRole,
  }: GetOrdersProps): GetOrdersReturnType => {
    console.log('getOrders')

    await connection()

    await loggedInActionGuard()

    const filterByStatus =
      !Array.isArray(status) && status && status in OrderStatusType

    const isAdmin = userRole === UserRoleType.admin

    const orders = await prisma.order.findMany({
      where: {
        ...(filterByStatus
          ? {
              status: status as OrderStatusType,
            }
          : {}),
        ...(!isAdmin ? { userId } : {}),
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
  userId?: string
  userRole: string | null
}

export const getOrdersCount = cache(
  async ({
    status,
    userId,
    userRole,
  }: GetOrdersCountProps): GetOrdersCountReturnType => {
    console.log('getOrdersCount')

    await connection()

    await loggedInActionGuard()

    const filterByStatus =
      !Array.isArray(status) && status && status in OrderStatusType

    const isAdmin = userRole === UserRoleType.admin

    return await prisma.order.count({
      where: {
        ...(filterByStatus
          ? {
              status: status as OrderStatusType,
            }
          : {}),
        ...(!isAdmin ? { userId } : {}),
      },
    })
  }
)

export type GetOrderReturnType = Promise<Order | null>

export type GetOrderProps = {
  id: string
  userId?: string
  userRole: string | null
}

export const getOrder = cache(
  async ({ id, userId, userRole }: GetOrderProps): GetOrderReturnType => {
    console.log('getOrder')

    await connection()

    await loggedInActionGuard()

    const isAdmin = userRole === UserRoleType.admin

    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    })

    if (isAdmin) {
      return order
    } else if (order?.userId === userId) {
      return order
    }

    return null
  }
)

export type GetOrderedProductIdsReturnType = Promise<string[]>

export const getOrderedProductIds = cache(
  async (): GetOrderedProductIdsReturnType => {
    console.log('getOrderedProductIds')

    await connection()

    const { userId } = await loggedInUser()

    if (!userId) {
      return []
    }

    const orders = await prisma.order.findMany({
      where: { userId },
    })

    const orderedProductIds = orders.flatMap((order) => {
      const orderCart = order.cart as unknown as OrderCartWithRelations
      return orderCart.items.map((item) => item.productId)
    })

    return orderedProductIds
  }
)
