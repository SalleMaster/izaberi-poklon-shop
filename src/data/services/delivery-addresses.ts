import 'server-only'

import { unstable_noStore } from 'next/cache'
import { cache } from 'react'
import prisma from '@/lib/db'
import { slow } from '@/lib/slow'
import { loggedInActionGuard } from '@/lib/actionGuard'
import { DeliveryAddress } from '@prisma/client'

export type GetDeliveryAddressesReturnType = Promise<DeliveryAddress[]>

export const getAllDeliveryAddresses = cache(
  async (): GetDeliveryAddressesReturnType => {
    console.log('getAllDeliveryAddresses')

    unstable_noStore()
    await slow(1000)

    const { userId } = await loggedInActionGuard()

    const deliveryAddresses = await prisma.deliveryAddress.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    return deliveryAddresses
  }
)
