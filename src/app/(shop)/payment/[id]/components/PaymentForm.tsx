'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { getPaymentWidgetUrl } from '@/lib/checkout'

type PaymentFormProps = {
  orderId: string
  checkoutId: string
}

export function PaymentForm({ orderId, checkoutId }: PaymentFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Use a ref to access the form container
  const formContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize AllSecure payment form
    const script = document.createElement('script')

    // Set the src with checkout ID directly from the documentation example
    script.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`

    // Add integrity and crossorigin attributes as specified in documentation
    // Note: In production, you'd want to get the actual integrity hash from AllSecure
    script.crossOrigin = 'anonymous'
    script.async = true

    // Create the handler functions before adding the script
    script.onload = () => {
      setLoading(false)
    }

    script.onerror = () => {
      setError('Failed to load payment form')
      setLoading(false)
    }

    // Add script to document
    document.body.appendChild(script)

    // Cleanup function
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [checkoutId])

  const shopperResultUrl = `/placanje-verifikacija/${orderId}`

  return (
    <>
      {loading && (
        <div className='flex flex-col items-center justify-center h-64'>
          <Loader2 className='h-12 w-12 animate-spin text-primary' />
          <p className='mt-4 text-sm text-muted-foreground'>
            Učitavanje forme za plaćanje...
          </p>
        </div>
      )}

      {error && (
        <div className='text-center space-y-4'>
          <p className='text-destructive'>{error}</p>
          <Button onClick={() => router.push(`/cart`)}>
            Povratak na korpu
          </Button>
        </div>
      )}

      {!loading && !error && (
        <>
          <div
            className='bg-background border rounded-lg p-6'
            ref={formContainerRef}
          >
            {/* 
              The form action should be your result URL as per documentation
              In this case, it should be the verification endpoint
            */}
            <form
              action={shopperResultUrl}
              className='paymentWidgets'
              data-brands='VISA MASTER AMEX'
            ></form>
          </div>
          <div className='text-center mt-4'>
            <Button variant='outline' onClick={() => router.push(`/cart`)}>
              Odustani od plaćanja
            </Button>
          </div>
        </>
      )}
    </>
  )
}
