import getSession from '@/lib/getSession'
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

  if (adminGuard && user.role !== 'admin') {
    redirect('/')
  }
}

export default pageGuard
