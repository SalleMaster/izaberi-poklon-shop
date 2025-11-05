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

type OrderByType = { createdAt: 'desc' } | { createdAt: 'asc' }

export default async function Page({
  searchParams,
}: PageProps<'/dashboard/orders'>) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageLoader searchParams={searchParams} />
    </Suspense>
  )
}

async function PageLoader({
  searchParams,
}: Pick<PageProps<'/dashboard/orders'>, 'searchParams'>) {
  const { userId, userRole } = await pageGuard({
    callbackUrl: '/admin/porudzbine',
  })
  const { sortiranje, status, stranica, prikazi } = await searchParams

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

function PageFallback() {
  return (
    <div className='space-y-5 group'>
      <h2 className='text-xl font-bold'>Porudžbine</h2>

      <Separator />

      <OrdersPageSkeleton />
    </div>
  )
}
