import { Metadata } from 'next'
import { Suspense } from 'react'
import pageGuard from '@/lib/pageGuard'
import { getOrders, getOrdersCount } from '@/data/services/order'
import { Separator } from '@/components/ui/separator'
import { SortingValues } from '@/lib/types'
import CustomPagination from '@/components/custom/CustomPagination'
import OrdersHeader from '../(admin)/orders/_components/OrdersHeader'
import OrdersPage, { OrdersPageSkeleton } from '../(admin)/orders/OrdersPage'

export const metadata: Metadata = {
  title: 'Porudžbine | Profil',
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type OrderByType = { createdAt: 'desc' } | { createdAt: 'asc' }

export default async function Page(props: { searchParams: SearchParams }) {
  const { userId, userRole } = await pageGuard({
    callbackUrl: '/profil/porudzbine',
  })

  const searchParams = await props.searchParams
  const { sortiranje, status, stranica, prikazi } = searchParams

  let orderBy: OrderByType

  switch (sortiranje) {
    case SortingValues.Newest:
      orderBy = { createdAt: 'desc' }
      break
    case SortingValues.Oldest:
      orderBy = { createdAt: 'asc' }
      break
    default:
      orderBy = { createdAt: 'desc' }
  }

  const page = stranica ? Number(stranica) : 1
  const pageSize = prikazi ? Number(prikazi) : 10
  const skip = (page - 1) * pageSize
  const take = pageSize

  const ordersPromise = getOrders({
    userId,
    userRole: 'user',
    orderBy,
    status,
    skip,
    take,
  })
  const ordersCountPromise = getOrdersCount({ userId, userRole, status })

  return (
    <div className='space-y-5 group'>
      <OrdersHeader />

      <Separator />

      <Suspense fallback={<OrdersPageSkeleton />}>
        <OrdersPage ordersPromise={ordersPromise} isAdmin={false} />
        <CustomPagination
          countPromise={ordersCountPromise}
          pageUrl='/profil/porudzbine'
        />
      </Suspense>
    </div>
  )
}
