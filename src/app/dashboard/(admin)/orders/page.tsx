import { Metadata } from 'next'
import { Suspense } from 'react'
import OrdersPage, { OrdersPageSkeleton } from './OrdersPage'
import pageGuard from '@/lib/pageGuard'
import { getOrders, getOrdersCount } from '@/data/services/order'
import OrdersHeader from './_components/OrdersHeader'
import { Separator } from '@/components/ui/separator'
import { OrderSortingValues } from '@/lib/types'
import CustomPagination from '@/components/custom/CustomPagination'

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
  const { sortiranje, status, stranica, prikazi } = searchParams

  let orderBy: OrderByType

  switch (sortiranje) {
    case OrderSortingValues.Newest:
      orderBy = { createdAt: 'desc' }
      break
    case OrderSortingValues.Oldest:
      orderBy = { createdAt: 'asc' }
      break
    default:
      orderBy = { createdAt: 'desc' }
  }

  const page = stranica ? Number(stranica) : 1
  const pageSize = prikazi ? Number(prikazi) : 10
  const skip = (page - 1) * pageSize
  const take = pageSize

  const ordersPromise = getOrders({ orderBy, status, skip, take })
  const ordersCountPromise = getOrdersCount()

  return (
    <div className='space-y-5 group'>
      <OrdersHeader />

      <Separator />

      <Suspense fallback={<OrdersPageSkeleton />}>
        <OrdersPage ordersPromise={ordersPromise} />
        <CustomPagination
          countPromise={ordersCountPromise}
          pageUrl='/admin/porudzbine'
        />
      </Suspense>
    </div>
  )
}
