import 'server-only'

import { connection } from 'next/server'
import { cache } from 'react'
import prisma from '@/lib/db'

import { loggedInActionGuard } from '@/lib/actionGuard'
import { DeliveryService, Media } from '@prisma/client'

export type DeliveryServiceWithPdf = DeliveryService & {
  pdf: Media | null
}

export type GetDeliveryServicesReturnType = Promise<DeliveryServiceWithPdf[]>

type Props = {
  active: boolean
}

export const getDeliveryServices = cache(
  async ({ active }: Props): GetDeliveryServicesReturnType => {
    console.log('getDeliveryServices')

    await connection()

    await loggedInActionGuard()

    return await prisma.deliveryService.findMany({
      where: { active },
      include: { pdf: true },
      orderBy: { updatedAt: 'desc' },
    })
  }
)

// export type GetActiveDeliveryServicesReturnType = Promise<
//   DeliveryServiceWithPdf[]
// >

// export const getActiveDeliveryServices = cache(
//   async (): GetActiveDeliveryServicesReturnType => {
//     console.log('getActiveDeliveryServices')

//     await connection()

//     await loggedInActionGuard()

//     return await prisma.deliveryService.findMany({
//       where: { active: true },
//       include: { pdf: true },
//       orderBy: { updatedAt: 'desc' },
//     })
//   }
// )

// export type GetInactiveDeliveryServicesReturnType = Promise<
//   DeliveryServiceWithPdf[]
// >

// export const getInactiveDeliveryServices = cache(
//   async (): GetInactiveDeliveryServicesReturnType => {
//     console.log('getInactiveDeliveryServices')

//     await connection()

//     await loggedInActionGuard()

//     return await prisma.deliveryService.findMany({
//       where: { active: false },
//       include: { pdf: true },
//       orderBy: { updatedAt: 'desc' },
//     })
//   }
// )
