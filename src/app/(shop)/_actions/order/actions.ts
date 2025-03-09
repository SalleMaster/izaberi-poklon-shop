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
import { createPaymentCheckout } from '@/lib/checkout'

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

    const orderNumber = generateOrderNumber()

    const initialStatus =
      paymentType === OrderPaymentType.card
        ? OrderStatusType.draft
        : OrderStatusType.pending

    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: initialStatus,
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

    // For card payments, create a payment checkout
    if (paymentType === OrderPaymentType.card) {
      const checkoutResult = await createPaymentCheckout({
        orderId: order.id,
        amount: orderTotalPrice.toString(),
        currency: 'RSD',
      })

      if (checkoutResult.status === 'fail') {
        throw new Error(
          checkoutResult.message || 'Failed to create payment checkout'
        )
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
        status: 'success',
        message: 'Porudžbina kreirana. Preusmeravanje na plaćanje...',
        redirectUrl: `/placanje/${order.id}?checkoutId=${checkoutResult.checkoutId}`,
      }
    } else {
      // For non-card payments, send email immediately
      await sendOrderEmail(
        order,
        billingAddress?.email || deliveryAddress?.email || pickupEmail || ''
      )

      return {
        status: 'success',
        message: `Porudžbina kreirana.`,
        redirectUrl: `/porudzbina-kreirana/${order.id}`,
      }
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        status: 'fail',
        message: error.errors.map((e) => e.message).join(', '),
        redirectUrl: '',
      }
    }

    if (error instanceof Error) {
      return {
        status: 'fail',
        message: error.message,
        redirectUrl: '',
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/cart')
  }
}

export async function sendOrderEmail(order: any, email: string) {
  // Send email
  await fetch(`${process.env.APP_URL}/api/order-created`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      order,
      orderEmail: email,
    }),
  })
}
