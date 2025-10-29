import { Metadata } from 'next'
import { Suspense } from 'react'
import pageGuard from '@/lib/pageGuard'
import { getOrder } from '@/data/services/order'
import { Separator } from '@/components/ui/separator'
import { UserRoleType } from '@/generated/prisma'
import OrderCreatedPage, { OrderCreatedPageSkeleton } from './OrderCreatedPage'

export const metadata: Metadata = {
  title: 'Porudžbina kreirana',
}

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const { id } = params

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

      <Suspense fallback={<OrderCreatedPageSkeleton />}>
        <OrderCreatedPage orderPromise={orderPromise} isAdmin={isAdmin} />
      </Suspense>
    </div>
  )
}
