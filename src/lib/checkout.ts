import 'server-only'

import { z } from 'zod'
import { ResponseStatus, ResponseStatusType } from './types'
import { paymentErrorMessages } from './paymentErrorMessages'

const checkoutResponseSchema = z.object({
  result: z.object({
    code: z.string(),
    description: z.string(),
  }),
  buildNumber: z.string(),
  timestamp: z.string(),
  ndc: z.string(),
  id: z.string(),
  integrity: z.string(),
})

type PaymentCheckoutParams = {
  orderId: string
  amount: string
  currency: string
}

type CreatePaymentReturnType = {
  status: ResponseStatusType
  checkoutId: string | null
  message: string
}

export async function createPaymentCheckout({
  orderId,
  amount,
  currency,
}: PaymentCheckoutParams): Promise<CreatePaymentReturnType> {
  try {
    const formData = new URLSearchParams({
      entityId: process.env.ALL_SECURE_ENTITY_ID || '',
      amount: amount,
      currency: currency,
      paymentType: 'DB',
      merchantTransactionId: orderId,
      integrity: 'true',
    })

    const response = await fetch(
      `${process.env.ALL_SECURE_API_URL}/v1/checkouts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${process.env.ALL_SECURE_ACCESS_TOKEN}`,
        },
        body: formData.toString(),
      }
    )

    if (!response.ok) {
      throw new Error(
        `Greška servisa za plaćanje: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()
    const validatedResponse = checkoutResponseSchema.parse(data)

    if (isCreateCheckoutSuccessful(validatedResponse.result.code)) {
      return {
        status: ResponseStatus.success,
        checkoutId: validatedResponse.id,
        message: validatedResponse.result.description,
      }
    }

    return {
      status: ResponseStatus.fail,
      checkoutId: validatedResponse.id,
      message: 'Došlo je do greške prilikom kreiranja linka za plaćanje.',
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: ResponseStatus.fail,
        checkoutId: null,
        message: error.message,
      }
    } else {
      return {
        status: ResponseStatus.fail,
        checkoutId: null,
        message:
          'Došlo je do neočekivane greške prilikom kreiranja linka za plaćanje.',
      }
    }
  }
}

function isCreateCheckoutSuccessful(resultCode: string): boolean {
  const successPattern = /^(000\.200)/
  return successPattern.test(resultCode)
}

const paymentStatusSchema = z.object({
  id: z.string(),
  paymentType: z.string(),
  paymentBrand: z.string(),
  amount: z.string(),
  currency: z.string(),
  descriptor: z.string(),
  merchantTransactionId: z.string(),
  result: z.object({
    code: z.string(),
    description: z.string(),
  }),
  card: z.object({
    bin: z.string(),
    binCountry: z.string(),
    last4Digits: z.string(),
    holder: z.string(),
    expiryMonth: z.string(),
    expiryYear: z.string(),
  }),
  customer: z.object({
    ip: z.string(),
  }),
  threeDSecure: z.object({
    eci: z.string(),
  }),
  customParameters: z.record(z.string()),
  risk: z.object({
    score: z.string(),
  }),
  buildNumber: z.string(),
  timestamp: z.string(),
  ndc: z.string(),
})

// TypeScript type derived from the schema
export type PaymentStatusResponse = z.infer<typeof paymentStatusSchema>

// Return type for getPaymentStatus function
type GetPaymentStatusReturnType = {
  status: ResponseStatusType
  paymentResult?: PaymentStatusResponse
  message: string
}

export async function getPaymentStatus(
  resourcePath: string
): Promise<GetPaymentStatusReturnType> {
  try {
    const url = `${process.env.ALL_SECURE_API_URL}${resourcePath}?entityId=${process.env.ALL_SECURE_ENTITY_ID}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.ALL_SECURE_ACCESS_TOKEN}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Greška servisa za proveru statusa plaćanja: ${response.status} ${response.statusText} - ${errorText}`
      )
    }

    const data = await response.json()

    // Validate the response data
    const validatedResponse = paymentStatusSchema.parse(data)

    if (isPaymentSuccessful(validatedResponse.result.code)) {
      return {
        status: ResponseStatus.success,
        paymentResult: validatedResponse,
        message: 'Transakcija uspešno izvršena.',
      }
    }

    const userFriendlyMessage = getPaymentErrorMessage(
      validatedResponse.result.code
    )

    return {
      status: ResponseStatus.fail,
      paymentResult: validatedResponse,
      message: userFriendlyMessage,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: ResponseStatus.fail,
        message: error.message,
      }
    } else {
      return {
        status: ResponseStatus.fail,
        message:
          'Došlo je do greške prilikom provere statusa plaćanja. Molimo pokušajte ponovo ili kontaktirajte podršku.',
      }
    }
  }
}

function isPaymentSuccessful(resultCode: string): boolean {
  const successPattern = /^(000.000.|000.100.1|000.[36]|000.400.[1][12]0)/
  return successPattern.test(resultCode)
}

function getPaymentErrorMessage(resultCode: string): string {
  if (paymentErrorMessages[resultCode]) {
    return paymentErrorMessages[resultCode]
  }

  return 'Došlo je do greške prilikom provere statusa plaćanja. Molimo pokušajte ponovo ili kontaktirajte podršku.'
}
