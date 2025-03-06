'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GetOrderReturnType } from '@/data/services/order'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { Skeleton } from '@/components/ui/skeleton'
import { OrderPaymentType } from '@prisma/client'
import PaymentForm from './_components/PaymentForm'
import { priceFormatter } from '@/lib/format'

type Props = {
  orderPromise: GetOrderReturnType
}

export default function PaymentPage({ orderPromise }: Props) {
  const router = useRouter()
  const order = use(orderPromise)

  // If order doesn't have checkoutId or isn't a card payment, redirect
  if (!order?.checkoutId || order?.paymentType !== OrderPaymentType.card) {
    router.push(`/porudzbina-kreirana/${order?.id}`)
  }

  const resultUrl = `/placanje/${order?.id}/rezultat`
  const formattedTotalPrice = order ? priceFormatter(order.orderTotalPrice) : ''

  return (
    <div className={'space-y-10'}>
      <div className='space-y-3'>
        {order ? (
          <div className='mb-6'>
            <h2 className='text-xl font-semibold mb-2'>Plaćanje</h2>
            <p>Broj narudžbine: {order.orderNumber}</p>
            <p>Iznos za plaćanje: {formattedTotalPrice}</p>

            {order.checkoutId ? (
              <PaymentForm
                checkoutId={order.checkoutId}
                shopperResultUrl={resultUrl}
              />
            ) : (
              <p>Greška prilikom kreiranja plaćanja.</p>
            )}
          </div>
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Porudžbina nije pronađena.'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

export function PaymentPageSkeleton() {
  return (
    <div className='space-y-10'>
      <Skeleton className='w-full h-8' />
    </div>
  )
}
