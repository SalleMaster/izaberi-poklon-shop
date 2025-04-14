import { Suspense } from 'react'
import { getCart } from '@/data/services/cart'
import CartPage, { CartPageSkeleton } from './CartPage'
import pageGuard from '@/lib/pageGuard'
import { getUserAddresses } from '@/data/services/user'
import { getActiveDeliveryServices } from '@/data/services/delivery-services'

export default async function Page() {
  const { userName, userEmail, userPhone } = await pageGuard({
    callbackUrl: '/korpa',
  })
  const cartPromise = getCart()
  const userAddressesPromise = getUserAddresses()
  const deliveryServicesPromise = getActiveDeliveryServices()

  return (
    <Suspense fallback={<CartPageSkeleton />}>
      <CartPage
        cartPromise={cartPromise}
        userAddressesPromise={userAddressesPromise}
        deliveryServicesPromise={deliveryServicesPromise}
        userName={userName || ''}
        userEmail={userEmail || ''}
        userPhone={userPhone || ''}
      />
    </Suspense>
  )
}
