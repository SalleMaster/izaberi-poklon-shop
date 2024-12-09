'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { loggedInActionGuard } from '@/lib/actionGuard'
import {
  cartOrderSchema,
  CartOrderValues,
} from '../../cart/_components/cart-order-form/validation'
import { updateCartOverviewData } from '../cart/actions'
import { OrderDeliveryType } from '@prisma/client'
import { ZodError } from 'zod'

export async function cartCreateOrder(values: CartOrderValues) {
  try {
    const { userId } = await loggedInActionGuard()

    const {
      deliveryType,
      paymentType,
      selectedDeliveryAddressId,
      selectedBillingAddressId,
      pickupName,
      pickupPhone,
      pickupEmail,
    } = cartOrderSchema.parse(values)

    let deliveryAddress = null
    let billingAddress = null

    if (
      selectedDeliveryAddressId &&
      deliveryType === OrderDeliveryType.delivery
    ) {
      const selectedDeliveryAddress = await prisma.deliveryAddress.findUnique({
        where: {
          id: selectedDeliveryAddressId,
        },
      })

      if (!selectedDeliveryAddress) {
        throw new Error('Adresa dostave nije pronađena.')
      } else {
        deliveryAddress = selectedDeliveryAddress
        billingAddress = selectedDeliveryAddress
      }
    }

    if (
      selectedBillingAddressId &&
      deliveryType === OrderDeliveryType.delivery
    ) {
      billingAddress = await prisma.deliveryAddress.findUnique({
        where: {
          id: selectedBillingAddressId,
        },
      })

      if (!billingAddress) {
        throw new Error('Adresa računa nije pronađena.')
      }
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
            imagePersonalizations: true,
          },
        },
      },
    })

    if (!cart) {
      throw new Error('Korpa nije pronađena.')
    }

    await prisma.order.create({
      data: {
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
