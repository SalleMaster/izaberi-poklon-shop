import { auth } from '@/auth'
import { UserRoleType } from '@prisma/client'

export const adminActionGuard = async () => {
  const session = await auth()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  if (!userId || userRole !== UserRoleType.admin) {
    throw Error('Unauthorized')
  }

  return { userId, userRole }
}

export const loggedInActionGuard = async () => {
  const session = await auth()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  if (!userId) {
    throw Error('Unauthorized')
  }

  return { userId, userRole }
}

export const loggedInUser = async () => {
  const session = await auth()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  return { userId, userRole }
}
