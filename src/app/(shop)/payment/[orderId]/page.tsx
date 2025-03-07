import { Metadata } from 'next'
import { Suspense } from 'react'
import pageGuard from '@/lib/pageGuard'
import { getOrder } from '@/data/services/order'
import PaymentPage, { PaymentPageSkeleton } from './PaymentPage'

export const metadata: Metadata = {
  title: 'Plaćanje narudžbine',
  description: 'Plaćanje narudžbine',
}

type PageProps = {
  params: Promise<{ orderId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const searchParams = await props.searchParams

  const { orderId } = params
  const { checkoutId } = searchParams

  const { userId, userRole } = await pageGuard({
    callbackUrl: `/placanje/${orderId}?checkoutId=${checkoutId}`,
    adminGuard: false,
  })

  const orderPromise = getOrder({
    id: orderId,
    userId,
    userRole,
  })

  return (
    <>
      <Suspense fallback={<PaymentPageSkeleton />}>
        <PaymentPage orderPromise={orderPromise} />
      </Suspense>
    </>
  )
}
