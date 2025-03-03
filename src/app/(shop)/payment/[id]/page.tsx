import { Metadata } from 'next'
import { PaymentForm } from './components/PaymentForm'

type Params = Promise<{ id: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type Props = {
  params: Params
  searchParams: SearchParams
}

export const metadata: Metadata = {
  title: 'Payment | Izaberi Poklon',
  description: 'Complete your payment',
}

export default async function PaymentPage({ params, searchParams }: Props) {
  const { id } = await params
  const { checkoutId } = await searchParams

  if (!checkoutId) {
    return (
      <div className='max-w-3xl mx-auto p-6 space-y-8'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>Plaćanje porudžbine</h1>
          <p className='text-destructive'>
            Invalid checkout session. Please return to your cart and try again.
          </p>
          <div className='mt-6'>
            <a
              href='/cart'
              className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
            >
              Povratak na korpu
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-3xl mx-auto p-6 space-y-8'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>Plaćanje porudžbine</h1>
        <p className='text-muted-foreground'>
          Molimo vas da unesete podatke o kartici da biste završili plaćanje.
        </p>
      </div>

      <PaymentForm orderId={id} checkoutId={checkoutId as string} />
    </div>
  )
}
