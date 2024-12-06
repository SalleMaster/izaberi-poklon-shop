import { Suspense } from 'react'
import { getCart } from '@/data/services/cart'
import CartPage, { CartPageSkeleton } from './CartPage'
import pageGuard from '@/lib/pageGuard'
import { getUserAddresses } from '@/data/services/user'

export default async function Page() {
  await pageGuard({ callbackUrl: '/korpa' })
  const cartPromise = getCart()
  const userAddressesPromise = getUserAddresses()

  return (
    <Suspense fallback={<CartPageSkeleton />}>
      <CartPage
        cartPromise={cartPromise}
        userAddressesPromise={userAddressesPromise}
      />
    </Suspense>
  )
}
