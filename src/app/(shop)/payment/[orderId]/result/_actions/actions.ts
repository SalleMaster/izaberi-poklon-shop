'use server'

import { sendOrderEmail } from '@/app/(shop)/_actions/order/actions'
import { createPaymentCheckout, getPaymentStatus } from '@/lib/checkout'
import prisma from '@/lib/db'
import {
  OrderPaymentStatusType,
  OrderPaymentType,
  OrderStatusType,
} from '@/generated/prisma'
import { loggedInActionGuard } from '@/lib/actionGuard'
import { ResponseStatus } from '@/lib/types'

type RecreatePaymentCheckoutProps = { orderId: string }

export async function recreatePaymentCheckout({
  orderId,
}: RecreatePaymentCheckoutProps) {
  try {
    await loggedInActionGuard()

    const order = await prisma.order.findUnique({ where: { id: orderId } })

    if (!order) {
      throw new Error('Porudžbina nije pronađena.')
    }

    if (order.paymentStatus === OrderPaymentStatusType.success) {
      throw new Error('Porudžbina je već plaćena.')
    }

    if (order.paymentType !== OrderPaymentType.card) {
      throw new Error('Ponovno plaćanje je moguće samo za kartično plaćanje.')
    }

    const checkoutResult = await createPaymentCheckout({
      orderId: order.id,
      amount: order.orderTotalPrice.toString(),
      currency: 'RSD',
    })

    if (checkoutResult.status === ResponseStatus.fail) {
      throw new Error(checkoutResult.message)
    }

    // Update the order with the checkout ID and payment status
    await prisma.order.update({
      where: { id: order.id },
      data: {
        paymentStatus: OrderPaymentStatusType.pending,
        checkoutId: checkoutResult.checkoutId,
      },
    })

    // Return with checkout data for card payment
    return {
      status: ResponseStatus.success,
      message: 'Preusmeravanje na plaćanje...',
      redirectUrl: `/placanje/${order.id}?checkoutId=${checkoutResult.checkoutId}`,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: ResponseStatus.fail,
        message: error.message,
        redirectUrl: '',
      }
    } else {
      throw error
    }
  }
}

type VerifyPaymentProps = { resourcePath: string; orderId: string }

export async function verifyPayment({
  resourcePath,
  orderId,
}: VerifyPaymentProps) {
  try {
    await loggedInActionGuard()

    const response = await getPaymentStatus(resourcePath)

    if (response.status === ResponseStatus.success) {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatusType.pending,
          paymentId: response.paymentResult?.id,
          paymentStatus: OrderPaymentStatusType.success,
          paymentStatusCode: response.paymentResult?.result.code,
          paymentAuthorizationCode:
            response.paymentResult?.resultDetails?.ConnectorTxID3,
          paymentTimestamp: response.paymentResult?.timestamp,
          paymentAmount: response.paymentResult?.amount,
          paymentCurrency: response.paymentResult?.currency,
          paymentBrand: response.paymentResult?.paymentBrand,
          paymentDetails: response.paymentResult,
        },
      })

      if (order) {
        await sendOrderEmail(
          order,
          order.billingEmail || order.deliveryEmail || order.pickupEmail || ''
        )
      }

      return {
        status: ResponseStatus.success,
        message: `Plaćanje uspešno. Porudžbina kreirana.`,
        redirectUrl: `/porudzbina-kreirana/${orderId}`,
      }
    } else {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatusType.draft,
          paymentId: response.paymentResult?.id,
          paymentStatus: OrderPaymentStatusType.failed,
          paymentStatusCode: response.paymentResult?.result.code,
          paymentAuthorizationCode:
            response.paymentResult?.resultDetails?.ConnectorTxID3,
          paymentTimestamp: response.paymentResult?.timestamp,
          paymentAmount: response.paymentResult?.amount,
          paymentCurrency: response.paymentResult?.currency,
          paymentBrand: response.paymentResult?.paymentBrand,
          paymentDetails: response.paymentResult,
        },
      })

      return {
        status: ResponseStatus.fail,
        message: response.message || 'Plaćanje nije uspelo.',
        redirectUrl: '',
      }
    }
  } catch (error) {
    return {
      status: ResponseStatus.fail,
      message:
        error instanceof Error
          ? error.message
          : 'Došlo je do greške prilikom provere plaćanja',
      redirectUrl: '',
    }
  }
}
