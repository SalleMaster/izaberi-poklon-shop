import { Metadata } from 'next'
import getSession from '@/lib/getSession'
import { redirect } from 'next/navigation'
import SignInPage, { SignInPageFallback } from './SignInPage'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Prijava | Izaberi Poklon Shop',
}

export default async function Page(props: PageProps<'/auth/signin'>) {
  return (
    <Suspense fallback={<SignInPageFallback />}>
      <PageLoader searchParams={props.searchParams} />
    </Suspense>
  )
}

async function PageLoader({
  searchParams,
}: Pick<PageProps<'/auth/signin'>, 'searchParams'>) {
  const callbackUrlSearchParam = (await searchParams).callbackUrl
  const callbackUrl =
    typeof callbackUrlSearchParam === 'string' ? callbackUrlSearchParam : '/'

  const session = await getSession()

  if (session) {
    redirect(callbackUrl)
  }

  return <SignInPage />
}
