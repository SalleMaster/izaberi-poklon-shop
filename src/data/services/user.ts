import 'server-only'

import { unstable_noStore } from 'next/cache'
import { cache } from 'react'
import prisma from '@/lib/db'
import { slow } from '@/lib/slow'
import { loggedInActionGuard } from '@/lib/actionGuard'
import { DeliveryAddress, UserRoleType } from '@prisma/client'

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

export type GetUserProfileProps = {
  id: string
}

export type GetUserProfileReturnType = Promise<{
  id: string
  name: string | null
  phone: string | null
  email: string
} | null>

export const getUserProfile = cache(
  async ({ id }: GetUserProfileProps): GetUserProfileReturnType => {
    console.log('getUserProfile')

    unstable_noStore()
    await slow(1000)

    const { userId, userRole } = await loggedInActionGuard()
    const isAdmin = userRole === UserRoleType.admin

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
      },
    })

    if (isAdmin || user?.id === userId) {
      return user
    }

    return null
  }
)
