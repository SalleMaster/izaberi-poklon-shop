'use client'

import { use } from 'react'
import { GetOrderReturnType } from '@/data/services/order'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import PaymentForm, { PaymentFormSkeleton } from './_components/PaymentForm'
import { priceFormatter } from '@/lib/format'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info, Lock } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

type Props = {
  orderPromise: GetOrderReturnType
  allSecureApiUrl: string
}

export default function PaymentPage({ orderPromise, allSecureApiUrl }: Props) {
  const order = use(orderPromise)

  const resultUrl = `/placanje/${order?.id}/rezultat`
  const formattedTotalPrice = order ? priceFormatter(order.orderTotalPrice) : ''

  // Check if order payment type is card
  // Check if order is already paid

  return (
    <>
      {order ? (
        <div className='flex gap-6 flex-col'>
          <div className='space-y-5'>
            <h2 className='text-xl font-bold'>Plaćanje porudžbine</h2>

            <Separator />

            <div className='space-y-2 w-full sm:w-[482px] sm:mx-auto'>
              <p>
                Broj porudžbine:
                <span className='font-semibold'> {order.orderNumber}</span>
              </p>
              <p>
                Iznos za plaćanje:
                <span className='font-semibold'> {formattedTotalPrice}</span>
              </p>
            </div>
          </div>

          {order.checkoutId ? (
            <PaymentForm
              checkoutId={order.checkoutId}
              shopperResultUrl={resultUrl}
              allSecureApiUrl={allSecureApiUrl}
            />
          ) : (
            <Alert
              variant='destructive'
              className='sm:max-w-[482px] sm:mx-auto'
            >
              <Lock className='h-4 w-4' />
              <AlertDescription>
                Greška prilikom kreiranja forme za plaćanje. Molimo pokušajte
                ponovo.
              </AlertDescription>
            </Alert>
          )}

          <Alert variant='default' className='sm:max-w-[482px] sm:mx-auto'>
            <Lock className='h-4 w-4' />
            <AlertDescription>
              Prilikom unošenja podataka o platnoj kartici, informacije se unose
              direktno u PCI sertifikovanu platformu. Ni jednog trenutka podaci
              o platnoj kartici nisu dostupni trgovcu.
            </AlertDescription>
          </Alert>

          <Alert variant='default' className='sm:max-w-[482px] sm:mx-auto'>
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
    <div className='flex gap-6 flex-col'>
      <div className='space-y-5'>
        <h2 className='text-xl font-bold'>Plaćanje porudžbine</h2>

        <Separator />

        <div className='space-y-2 w-full sm:w-[482px] sm:mx-auto'>
          <p>
            Broj porudžbine:
            <span className='font-semibold'> </span>
          </p>
          <p>
            Iznos za plaćanje:
            <span className='font-semibold'> </span>
          </p>
        </div>
      </div>

      <PaymentFormSkeleton />

      <Alert variant='default' className='sm:max-w-[482px] sm:mx-auto'>
        <Lock className='h-4 w-4' />
        <AlertDescription>
          Prilikom unošenja podataka o platnoj kartici, informacije se unose
          direktno u PCI sertifikovanu platformu. Ni jednog trenutka podaci o
          platnoj kartici nisu dostupni trgovcu.
        </AlertDescription>
      </Alert>

      <Alert variant='default' className='sm:max-w-[482px] sm:mx-auto'>
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
