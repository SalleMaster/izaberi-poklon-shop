import 'server-only'

import { connection } from 'next/server'
import { cache } from 'react'
import prisma from '@/lib/db'

import { loggedInActionGuard } from '@/lib/actionGuard'
import { DeliveryService } from '@prisma/client'

export type GetDeliveryServicesReturnType = Promise<DeliveryService[]>

export const getAllDeliveryServices = cache(
  async (): GetDeliveryServicesReturnType => {
    console.log('getAllDeliveryServices')

    await connection()

    await loggedInActionGuard()

    const deliveryServices = await prisma.deliveryService.findMany({
      where: { active: true },
      orderBy: { updatedAt: 'desc' },
    })

    return deliveryServices
  }
)
