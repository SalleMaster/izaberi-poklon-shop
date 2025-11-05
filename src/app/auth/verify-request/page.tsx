import { redirect } from 'next/navigation'
import getSession from '@/lib/getSession'
import { Suspense } from 'react'
import VerifyRequestPage from './VerifyRequest'

export default async function Page() {
  return (
    <Suspense fallback={<VerifyRequestPage />}>
      <PageLoader />
    </Suspense>
  )
}

async function PageLoader() {
  const session = await getSession()
  const user = session?.user

  if (user) {
    redirect('/')
  }

  return <VerifyRequestPage />
}
