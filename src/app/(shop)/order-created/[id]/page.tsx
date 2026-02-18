import { Metadata } from 'next'
import { Suspense } from 'react'
import pageGuard from '@/lib/pageGuard'
import { getOrder } from '@/data/services/order'
import { Separator } from '@/components/ui/separator'
import { UserRoleType } from '@/generated/prisma/enums'
import OrderCreatedPage, { OrderCreatedPageSkeleton } from './OrderCreatedPage'

export const metadata: Metadata = {
  title: 'Porudžbina kreirana',
}

export default async function Page({
  params,
}: PageProps<'/order-created/[id]'>) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageLoader params={params} />
    </Suspense>
  )
}

async function PageLoader({
  params,
}: Pick<PageProps<'/order-created/[id]'>, 'params'>) {
  const { id } = await params

  const { userId, userRole } = await pageGuard({
    callbackUrl: `/porudzbina-kreirana/${id}`,
  })

  const orderPromise = getOrder({
    id,
    userId,
    userRole,
  })

  const isAdmin = userRole === UserRoleType.admin

  return (
    <div className='space-y-5 group'>
      <h2 className='text-xl font-bold'>Hvala Vam na obavljenoj kupovini</h2>

      <Separator />

      <OrderCreatedPage orderPromise={orderPromise} isAdmin={isAdmin} />
    </div>
  )
}

function PageFallback() {
  return (
    <div className='space-y-5 group'>
      <h2 className='text-xl font-bold'>Hvala Vam na obavljenoj kupovini</h2>

      <Separator />

      <OrderCreatedPageSkeleton />
    </div>
  )
}
