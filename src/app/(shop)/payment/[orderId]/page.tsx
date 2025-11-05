import { Metadata } from 'next'
import { Suspense } from 'react'
import pageGuard from '@/lib/pageGuard'
import { getOrder } from '@/data/services/order'
import PaymentPage, { PaymentPageSkeleton } from './PaymentPage'

export const metadata: Metadata = {
  title: 'Plaćanje porudžbine',
  description: 'Plaćanje porudžbine',
}

export default async function Page({
  params,
  searchParams,
}: PageProps<'/payment/[orderId]'>) {
  return (
    <Suspense fallback={<PaymentPageSkeleton />}>
      <PageLoader params={params} searchParams={searchParams} />
    </Suspense>
  )
}

async function PageLoader({
  params,
  searchParams,
}: Pick<PageProps<'/payment/[orderId]'>, 'params' | 'searchParams'>) {
  const { orderId } = await params
  const { checkoutId } = await searchParams

  const { userId, userRole } = await pageGuard({
    callbackUrl: `/placanje/${orderId}?checkoutId=${checkoutId}`,
    adminGuard: false,
  })

  const orderPromise = getOrder({
    id: orderId,
    userId,
    userRole,
  })

  const allSecureApiUrl = process.env.ALL_SECURE_API_URL!

  return (
    <PaymentPage
      orderPromise={orderPromise}
      allSecureApiUrl={allSecureApiUrl}
    />
  )
}
