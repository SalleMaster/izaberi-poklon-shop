import { Metadata } from 'next'
import { Suspense } from 'react'
import OrdersPage, { OrdersPageSkeleton } from './OrdersPage'
import pageGuard from '@/lib/pageGuard'
import { getOrders, getOrdersCount } from '@/data/services/order'
import OrdersHeader from './_components/OrdersHeader'
import { Separator } from '@/components/ui/separator'
import { SortingValues } from '@/lib/types'
import CustomPagination from '@/components/custom/CustomPagination'
import { UserRoleType } from '@/generated/prisma'

export const metadata: Metadata = {
  title: 'Porudžbine | Admin',
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type OrderByType = { createdAt: 'desc' } | { createdAt: 'asc' }

export default async function Page(props: { searchParams: SearchParams }) {
  const { userId, userRole } = await pageGuard({
    callbackUrl: '/admin/porudzbine',
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
    userRole,
    orderBy,
    status,
    skip,
    take,
  })
  const ordersCountPromise = getOrdersCount({ userId, userRole, status })

  const isAdmin = userRole === UserRoleType.admin

  return (
    <div className='space-y-5 group'>
      <OrdersHeader />

      <Separator />

      <Suspense fallback={<OrdersPageSkeleton />}>
        <OrdersPage ordersPromise={ordersPromise} isAdmin={isAdmin} />
        <CustomPagination
          countPromise={ordersCountPromise}
          pageUrl='/admin/porudzbine'
        />
      </Suspense>
    </div>
  )
}
