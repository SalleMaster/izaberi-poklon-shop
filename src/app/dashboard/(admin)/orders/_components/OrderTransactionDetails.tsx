import { OrderPaymentStatusType } from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'
import { format } from 'date-fns'
import { srLatn } from 'date-fns/locale'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type OrderTransactionDetailsProps = {
  paymentId: string | null
  paymentStatus: OrderPaymentStatusType | null
  paymentAuthorizationCode: string | null
  paymentStatusCode: string | null
  paymentTimestamp: string | null
  paymentDetails: JsonValue
  isAdmin: boolean
}

export default function OrderTransactionDetails({
  paymentId,
  paymentStatus,
  paymentStatusCode,
  paymentDetails,
  paymentTimestamp,
  paymentAuthorizationCode,
  isAdmin,
}: OrderTransactionDetailsProps) {
  const statusLabel = getTransactionStatusLabel({ paymentStatus })
  const orderFormattedTimestamp = paymentTimestamp
    ? format(paymentTimestamp, 'PPpp', {
        locale: srLatn,
      })
    : null

  return (
    <div className='border rounded-xl p-4'>
      <div className='grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
        <div>
          <p className='font-semibold'>Autorizacioni kod</p>
          <p className='text-muted-foreground break-all'>
            {paymentAuthorizationCode ?? 'Nije dostupan'}
          </p>
        </div>
        <div>
          <p className='font-semibold'>ID transakcije</p>
          <p className='text-muted-foreground break-all'>{paymentId}</p>
        </div>
        <div>
          <p className='font-semibold'>Status transakcije</p>
          <p className='text-muted-foreground'>{statusLabel}</p>
        </div>
        <div>
          <p className='font-semibold'>Kod statusa transakcije</p>
          <p className='text-muted-foreground'>
            {paymentStatusCode ?? 'Nije dostupan'}
          </p>
        </div>
        <div>
          <p className='font-semibold'>Datum transakcije</p>
          <p className='text-muted-foreground'>
            {orderFormattedTimestamp ?? 'Nije dostupan'}
          </p>
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
