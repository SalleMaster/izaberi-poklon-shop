import { Order } from '@prisma/client'

type AllSecureConfig = {
  // userId: string
  // password: string
  entityId: string
  accessToken: string // In case you have a pre-generated token
  testMode: boolean
}

type PrepareCheckoutParams = {
  amount: string
  currency: string
  merchantTransactionId?: string
  returnUrl?: string
}

/**
 * Prepare a checkout session with AllSecure
 * @param config AllSecure configuration
 * @param params Payment parameters
 */
export async function prepareCheckout(
  config: AllSecureConfig,
  params: PrepareCheckoutParams
): Promise<string | null> {
  try {
    // Update to use the correct host for EU
    const host = 'eu-test.oppwa.com'

    // Use entityId as a parameter in the body (not authentication.entityId)
    const requestParams = new URLSearchParams({
      entityId: config.entityId,
      amount: params.amount,
      currency: params.currency,
      paymentType: 'DB',
    })

    // Add optional parameters if provided
    if (params.merchantTransactionId) {
      requestParams.append(
        'merchantTransactionId',
        params.merchantTransactionId
      )
    }

    if (params.returnUrl) {
      requestParams.append('shopperResultUrl', params.returnUrl)
    }

    // Default to Serbian locale
    requestParams.append('customParameters[SHOPPER_LOCALE]', 'rs_RS')

    // Generate a base64 token from userId and password
    const token = config.accessToken

    console.log('Sending checkout request to:', `https://${host}/v1/checkouts`)
    console.log('Request params:', requestParams.toString())

    const response = await fetch(`https://${host}/v1/checkouts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      body: requestParams.toString(),
    })

    const data = await response.json()
    console.log('Checkout API response:', JSON.stringify(data))

    if (data.id) {
      return data.id
    } else {
      console.error('Failed to create checkout:', JSON.stringify(data))
      return null
    }
  } catch (error) {
    console.error('Error creating AllSecure checkout:', error)
    return null
  }
}

/**
 * Check the status of a payment
 * @param config AllSecure configuration
 * @param checkoutId The checkout ID returned from prepareCheckout
 */
export async function getPaymentStatus(
  config: AllSecureConfig,
  checkoutId: string
): Promise<any> {
  try {
    const host = 'eu-test.oppwa.com'

    // Add entityId as a query parameter
    const params = new URLSearchParams({
      entityId: config.entityId,
    })

    // Generate a base64 token from userId and password
    const token = config.accessToken

    const response = await fetch(
      `https://${host}/v1/checkouts/${checkoutId}/payment?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const data = await response.json()
    console.log('Payment status API response:', JSON.stringify(data))
    return data
  } catch (error) {
    console.error('Error checking payment status:', error)
    throw error
  }
}

/**
 * Verify if payment was successful
 * @param status The payment status returned from getPaymentStatus
 */
export function isPaymentSuccessful(status: any): boolean {
  return status?.result?.code?.substring(0, 3) === '000'
}

/**
 * Get the AllSecure configuration from environment variables
 */
export function getAllSecureConfig(): AllSecureConfig {
  return {
    entityId: process.env.ALL_SECURE_ENTITY_ID || '',
    accessToken: process.env.ALL_SECURE_ACCESS_TOKEN || '',
    testMode: process.env.ALL_SECURE_TEST_MODE === 'true',
  }
}

/**
 * Get the public AllSecure script URL for the payment widget
 * @param checkoutId The checkout ID returned from prepareCheckout
 */
export function getPaymentWidgetUrl(checkoutId: string): string {
  const isTestMode = process.env.ALL_SECURE_TEST_MODE === 'true'
  return isTestMode
    ? `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`
    : `https://eu.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`
}

/**
 * Get the AllSecure form action URL
 */
export function getPaymentFormAction(): string {
  const isTestMode = process.env.ALL_SECURE_TEST_MODE === 'true'
  return isTestMode
    ? 'https://eu-test.oppwa.com/v1/paymentWidgets.js'
    : 'https://eu.oppwa.com/v1/paymentWidgets.js'
}

/**
 * Helper function to handle payment preparation for an order
 * @param order The order to prepare payment for
 * @param returnUrl URL to return to after payment
 */
export async function preparePaymentForOrder(
  order: Order,
  returnUrl: string
): Promise<string | null> {
  const config = getAllSecureConfig()

  return prepareCheckout(config, {
    amount: order.orderTotalPrice.toString(),
    currency: 'RSD',
    merchantTransactionId: order.orderNumber,
    returnUrl,
  })
}

/**
 * Helper function to check payment status
 * @param checkoutId The checkout ID returned from prepareCheckout
 */
export async function checkPaymentStatus(checkoutId: string): Promise<any> {
  const config = getAllSecureConfig()
  return getPaymentStatus(config, checkoutId)
}
