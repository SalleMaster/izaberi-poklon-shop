import { Metadata } from 'next'
import pageGuard from '@/lib/pageGuard'
import { redirect } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import RetryPaymentButton from './_components/RetryPaymentButton'
import { verifyPayment } from './_actions/actions'
import { ResponseStatus } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Rezultat plaćanja',
  description: 'Rezultat plaćanja',
}

type PageProps = {
  params: Promise<{ orderId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const searchParams = await props.searchParams

  const { orderId } = params
  const resourcePathParam = searchParams.resourcePath

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

      <RetryPaymentButton orderId={orderId} />
    </div>
  )
}
