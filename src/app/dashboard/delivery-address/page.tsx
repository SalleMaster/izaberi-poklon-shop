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
  await pageGuard({ callbackUrl: '/profil/adresa-dostave' })
  const deliveryAddressesPromise = getAllDeliveryAddresses()

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Adresa Dostave</h2>

      <Separator />

      <Suspense fallback={<DeliveryAddressPageSkeleton />}>
        <DeliveryAddressPage
          deliveryAddressesPromise={deliveryAddressesPromise}
        />
      </Suspense>
    </div>
  )
}
