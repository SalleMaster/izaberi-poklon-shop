'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type PaymentFormProps = {
  checkoutId: string
  shopperResultUrl: string
  allSecureApiUrl: string
}

export default function PaymentForm({
  checkoutId,
  shopperResultUrl,
  allSecureApiUrl,
}: PaymentFormProps) {
  useEffect(() => {
    window.wpwlOptions = {
      locale: 'sr',
      style: 'plain',
      showCVVHint: true,
      brandDetection: true,
      showPlaceholders: true,
      labels: {
        cardHolder: 'Korisnik kartice',
        cvv: 'Zaštitni kod',
        brand: ' ',
        expiryDate: 'Datum isteka',
        cardNumber: 'Broj kartice',
        cvvHint: 'Tri broja na poleđini vaše kartice.',
        cvvHintAmex: 'Četiri broja na poleđini vaše kartice.',
        submit: 'Potvrdi plaćanje',
      },
      errorMessages: {
        cardHolderError: 'Ime korisnika kartice nije u odgovarajućem formatu',
        cardNumberError: 'Pogrešan broj kartice',
        cvvError: 'Pogrešan CVV',
        expiryMonthError: 'Pogrešan datum',
        expiryYearError: 'Pogrešan datum',
      },
    }
  }, [])

  return (
    <div className='space-y-6'>
      <style jsx global>
        {`
          .wpwl-form-card {
            margin-bottom: 0;
          }

          .wpwl-group-submit {
            margin-bottom: 0;
          }

          .wpwl-control {
            box-shadow: 0 1px 2px 0 #0000000d;
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
            padding-left: 0.75rem;
            padding-right: 0.75rem;
            border-color: hsl(0 0% 89.8%);
            border-width: 1px;
            border-radius: calc(0.5rem - 2px);
          }

          .wpwl-icon {
            background-color: hsl(0 0% 100%);
            border-color: hsl(0 0% 89.8%);
            border-width: 1px;
            border-radius: 0.375rem;
            top: 4px !important;
          }

          .wpwl-button-pay {
            color: hsl(0 0% 98%);
            padding: 0.5rem 1rem;
            background-color: hsl(0 0% 9%);
            border-color: hsl(0 0% 9%);
            border-radius: calc(0.5rem - 2px);
            font-size: 0.875rem;
            line-height: 1.25rem;
          }

          .wpwl-button-pay:hover,
          .wpwl-button-pay:focus,
          .wpwl-button-pay:active {
            background-color: hsl(0 0% 9% / 0.9);
            border-color: hsl(0 0% 9% / 0.9);
          }

          .wpwl-button-error[disabled],
          .wpwl-button-pay[disabled] {
            background-color: hsl(0 0% 9%);
            border-color: hsl(0 0% 9%);
            opacity: 0.5;
            pointer-events: none;
          }

          .wpwl-message {
            word-wrap: break-word;
          }
        `}
      </style>

      <Script
        src={`${allSecureApiUrl}/v1/paymentWidgets.js?checkoutId=${checkoutId}`}
        strategy='afterInteractive'
      />

      <div className='flex'>
        <Card className='p-6 w-full min-h-[418px] sm:w-auto sm:mx-auto sm:min-h-[318px] sm:min-w-[482px]'>
          <form
            action={shopperResultUrl}
            className='paymentWidgets'
            data-brands='VISA MASTER'
          ></form>
        </Card>
      </div>
    </div>
  )
}

export function PaymentFormSkeleton() {
  return (
    <div className='flex'>
      <Card className='p-6 w-full min-h-[418px] sm:w-auto sm:mx-auto sm:min-h-[318px] sm:min-w-[482px]'>
        <Skeleton className='w-full h-[34px] mb-3' />
        <Skeleton className='w-full h-[20px] mb-1 sm:hidden' />
        <Skeleton className='w-full h-[34px] mb-3' />
        <Skeleton className='w-full h-[20px] mb-1 sm:hidden' />
        <Skeleton className='w-full h-[34px] mb-3' />
        <Skeleton className='w-full h-[20px] mb-1 sm:hidden' />
        <Skeleton className='w-full h-[34px] mb-3' />
        <Skeleton className='w-full h-[20px] mb-1 sm:hidden' />
        <Skeleton className='w-full h-[34px] mb-3' />
        <div className='flex'>
          <Button className='ml-auto' disabled>
            Potvrdi plaćanje
          </Button>
        </div>
      </Card>
    </div>
  )
}

// Required TypeScript typings
declare global {
  interface Window {
    wpwlOptions?: {
      locale?: string
      style?: string
      showCVVHint?: boolean
      brandDetection?: boolean
      showPlaceholders?: boolean
      labels?: Record<string, string>
      errorMessages?: Record<string, string>
      onBeforeSubmitCard?: () => boolean
      [key: string]: any
    }
  }
}
