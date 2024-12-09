import 'server-only'

import { unstable_noStore } from 'next/cache'
import { cache } from 'react'
import prisma from '@/lib/db'
import { slow } from '@/lib/slow'
import { loggedInActionGuard } from '@/lib/actionGuard'
import { DeliveryAddress } from '@prisma/client'

export type GetUserAddressesReturnType = Promise<DeliveryAddress[]>

export const getUserAddresses = cache(async (): GetUserAddressesReturnType => {
  console.log('getUserAddresses')

  unstable_noStore()
  await slow(1000)

  const { userId } = await loggedInActionGuard()

  return await prisma.deliveryAddress.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })
})
