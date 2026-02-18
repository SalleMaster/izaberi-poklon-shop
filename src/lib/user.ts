import 'server-only'

import getSession from '@/lib/getSession'
import prisma from './db'
import { User } from '@/generated/prisma/client'

const getUserRole = async () => {
  const session = await getSession()
  const user = session?.user

  return user?.role
}

const getUserDetails = async (): Promise<User | null> => {
  const session = await getSession()
  const user = session?.user

  if (!user) {
    return null
  }

  return await prisma.user.findUnique({
    where: { id: user.id },
  })
}

export { getUserRole, getUserDetails }
