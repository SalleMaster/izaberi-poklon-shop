'use client'

import { useRef, useState } from 'react'
import Script from 'next/script'

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

  // Handle script load event
  const handleScriptLoad = () => {
    setScriptLoaded(true)
  }

  return (
    <div className='payment-form-container'>
      {/* Use Next.js Script component which handles CSP better */}
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

      {!scriptLoaded && (
        <div className='flex items-center justify-center p-6'>
          <p>Loading payment form...</p>
        </div>
      )}
    </div>
  )
}
