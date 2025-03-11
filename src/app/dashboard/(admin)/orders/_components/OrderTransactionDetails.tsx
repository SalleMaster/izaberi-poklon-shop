import { OrderPaymentStatusType } from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type OrderTransactionDetailsProps = {
  paymentId: String | null
  paymentStatus: OrderPaymentStatusType | null
  paymentDetails: JsonValue
  checkoutId: String | null
  isAdmin: boolean
}

export default function OrderTransactionDetails({
  paymentId,
  paymentStatus,
  paymentDetails,
  checkoutId,
  isAdmin,
}: OrderTransactionDetailsProps) {
  const statusLabel = getTransactionStatusLabel({ paymentStatus })

  return (
    <div className='border rounded-xl p-4'>
      <div className='grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
        <div>
          <p className='font-semibold'>ID transakcije</p>
          <p className='text-muted-foreground break-words'>{paymentId}</p>
        </div>
        <div>
          <p className='font-semibold'>Checkout ID</p>
          <p className='text-muted-foreground break-words'>{checkoutId}</p>
        </div>
        <div>
          <p className='font-semibold'>Status transakcije</p>
          <p className='text-muted-foreground'>{statusLabel}</p>
        </div>
      </div>

      {isAdmin ? (
        <Accordion type='single' collapsible>
          <AccordionItem value='item-1' className='border-b-0'>
            <AccordionTrigger>Svi detalji transakcije</AccordionTrigger>
            <AccordionContent className='break-words'>
              {JSON.stringify(paymentDetails)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : null}
    </div>
  )
}

type GetTransactionStatusLabelProps = {
  paymentStatus: OrderPaymentStatusType | null
}

export function getTransactionStatusLabel({
  paymentStatus,
}: GetTransactionStatusLabelProps) {
  let statusLabel = ''
  switch (paymentStatus) {
    case OrderPaymentStatusType.pending:
      statusLabel = 'Na čekanju'
      break
    case OrderPaymentStatusType.success:
      statusLabel = 'Uspešna'
      break
    case OrderPaymentStatusType.failed:
      statusLabel = 'Neuspešna'
      break
    default:
      statusLabel = 'Nepoznat'
      break
  }
  return statusLabel
}
