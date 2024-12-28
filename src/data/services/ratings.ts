import 'server-only'

import { unstable_noStore } from 'next/cache'
import { cache } from 'react'
import prisma from '@/lib/db'
import { slow } from '@/lib/slow'
import { Rating, RatingStatusType } from '@prisma/client'
import { loggedInUser } from '@/lib/actionGuard'

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

    unstable_noStore()
    await slow(1000)

    return await prisma.rating.findMany({
      where: {
        productId: id,
        status,
      },
    })
  }
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

    unstable_noStore()
    await slow(1000)

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
  }
)
