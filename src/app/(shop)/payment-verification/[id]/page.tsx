import { Metadata } from 'next'
import { VerificationStatus } from './components/VerificationStatus'

type Params = Promise<{ id: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type Props = {
  params: Params
  searchParams: SearchParams
}

export const metadata: Metadata = {
  title: 'Payment Verification | Izaberi Poklon',
  description: 'Verifying your payment',
}

export default async function PaymentVerificationPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params
  const { id: paymentId, resourcePath } = await searchParams

  return (
    <div className='max-w-3xl mx-auto p-6 space-y-8 text-center'>
      <h1 className='text-2xl font-bold'>Verifikacija plaćanja</h1>
      <p className='text-muted-foreground'>
        Proveravamo status vaše uplate, molimo sačekajte...
      </p>

      <VerificationStatus
        orderId={id}
        resourcePath={resourcePath as string}
        paymentId={paymentId as string}
      />
    </div>
  )
}
