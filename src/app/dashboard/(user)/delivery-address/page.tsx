import { Metadata } from 'next'
import { Suspense } from 'react'
import DeliveryAddressPage, {
  DeliveryAddressPageSkeleton,
} from './DeliveryAddressPage'
import pageGuard from '@/lib/pageGuard'
import { getAllDeliveryAddresses } from '@/data/services/delivery-addresses'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Adresa dostave | Profil',
}

export default async function Page() {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageLoader />
    </Suspense>
  )
}

async function PageLoader() {
  await pageGuard({ callbackUrl: '/profil/adresa-dostave' })
  const deliveryAddressesPromise = getAllDeliveryAddresses()

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Adresa Dostave</h2>

      <Separator />

      <DeliveryAddressPage
        deliveryAddressesPromise={deliveryAddressesPromise}
      />
    </div>
  )
}

function PageFallback() {
  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Adresa Dostave</h2>

      <Separator />

      <DeliveryAddressPageSkeleton />
    </div>
  )
}
