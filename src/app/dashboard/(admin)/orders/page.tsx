import { Metadata } from 'next'
import { Suspense } from 'react'
import OrdersPage, { OrdersPageSkeleton } from './OrdersPage'
import pageGuard from '@/lib/pageGuard'
import { getAllOrders } from '@/data/services/order'

export const metadata: Metadata = {
  title: 'Admin | Porudžbine',
}

export default async function Page() {
  await pageGuard({
    callbackUrl: '/admin/porudzbine',
    adminGuard: true,
  })
  const ordersPromise = getAllOrders()

  return (
    <Suspense fallback={<OrdersPageSkeleton />}>
      <OrdersPage ordersPromise={ordersPromise} />
    </Suspense>
  )
}
