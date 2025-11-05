import { Suspense } from 'react'
import { Metadata } from 'next'
import CouponsPage, { CouponsPageSkeleton } from './CouponsPage'
import pageGuard from '@/lib/pageGuard'

export const metadata: Metadata = {
  title: 'Kuponi | Admin',
}

export default async function Page() {
  return (
    <Suspense fallback={<CouponsPageSkeleton />}>
      <PageLoader />
    </Suspense>
  )
}

async function PageLoader() {
  await pageGuard({
    callbackUrl: '/admin/kuponi',
    adminGuard: true,
  })

  return <CouponsPage />
}
