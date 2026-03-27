import 'server-only'

import { connection } from 'next/server'
import { cache } from 'react'
import prisma from '@/lib/db'

import { adminActionGuard, loggedInActionGuard } from '@/lib/actionGuard'
import { DeliveryAddress, User } from '@/generated/prisma/client'
import { UserRoleType } from '@/generated/prisma/enums'

export type GetUserAddressesReturnType = Promise<DeliveryAddress[]>

export const getUserAddresses = cache(async (): GetUserAddressesReturnType => {
  console.log('getUserAddresses')

  await connection()

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

    await connection()

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
  },
)

export type GetUsersReturnType = Promise<User[]>

export type GetUsersProps = {
  orderBy?: { createdAt: 'asc' | 'desc' }
  role?: string | string[]
  skip?: number
  take?: number
}

export const getUsers = cache(
  async ({
    orderBy = { createdAt: 'desc' },
    role,
    skip,
    take,
  }: GetUsersProps): GetUsersReturnType => {
    console.log('getUsers')

    await connection()

    await adminActionGuard()

    const filterByRole = !Array.isArray(role) && role && role in UserRoleType

    const users = await prisma.user.findMany({
      where: {
        ...(filterByRole
          ? {
              role: role as UserRoleType,
            }
          : {}),
      },
      skip: skip && skip > 0 ? skip : undefined,
      take: take && take > 0 ? take : undefined,
      orderBy,
    })

    return users
  },
)

export type GetUsersCountReturnType = Promise<number>

export type GetUsersCountProps = {
  role?: string | string[]
}

export const getUsersCount = cache(
  async ({ role }: GetUsersCountProps): GetUsersCountReturnType => {
    console.log('getUsersCount')

    await connection()

    await adminActionGuard()

    const filterByRole = !Array.isArray(role) && role && role in UserRoleType

    return await prisma.user.count({
      where: {
        ...(filterByRole
          ? {
              role: role as UserRoleType,
            }
          : {}),
      },
    })
  },
)

export type GetUserProps = {
  id: string
}

export type GetUserReturnType = Promise<User | null>

export const getUser = cache(
  async ({ id }: GetUserProps): GetUserReturnType => {
    console.log('getUser')

    await connection()

    await adminActionGuard()

    return await prisma.user.findUnique({
      where: {
        id,
      },
    })
  },
)
