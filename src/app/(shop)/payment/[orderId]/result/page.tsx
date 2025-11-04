import { Metadata } from 'next'
import pageGuard from '@/lib/pageGuard'
import { redirect } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import RetryPaymentButton from './_components/RetryPaymentButton'
import { verifyPayment } from './_actions/actions'
import { ResponseStatus } from '@/lib/types'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Rezultat plaćanja',
  description: 'Rezultat plaćanja',
}

export default async function Page({
  params,
  searchParams,
}: PageProps<'/payment/[orderId]/result'>) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageLoader params={params} searchParams={searchParams} />
    </Suspense>
  )
}

async function PageLoader({
  params,
  searchParams,
}: Pick<PageProps<'/payment/[orderId]/result'>, 'params' | 'searchParams'>) {
  const { orderId } = await params
  const resourcePathParam = (await searchParams).resourcePath

  await pageGuard({
    callbackUrl: `/placanje/${orderId}/rezultat`,
    adminGuard: false,
  })

  if (!resourcePathParam) {
    return (
      <FailedPaymentResult
        orderId={orderId}
        message='Nedostaje putanja resursa za proveru statusa plaćanja.'
      />
    )
  }

  const resourcePath = Array.isArray(resourcePathParam)
    ? resourcePathParam[0]
    : resourcePathParam

  const verificationResult = await verifyPayment({ resourcePath, orderId })

  if (verificationResult.status === ResponseStatus.success) {
    redirect(verificationResult.redirectUrl)
  }

  return (
    <FailedPaymentResult
      orderId={orderId}
      message={verificationResult.message}
    />
  )
}

function PageFallback() {
  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Verifikacija</h2>

      <Separator />

      <div className='space-y-5 animate-pulse'>
        <div className='h-4 bg-gray-200 rounded'></div>
        <div className='h-4 bg-gray-200 rounded'></div>
        <div className='h-4 bg-gray-200 rounded'></div>
      </div>
    </div>
  )
}

type FailedPaymentResultProps = {
  orderId: string
  message: string
}

function FailedPaymentResult({ orderId, message }: FailedPaymentResultProps) {
  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Rezultat plaćanja</h2>

      <Separator />

      <NotificationAlert
        title='Došlo je do greške'
        description={message}
        variant='destructive'
      />

      <RetryPaymentButton orderId={orderId} label='Pokušaj ponovo' />
    </div>
  )
}
