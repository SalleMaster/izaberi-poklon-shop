'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GetOrderReturnType } from '@/data/services/order'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { Skeleton } from '@/components/ui/skeleton'
import { OrderPaymentType } from '@prisma/client'
import PaymentForm from './_components/PaymentForm'
import { priceFormatter } from '@/lib/format'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info, Lock } from 'lucide-react'

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
    <>
      {order ? (
        <div className='space-y-6'>
          <div className='space-y-2'>
            <h2 className='text-xl font-semibold'>Plaćanje</h2>
            <p>Broj narudžbine: {order.orderNumber}</p>
            <p>Iznos za plaćanje: {formattedTotalPrice}</p>
          </div>

          {order.checkoutId ? (
            <PaymentForm
              checkoutId={order.checkoutId}
              shopperResultUrl={resultUrl}
            />
          ) : (
            <p>Greška prilikom kreiranja forme za plaćanje.</p>
          )}

          <Alert variant='default'>
            <Lock className='h-4 w-4' />
            <AlertDescription>
              Prilikom unošenja podataka o platnoj kartici, informacije se unose
              direktno u PCI sertifikovanu platformu. Ni jednog trenutka podaci
              o platnoj kartici nisu dostupni trgovcu.
            </AlertDescription>
          </Alert>

          <Alert variant='default'>
            <Info className='h-4 w-4' />
            <AlertDescription>
              Ukoliko je Vaša kartica prijavljena na <b>3D-Secure servise</b>,
              biće Vam zatraženo da se autentifikujete (najčešće lozinkom). U
              slučaju da ne znate lozinku, predlažemo Vam da prvo kontaktirate
              svoju banku.
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <NotificationAlert
          title='Obaveštenje'
          description='Porudžbina nije pronađena.'
          variant='info'
        />
      )}
    </>
  )
}

export function PaymentPageSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <h2 className='text-xl font-semibold'>Plaćanje</h2>
        <p>Broj narudžbine:</p>
        <p>Iznos za plaćanje:</p>
      </div>

      <Skeleton className='w-[480px] h-[334px] mx-auto' />

      <Alert variant='default'>
        <Lock className='h-4 w-4' />
        <AlertDescription>
          Prilikom unošenja podataka o platnoj kartici, informacije se unose
          direktno u PCI sertifikovanu platformu. Ni jednog trenutka podaci o
          platnoj kartici nisu dostupni trgovcu.
        </AlertDescription>
      </Alert>

      <Alert variant='default'>
        <Info className='h-4 w-4' />
        <AlertDescription>
          Ukoliko je Vaša kartica prijavljena na <b>3D-Secure servise</b>, biće
          Vam zatraženo da se autentifikujete (najčešće lozinkom). U slučaju da
          ne znate lozinku, predlažemo Vam da prvo kontaktirate svoju banku.
        </AlertDescription>
      </Alert>
    </div>
  )
}
