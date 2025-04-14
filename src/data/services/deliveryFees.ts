import 'server-only'

import { connection } from 'next/server'
import { cache } from 'react'
import prisma from '@/lib/db'
import { DeliveryFee } from '@prisma/client'

export type GetDeliveryFeesReturnType = Promise<DeliveryFee[]>

export const getDeliveryFees = cache(async (): GetDeliveryFeesReturnType => {
  console.log('getDeliveryFees')

  await connection()

  return await prisma.deliveryFee.findMany({
    orderBy: { fee: 'asc' },
  })
})
