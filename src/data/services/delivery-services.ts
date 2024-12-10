import 'server-only'

import { unstable_noStore } from 'next/cache'
import { cache } from 'react'
import prisma from '@/lib/db'
import { slow } from '@/lib/slow'
import { loggedInActionGuard } from '@/lib/actionGuard'
import { DeliveryService } from '@prisma/client'

export type GetDeliveryServicesReturnType = Promise<DeliveryService[]>

export const getAllDeliveryServices = cache(
  async (): GetDeliveryServicesReturnType => {
    console.log('getAllDeliveryServices')

    unstable_noStore()
    await slow(1000)

    await loggedInActionGuard()

    const deliveryServices = await prisma.deliveryService.findMany({
      where: { active: true },
      orderBy: { updatedAt: 'desc' },
    })

    return deliveryServices
  }
)
