import 'server-only'

import { connection } from 'next/server'
import { cache } from 'react'
import prisma from '@/lib/db'

import { Coupon } from '@/generated/prisma'

export type GetCouponsReturnType = Promise<Coupon[]>

type Props = {
  active: boolean
}

export const getCoupons = cache(
  async ({ active }: Props): GetCouponsReturnType => {
    console.log('getCoupons')

    await connection()

    return await prisma.coupon.findMany({
      where: {
        active,
      },
      orderBy: { createdAt: 'desc' },
    })
  }
)
