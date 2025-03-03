'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { loggedInActionGuard } from '@/lib/actionGuard'
import {
  cartOrderSchema,
  CartOrderValues,
} from '../../cart/_components/cart-order-form/validation'
import { updateCartOverviewData } from '../cart/actions'
import {
  OrderDeliveryType,
  OrderPaymentStatusType,
  OrderPaymentType,
  OrderStatusType,
} from '@prisma/client'
import { ZodError } from 'zod'
import { generateOrderNumber } from '@/lib/orderUtils'
import {
  checkPaymentStatus,
  isPaymentSuccessful,
  preparePaymentForOrder,
} from '@/lib/checkout'

export async function cartCreateOrder(values: CartOrderValues) {
  try {
    const { userId } = await loggedInActionGuard()

    const {
      deliveryType,
      paymentType,
      selectedDeliveryAddressId,
      selectedBillingAddressId,
      selectedDeliveryServiceId,
      pickupName,
      pickupPhone,
      pickupEmail,
      termsAccepted,
    } = cartOrderSchema.parse(values)

    let deliveryAddress = null
    let billingAddress = null
    let deliveryService = null

    if (termsAccepted !== true) {
      throw new Error(
        'Da biste izvršili kupovinu potrebno je prihvatiti uslove kupovine.'
      )
    }

    if (deliveryType === OrderDeliveryType.delivery) {
      const selectedDeliveryAddress = await prisma.deliveryAddress.findUnique({
        where: {
          id: selectedDeliveryAddressId,
        },
      })
      if (!selectedDeliveryAddress) {
        throw new Error('Adresa dostave nije pronađena.')
      }
      deliveryAddress = selectedDeliveryAddress

      const selectedBillingAddress = await prisma.deliveryAddress.findUnique({
        where: {
          id: selectedBillingAddressId,
        },
      })
      if (!selectedBillingAddress) {
        throw new Error('Adresa računa nije pronađena.')
      }
      billingAddress = selectedBillingAddress

      const selectedDeliveryService = await prisma.deliveryService.findUnique({
        where: {
          id: selectedDeliveryServiceId,
        },
      })
      if (!selectedDeliveryService) {
        throw new Error('Kurirska služba nije pronađena.')
      }
      deliveryService = selectedDeliveryService
    }

    const cart = await prisma.cart.findFirst({
      where: {
        userId,
      },
      include: {
        coupon: true,
        items: {
          include: {
            product: {
              include: {
                coverImage: true,
              },
            },
            textPersonalizations: true,
            imagePersonalizations: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    })

    if (!cart) {
      throw new Error('Korpa nije pronađena.')
    }

    const orderOnlinePrice = cart.onlinePrice
    const orderDiscount = cart.discount
    let orderDeliveryFee = 0
    let orderTotalPrice = cart.totalPrice

    if (
      deliveryType === OrderDeliveryType.delivery &&
      deliveryService?.predefinedPrices &&
      paymentType === OrderPaymentType.card
    ) {
      orderDeliveryFee = cart.deliveryFee
      orderTotalPrice = cart.totalPriceWithDeliveryFee
    }

    if (cart.coupon) {
      await prisma.coupon.update({
        where: {
          id: cart.coupon.id,
        },
        data: {
          used: {
            increment: 1,
          },
        },
      })
    }

    // Create a payment request here

    const orderNumber = generateOrderNumber()

    // Set initial order status based on payment type
    const paymentStatus =
      paymentType === OrderPaymentType.card
        ? OrderPaymentStatusType.paymentPending
        : OrderPaymentStatusType.paymentSuccess

    const order = await prisma.order.create({
      data: {
        orderNumber,
        paymentStatus,
        termsAccepted,
        deliveryType,
        paymentType,
        pickupName,
        pickupPhone,
        pickupEmail,
        deliveryName: deliveryAddress?.name ?? '',
        deliveryAddress: deliveryAddress?.address ?? '',
        deliveryCity: deliveryAddress?.city ?? '',
        deliveryZip: deliveryAddress?.zip ?? '',
        deliveryPhone: deliveryAddress?.phone ?? '',
        deliveryEmail: deliveryAddress?.email ?? '',
        deliveryNote: deliveryAddress?.note ?? '',
        billingName: billingAddress?.name ?? '',
        billingAddress: billingAddress?.address ?? '',
        billingCity: billingAddress?.city ?? '',
        billingZip: billingAddress?.zip ?? '',
        billingPhone: billingAddress?.phone ?? '',
        billingEmail: billingAddress?.email ?? '',
        billingNote: billingAddress?.note ?? '',
        deliveryServiceName: deliveryService?.name ?? '',
        orderOnlinePrice,
        orderDiscount,
        orderDeliveryFee,
        orderTotalPrice,
        cart,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    // Clear the cart
    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    })
    await updateCartOverviewData({ userId })

    // Handle payment if payment type is card
    if (paymentType === OrderPaymentType.card) {
      const returnUrl = `${process.env.APP_URL}/placanje-verifikacija/${order.id}`
      const checkoutId = await preparePaymentForOrder(order, returnUrl)

      if (!checkoutId) {
        throw new Error('Failed to create payment. Please try again.')
      }

      // Store the checkout ID with the order
      await prisma.order.update({
        where: { id: order.id },
        data: { paymentReference: checkoutId },
      })

      return {
        status: 'redirect_to_payment',
        message: 'Redirecting to payment...',
        orderId: order.id,
        checkoutId,
      }
    }

    // Send email
    await fetch(`${process.env.APP_URL}/api/order-created`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order,
        orderEmail:
          billingAddress?.email || deliveryAddress?.email || pickupEmail,
      }),
    })

    return {
      status: 'success',
      message: 'Narudžbina kreirana.',
      orderId: order.id,
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: 'fail',
        message: error.errors.map((e) => e.message).join(', '),
      }
    }

    if (error instanceof Error) {
      return {
        status: 'fail',
        message: error.message,
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/cart')
  }
}

export async function verifyPayment(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order || !order.paymentReference) {
      throw new Error('Order not found or missing payment reference')
    }

    const paymentStatus = await checkPaymentStatus(order.paymentReference)
    const isSuccessful = isPaymentSuccessful(paymentStatus)

    if (isSuccessful) {
      // Update order status to paid
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: OrderPaymentStatusType.paymentSuccess,
          paymentDetails: JSON.stringify(paymentStatus),
        },
      })

      // Send order confirmation email
      await fetch(`${process.env.APP_URL}/api/order-created`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order,
          orderEmail:
            order.billingEmail || order.deliveryEmail || order.pickupEmail,
        }),
      })

      return {
        status: 'success',
        message: 'Payment successful',
      }
    } else {
      // Update order status to payment failed
      await prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: OrderPaymentStatusType.paymentFailed,
          paymentDetails: JSON.stringify(paymentStatus),
        },
      })

      return {
        status: 'fail',
        message: 'Payment failed',
        details: paymentStatus,
      }
    }
  } catch (error) {
    console.error('Error verifying payment:', error)
    return {
      status: 'error',
      message:
        error instanceof Error ? error.message : 'Error verifying payment',
    }
  }
}
