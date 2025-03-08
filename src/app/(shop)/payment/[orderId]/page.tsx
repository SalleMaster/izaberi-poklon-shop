import { Metadata } from 'next'
import { Suspense } from 'react'
import pageGuard from '@/lib/pageGuard'
import { getOrder } from '@/data/services/order'
import PaymentPage, { PaymentPageSkeleton } from './PaymentPage'

export const metadata: Metadata = {
  title: 'Plaćanje porudžbine',
  description: 'Plaćanje porudžbine',
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

  const allSecureApiUrl = process.env.ALL_SECURE_API_URL!

  return (
    <>
      <Suspense fallback={<PaymentPageSkeleton />}>
        <PaymentPage
          orderPromise={orderPromise}
          allSecureApiUrl={allSecureApiUrl}
        />
      </Suspense>
    </>
  )
}
