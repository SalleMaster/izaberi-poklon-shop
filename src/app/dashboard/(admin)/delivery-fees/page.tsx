import { Metadata } from 'next'
import DeliveryFeesPage, { DeliveryFeesPageSkeleton } from './DeliveryFeesPage'
import pageGuard from '@/lib/pageGuard'
import { getDeliveryFees } from '@/data/services/deliveryFees'
import { Separator } from '@/components/ui/separator'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Poštarine | Admin',
}

export default async function Page() {
  await pageGuard({
    callbackUrl: '/admin/postarine',
    adminGuard: true,
  })

  const deliveryFeesPromise = getDeliveryFees()

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Poštarine</h2>

      <Separator />

      <Suspense fallback={<DeliveryFeesPageSkeleton />}>
        <DeliveryFeesPage deliveryFeesPromise={deliveryFeesPromise} />
      </Suspense>
    </div>
  )
}
