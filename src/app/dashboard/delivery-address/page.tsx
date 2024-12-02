import { Metadata } from 'next'
import { Suspense } from 'react'
import DeliveryAddressPage, {
  DeliveryAddressPageSkeleton,
} from './DeliveryAddressPage'
import pageGuard from '@/lib/pageGuard'
import { getAllDeliveryAddresses } from '@/data/services/delivery-addresses'

export const metadata: Metadata = {
  title: 'Adresa dostave | Profil',
}

export default async function Page() {
  await pageGuard({ callbackUrl: '/profil/adresa-dostave' })
  const deliveryAddressesPromise = getAllDeliveryAddresses()

  return (
    <Suspense fallback={<DeliveryAddressPageSkeleton />}>
      <DeliveryAddressPage
        deliveryAddressesPromise={deliveryAddressesPromise}
      />
    </Suspense>
  )
}
