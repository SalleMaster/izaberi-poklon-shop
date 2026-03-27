import 'server-only'

import { connection } from 'next/server'
import { cache } from 'react'
import prisma from '@/lib/db'

import { Media, Product, Rating, User } from '@/generated/prisma/client'
import { RatingStatusType } from '@/generated/prisma/enums'
import { adminActionGuard, loggedInUser } from '@/lib/actionGuard'

export type GetProductRatingsReturnType = Promise<Rating[]>

export type GetProductRatingsProps = {
  id: string
  status: RatingStatusType
}

export const getProductRatings = cache(
  async ({
    id,
    status,
  }: GetProductRatingsProps): GetProductRatingsReturnType => {
    console.log('getProductRatings')

    await connection()

    return await prisma.rating.findMany({
      where: {
        productId: id,
        status,
      },
    })
  },
)

export type GetProductAlreadyRatedReturnType = Promise<boolean>

export type GetProductAlreadyRatedProps = {
  id: string
}

export const getProductAlreadyRated = cache(
  async ({
    id,
  }: GetProductAlreadyRatedProps): GetProductAlreadyRatedReturnType => {
    console.log('getProductAlreadyRated')

    await connection()

    const { userId } = await loggedInUser()

    if (!userId) {
      return false
    }

    const ratings = await prisma.rating.findMany({
      where: {
        productId: id,
      },
    })

    return ratings.some((rating) => rating.userId === userId)
  },
)

export type ProductWithCoverImageType = Product & {
  coverImage: Media | null
}

export type RatingWithRelations = Rating & {
  user: User
  product: ProductWithCoverImageType
}

export type GetRatingsReturnType = Promise<RatingWithRelations[]>

export type GetRatingsProps = {
  orderBy?: { createdAt: 'asc' | 'desc' }
  status?: string | string[]
  skip?: number
  take?: number
}

export const getRatings = cache(
  async ({
    orderBy = { createdAt: 'desc' },
    status,
    skip,
    take,
  }: GetRatingsProps): GetRatingsReturnType => {
    console.log('getRatings')

    await connection()

    await adminActionGuard()

    const filterByStatus =
      !Array.isArray(status) && status && status in RatingStatusType

    return await prisma.rating.findMany({
      where: {
        ...(filterByStatus
          ? {
              status: status as RatingStatusType,
            }
          : {}),
      },
      include: {
        user: true,
        product: {
          include: {
            coverImage: true,
          },
        },
      },
      skip: skip && skip > 0 ? skip : undefined,
      take: take && take > 0 ? take : undefined,
      orderBy,
    })
  },
)

export type GetRatingsCountReturnType = Promise<number>

export type GetRatingsCountProps = {
  status?: string | string[]
}

export const getRatingsCount = cache(
  async ({ status }: GetRatingsCountProps): GetRatingsCountReturnType => {
    console.log('getRatingsCount')

    await connection()

    await adminActionGuard()

    const filterByStatus =
      !Array.isArray(status) && status && status in RatingStatusType

    return await prisma.rating.count({
      where: {
        ...(filterByStatus
          ? {
              status: status as RatingStatusType,
            }
          : {}),
      },
    })
  },
)
