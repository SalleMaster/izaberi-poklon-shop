import 'server-only'

import { connection } from 'next/server'
import { cache } from 'react'
import prisma from '@/lib/db'

import { loggedInActionGuard } from '@/lib/actionGuard'
import { DeliveryAddress } from '@/generated/prisma/client'

export type GetDeliveryAddressesReturnType = Promise<DeliveryAddress[]>

export const getAllDeliveryAddresses = cache(
  async (): GetDeliveryAddressesReturnType => {
    console.log('getAllDeliveryAddresses')

    await connection()

    const { userId } = await loggedInActionGuard()

    const deliveryAddresses = await prisma.deliveryAddress.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    return deliveryAddresses
  },
)
