import { Suspense } from 'react'
import { getCart } from '@/data/services/cart'
// import CartTable, {
//   CartTableSkeleton,
// } from './_components/cart-table/CartTable'
// import CartOverview, {
//   CartOverviewSkeleton,
// } from './_components/cart-overview/CartOverview'
import CartPage, { CartPageSkeleton } from './CartPage'

export default async function Page() {
  const cartPromise = getCart()

  return (
    <Suspense fallback={<CartPageSkeleton />}>
      <CartPage cartPromise={cartPromise} />
    </Suspense>
    // <div className='space-y-5'>
    //   <Suspense fallback={<CartTableSkeleton />}>
    //     <CartTable cartPromise={cartPromise} />
    //   </Suspense>
    //   <Suspense fallback={<CartOverviewSkeleton />}>
    //     <CartOverview cartPromise={cartPromise} />
    //   </Suspense>
    // </div>
  )
}
