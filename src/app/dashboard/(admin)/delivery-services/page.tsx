import { Metadata } from 'next'
import DeliveryServicesPage, {
  DeliveryServicesPageSkeleton,
} from './DeliveryServicesPage'
import pageGuard from '@/lib/pageGuard'
import { getDeliveryServices } from '@/data/services/delivery-services'
import { Separator } from '@/components/ui/separator'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Kurirske službe | Admin',
}

export default async function Page() {
  await pageGuard({
    callbackUrl: '/admin/kurirske-sluzbe',
    adminGuard: true,
  })

  const activeDeliveryServicesPromise = getDeliveryServices({ active: true })
  const inactiveDeliveryServicesPromise = getDeliveryServices({ active: false })

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Kurirske Službe</h2>

      <Separator />

      <Suspense fallback={<DeliveryServicesPageSkeleton />}>
        <DeliveryServicesPage
          activeDeliveryServicesPromise={activeDeliveryServicesPromise}
          inactiveDeliveryServicesPromise={inactiveDeliveryServicesPromise}
        />
      </Suspense>
    </div>
  )
}
