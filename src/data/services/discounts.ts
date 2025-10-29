import 'server-only'

import { connection } from 'next/server'
import { cache } from 'react'
import prisma from '@/lib/db'

import { loggedInActionGuard } from '@/lib/actionGuard'
import { Discount } from '@/generated/prisma'

export type GetDiscountsReturnType = Promise<Discount[]>

type Props = {
  active: boolean
}

export const getDiscounts = cache(
  async ({ active }: Props): GetDiscountsReturnType => {
    console.log('getDiscounts')

    await connection()

    await loggedInActionGuard()

    return await prisma.discount.findMany({
      where: { active },
      orderBy: { updatedAt: 'desc' },
    })
  }
)
