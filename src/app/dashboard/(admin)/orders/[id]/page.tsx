import { Metadata } from 'next'
import { Suspense } from 'react'
import pageGuard from '@/lib/pageGuard'
import { getOrder } from '@/data/services/order'
import { Separator } from '@/components/ui/separator'
import { UserRoleType } from '@/generated/prisma/enums'
import OrderPage, { OrderPageSkeleton } from './OrderPage'

export const metadata: Metadata = {
  title: 'Admin | Porudžbine',
}

export default async function Page({
  params,
}: PageProps<'/dashboard/orders/[id]'>) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageLoader params={params} />
    </Suspense>
  )
}

async function PageLoader({
  params,
}: Pick<PageProps<'/dashboard/orders/[id]'>, 'params'>) {
  const { id } = await params

  const { userId, userRole } = await pageGuard({
    callbackUrl: `/profil/porudzbine/${id}`,
  })

  const orderPromise = getOrder({
    id,
    userId,
    userRole,
  })

  const isAdmin = userRole === UserRoleType.admin

  return (
    <div className='space-y-5 group'>
      <h2 className='text-xl font-bold'>Detalji porudžbine</h2>

      <Separator />

      <Suspense fallback={<OrderPageSkeleton />}>
        <OrderPage orderPromise={orderPromise} isAdmin={isAdmin} />
      </Suspense>
    </div>
  )
}

function PageFallback() {
  return (
    <div className='space-y-5 group'>
      <h2 className='text-xl font-bold'>Detalji porudžbine</h2>

      <Separator />

      <OrderPageSkeleton />
    </div>
  )
}
