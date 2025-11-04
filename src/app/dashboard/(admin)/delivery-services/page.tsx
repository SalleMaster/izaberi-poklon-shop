import { Metadata } from 'next'
import DeliveryServicesPage, {
  DeliveryServicesPageSkeleton,
} from './DeliveryServicesPage'
import pageGuard from '@/lib/pageGuard'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Kurirske službe | Admin',
}

export default async function Page() {
  return (
    <Suspense fallback={<DeliveryServicesPageSkeleton />}>
      <PageLoader />
    </Suspense>
  )
}

async function PageLoader() {
  await pageGuard({
    callbackUrl: '/admin/kurirske-sluzbe',
    adminGuard: true,
  })

  return <DeliveryServicesPage />
}
