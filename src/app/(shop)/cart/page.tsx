import { Suspense } from 'react'
import { getCart } from '@/data/services/cart'
import CartPage, { CartPageSkeleton } from './CartPage'
import pageGuard from '@/lib/pageGuard'

export default async function Page() {
  const cartPromise = getCart()
  await pageGuard({ callbackUrl: '/korpa' })

  return (
    <Suspense fallback={<CartPageSkeleton />}>
      <CartPage cartPromise={cartPromise} />
    </Suspense>
  )
}
