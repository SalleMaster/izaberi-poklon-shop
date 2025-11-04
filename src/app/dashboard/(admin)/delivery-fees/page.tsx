import { Metadata } from 'next'
import DeliveryFeesPage, { DeliveryFeesPageSkeleton } from './DeliveryFeesPage'
import pageGuard from '@/lib/pageGuard'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Poštarine | Admin',
}

export default async function Page() {
  return (
    <Suspense fallback={<DeliveryFeesPageSkeleton />}>
      <PageLoader />
    </Suspense>
  )
}

async function PageLoader() {
  await pageGuard({
    callbackUrl: '/admin/postarine',
    adminGuard: true,
  })

  return <DeliveryFeesPage />
}
