import getSession from '@/lib/getSession'
import { UserRoleType } from '@prisma/client'
import { redirect } from 'next/navigation'

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
    redirect(`/api/auth/signin?callbackUrl=${callbackUrl}`)
  }

  const userId = user.id
  const userRole = user.role
  const userName = user.name
  const userEmail = user.email
  const userPhone = user.phone

  if (!userId || (adminGuard && userRole !== UserRoleType.admin)) {
    redirect('/')
  }

  return { userId, userRole, userName, userEmail, userPhone }
}

export default pageGuard
