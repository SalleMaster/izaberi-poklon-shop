import 'server-only'

import { connection } from 'next/server'
import { cache } from 'react'
import prisma from '@/lib/db'

import { Coupon } from '@prisma/client'

export type GetActiveCouponsReturnType = Promise<Coupon[]>

export const getActiveCoupons = cache(async (): GetActiveCouponsReturnType => {
  console.log('getActiveCoupons')

  await connection()

  return await prisma.coupon.findMany({
    where: {
      active: true,
    },
    orderBy: { createdAt: 'desc' },
  })
})

export type GetInactiveCouponsReturnType = Promise<Coupon[]>

export const getInactiveCoupons = cache(
  async (): GetInactiveCouponsReturnType => {
    console.log('getInactiveCoupons')

    await connection()

    return await prisma.coupon.findMany({
      where: {
        active: false,
      },
      orderBy: { createdAt: 'desc' },
    })
  }
)
