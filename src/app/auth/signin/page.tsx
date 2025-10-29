import { Metadata } from 'next'
import getSession from '@/lib/getSession'
import { redirect } from 'next/navigation'
import SignInPage from './SignInPage'

export const metadata: Metadata = {
  title: 'Prijava | Izaberi Poklon Shop',
}

export default async function Page() {
  const session = await getSession()

  if (session) {
    redirect('/')
  }

  return <SignInPage />
}
