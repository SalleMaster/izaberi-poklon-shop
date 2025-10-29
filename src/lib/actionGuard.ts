import { UserRoleType } from '@/generated/prisma'
import getSession from '@/lib/getSession'

export const adminActionGuard = async () => {
  const session = await getSession()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  if (!userId || userRole !== UserRoleType.admin) {
    throw Error('Unauthorized')
  }

  return { userId, userRole }
}

export const loggedInActionGuard = async () => {
  const session = await getSession()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  if (!userId) {
    throw Error('Unauthorized')
  }

  return { userId, userRole }
}

export const loggedInUser = async () => {
  const session = await getSession()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  return { userId, userRole }
}
