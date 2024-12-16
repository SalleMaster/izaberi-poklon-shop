import { Metadata } from 'next'
import { Suspense } from 'react'
import OrdersPage, { OrdersPageSkeleton } from './OrdersPage'
import pageGuard from '@/lib/pageGuard'
import { getOrders } from '@/data/services/order'
import OrdersHeader from './_components/OrdersHeader'
import { Separator } from '@/components/ui/separator'
import { OrderSortingValues } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Admin | Porudžbine',
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type OrderByType = { createdAt: 'desc' } | { createdAt: 'asc' }

export default async function Page(props: { searchParams: SearchParams }) {
  await pageGuard({
    callbackUrl: '/admin/porudzbine',
    adminGuard: true,
  })

  const searchParams = await props.searchParams
  const { sortiranje, status } = searchParams

  let orderBy: OrderByType

  switch (sortiranje) {
    case OrderSortingValues.Najnovije:
      orderBy = { createdAt: 'desc' }
      break
    case OrderSortingValues.Najstarije:
      orderBy = { createdAt: 'asc' }
      break
    default:
      orderBy = { createdAt: 'desc' }
  }

  const ordersPromise = getOrders({ orderBy, status })

  return (
    <div className='space-y-5 group'>
      <OrdersHeader />

      <Separator />

      <Suspense fallback={<OrdersPageSkeleton />}>
        <OrdersPage ordersPromise={ordersPromise} />
      </Suspense>
    </div>
  )
}
