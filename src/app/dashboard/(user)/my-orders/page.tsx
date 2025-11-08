import { Metadata } from 'next'
import { Suspense } from 'react'
import pageGuard from '@/lib/pageGuard'
import { getOrders, getOrdersCount } from '@/data/services/order'
import { Separator } from '@/components/ui/separator'
import { SortingValues } from '@/lib/types'
import OrdersHeader from '../../(admin)/orders/_components/OrdersHeader'
import OrdersPage, { OrdersPageSkeleton } from '../../(admin)/orders/OrdersPage'
import CustomPaginationOld from '@/components/custom/CustomPaginationOld'

export const metadata: Metadata = {
  title: 'Porudžbine | Profil',
}

type OrderByType = { createdAt: 'desc' } | { createdAt: 'asc' }

export default async function Page({
  searchParams,
}: PageProps<'/dashboard/my-orders'>) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageLoader searchParams={searchParams} />
    </Suspense>
  )
}

async function PageLoader({
  searchParams,
}: Pick<PageProps<'/dashboard/my-orders'>, 'searchParams'>) {
  const { userId, userRole } = await pageGuard({
    callbackUrl: '/profil/porudzbine',
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

      <OrdersPage ordersPromise={ordersPromise} isAdmin={false} />
      <CustomPaginationOld
        countPromise={ordersCountPromise}
        pageUrl='/profil/porudzbine'
      />
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
