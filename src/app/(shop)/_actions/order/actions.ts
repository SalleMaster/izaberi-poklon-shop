'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { loggedInActionGuard } from '@/lib/actionGuard'
import {
  cartOrderSchema,
  CartOrderValues,
} from '../../cart/_components/cart-order-form/validation'
import { updateCartOverviewData } from '../cart/actions'
import { OrderDeliveryType, OrderPaymentType } from '@prisma/client'
import { ZodError } from 'zod'

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
    } = cartOrderSchema.parse(values)

    let deliveryAddress = null
    let billingAddress = null
    let deliveryService = null

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

    const lastOrder = await prisma.order.findFirst({
      orderBy: {
        orderNumber: 'desc',
      },
    })
    const nextOrderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1

    const order = await prisma.order.create({
      data: {
        orderNumber: nextOrderNumber,
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
