import { Suspense } from 'react'
import { getCart } from '@/data/services/cart'
import CartTable, { CartTableSkeleton } from './_components/CartTable'

export default async function CartPage() {
  const cartPromise = getCart()

  return (
    <div className='space-y-5'>
      <Suspense fallback={<CartTableSkeleton />}>
        <CartTable cartPromise={cartPromise} />
      </Suspense>
    </div>
  )
}
