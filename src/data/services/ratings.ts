import 'server-only'

import { unstable_noStore } from 'next/cache'
import { cache } from 'react'
import prisma from '@/lib/db'
import { slow } from '@/lib/slow'
import { Rating, RatingStatusType } from '@prisma/client'

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
