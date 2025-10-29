import { Metadata } from 'next'
import getSession from '@/lib/getSession'
import { redirect } from 'next/navigation'
import SignInPage from './SignInPage'

export const metadata: Metadata = {
  title: 'Prijava | Izaberi Poklon Shop',
}

export default async function Page(props: PageProps<'/auth/signin'>) {
  const searchParams = await props.searchParams
  const callbackUrlSearchParam = searchParams.callbackUrl
  const callbackUrl =
    typeof callbackUrlSearchParam === 'string' ? callbackUrlSearchParam : '/'

  const session = await getSession()

  if (session) {
    redirect(callbackUrl)
  }

  return <SignInPage />
}
