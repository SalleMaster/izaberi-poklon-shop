import getSession from '@/lib/getSession'
import { UserRoleType } from '@/generated/prisma'
import { redirect } from 'next/navigation'
import prisma from './db'

type PageGuardParams = {
  callbackUrl: string
  adminGuard?: boolean
}

const pageGuard = async ({
  callbackUrl,
  adminGuard = false,
}: PageGuardParams) => {
  const session = await getSession()
  const user = session?.user

  if (!user) {
    redirect(`/auth/signin?callbackUrl=${callbackUrl}`)
  }

  const userDetails = await prisma.user.findUnique({
    where: { id: user.id },
  })

  const userId = user.id
  const userRole = user.role
  const userName = user.name
  const userEmail = user.email
  const userPhone = userDetails?.phone || ''

  if (!userId || (adminGuard && userRole !== UserRoleType.admin)) {
    redirect('/')
  }

  return { userId, userRole, userName, userEmail, userPhone }
}

export default pageGuard
