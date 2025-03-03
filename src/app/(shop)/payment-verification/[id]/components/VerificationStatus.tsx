'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { verifyPayment } from '@/app/(shop)/_actions/order/actions'

type VerificationStatusProps = {
  orderId: string
  resourcePath?: string
  paymentId?: string
}

export function VerificationStatus({
  orderId,
  resourcePath,
  paymentId,
}: VerificationStatusProps) {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  )
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function checkPaymentStatus() {
      try {
        console.log('Verifying payment for order:', orderId)
        console.log('Search params:', { resourcePath, paymentId })

        const result = await verifyPayment(orderId)

        if (result.status === 'success') {
          setStatus('success')
          setMessage(
            'Plaćanje je uspešno izvršeno. Vaša porudžbina je primljena.'
          )
          // Redirect to order success page after a delay
          setTimeout(() => {
            router.push(`/porudzbina-kreirana/${orderId}`)
          }, 3000)
        } else {
          setStatus('error')
          setMessage(
            result.message || 'Plaćanje nije uspelo. Molimo pokušajte ponovo.'
          )
          console.error('Payment verification failed:', result)
        }
      } catch (error) {
        setStatus('error')
        setMessage(
          'Došlo je do greške prilikom provere plaćanja. Molimo kontaktirajte podršku.'
        )
        console.error('Error verifying payment:', error)
      }
    }

    checkPaymentStatus()
  }, [orderId, resourcePath, paymentId, router])

  return (
    <>
      {status === 'loading' && (
        <div className='flex flex-col items-center justify-center h-64'>
          <Loader2 className='h-12 w-12 animate-spin text-primary' />
          <p className='mt-4 text-sm text-muted-foreground'>
            Verifikacija plaćanja u toku...
          </p>
        </div>
      )}

      {status === 'success' && (
        <div className='space-y-4'>
          <div className='flex flex-col items-center'>
            <CheckCircle className='h-16 w-16 text-green-500' />
            <p className='mt-4'>{message}</p>
          </div>
          <Button
            onClick={() => router.push(`/porudzbina-kreirana/${orderId}`)}
          >
            Pregledajte detalje porudžbine
          </Button>
        </div>
      )}

      {status === 'error' && (
        <div className='space-y-4'>
          <div className='flex flex-col items-center'>
            <XCircle className='h-16 w-16 text-destructive' />
            <p className='mt-4'>{message}</p>
          </div>
          <div className='flex justify-center gap-4'>
            <Button variant='outline' onClick={() => router.push('/cart')}>
              Povratak na korpu
            </Button>
            <Button onClick={() => router.push('/contact')}>
              Kontaktirajte podršku
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
