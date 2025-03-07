'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { Button } from '@/components/ui/button'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info, Lock } from 'lucide-react'

type PaymentFormProps = {
  checkoutId: string
  shopperResultUrl: string
}

export default function PaymentForm({
  checkoutId,
  shopperResultUrl,
}: PaymentFormProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const formContainerRef = useRef<HTMLDivElement>(null)

  // Configure wpwlOptions before loading the script
  useEffect(() => {
    // Set global options for the payment form
    window.wpwlOptions = {
      locale: 'sr',
      style: 'plain',
      showCVVHint: true,
      brandDetection: true,
      showPlaceholders: true,

      // Custom text labels
      labels: {
        cardHolder: 'Korisnik kartice',
        cvv: 'Zaštitni kod',
        brand: ' ',
        expiryDate: 'Datum isteka',
        cardNumber: 'Broj kartice',
        cvvHint: 'Tri broja na poleđini vaše kartice.',
        cvvHintAmex: 'Četiri broja na poleđini vaše kartice.',
        // Customize submit button text
        submit: 'Potvrdi plaćanje',
      },

      // Custom error messages
      errorMessages: {
        cardHolderError: 'Ime korisnika kartice nije u odgovarajućem formatu',
        cardNumberError: 'Pogrešan broj kartice',
        cvvError: 'Pogrešan CVV',
        expiryMonthError: 'Pogrešan datum',
        expiryYearError: 'Pogrešan datum',
      },
    }
  }, [])

  // Handle script load event
  const handleScriptLoad = () => {
    setScriptLoaded(true)
  }

  return (
    <div className='space-y-6'>
      {/* Add required font */}
      {/* <link
        href='https://fonts.googleapis.com/css?family=Roboto'
        rel='stylesheet'
      /> */}

      {/* Custom CSS for the payment form */}
      <style jsx global>
        {`
          .wpwl-form-card {
            padding: 1.5rem;
            box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
            background-color: hsl(0 0% 100%);
            border-width: 1px;
            border-radius: 0.75rem;
            border-color: hsl(0 0% 89.8%);
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

      {/* Payment widget script */}
      <Script
        src={`https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`}
        onLoad={handleScriptLoad}
        strategy='afterInteractive'
      />

      <div ref={formContainerRef}>
        {/* The form will be rendered here after script loads */}
        <form
          action={shopperResultUrl}
          className='paymentWidgets'
          data-brands='VISA MASTER'
        ></form>
      </div>

      {/* Security notices that don't require jQuery manipulation */}
      {scriptLoaded && (
        <>
          {/* <Alert variant='default'>
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
          </Alert> */}
        </>
      )}

      {!scriptLoaded && (
        <div className='flex items-center justify-center p-6'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3'></div>
          <p>Učitavanje forme za plaćanje...</p>
        </div>
      )}
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

// 'use client'

// import { useRef, useState } from 'react'
// import Script from 'next/script'

// type PaymentFormProps = {
//   checkoutId: string
//   shopperResultUrl: string
// }

// export default function PaymentForm({
//   checkoutId,
//   shopperResultUrl,
// }: PaymentFormProps) {
//   const [scriptLoaded, setScriptLoaded] = useState(false)
//   const formContainerRef = useRef<HTMLDivElement>(null)

//   // Handle script load event
//   const handleScriptLoad = () => {
//     setScriptLoaded(true)
//   }

//   return (
//     <div className='payment-form-container'>
//       {/* Use Next.js Script component which handles CSP better */}
//       <Script
//         src={`https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`}
//         onLoad={handleScriptLoad}
//         strategy='afterInteractive'
//       />

//       <div ref={formContainerRef}>
//         {/* The form will be rendered here after script loads */}
//         <form
//           action={shopperResultUrl}
//           className='paymentWidgets'
//           data-brands='VISA MASTER'
//         ></form>
//       </div>

//       {!scriptLoaded && (
//         <div className='flex items-center justify-center p-6'>
//           <p>Loading payment form...</p>
//         </div>
//       )}
//     </div>
//   )
// }
