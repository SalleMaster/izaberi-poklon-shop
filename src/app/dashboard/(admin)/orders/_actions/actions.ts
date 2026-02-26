'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import {
  orderDeleteImagesSchema,
  OrderDeleteImagesValues,
  orderStatusSchema,
  OrderStatusValues,
} from '../_components/validation'
import { adminActionGuard } from '@/lib/actionGuard'
import { deleteMediasFromS3 } from '@/lib/actions'
import { OrderStatusType } from '@/generated/prisma'

export async function updateOrderStatus(values: OrderStatusValues, id: string) {
  try {
    await adminActionGuard()

    const data = orderStatusSchema.parse(values)

    const order = await prisma.order.update({
      where: { id },
      data,
    })

    if (data.status === OrderStatusType.shipped && data.shippingNumber) {
      // Send email
      await fetch(`${process.env.APP_URL}/api/order-sent`, {
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
    }

    if (data.status === OrderStatusType.canceled) {
      // Send email
      await fetch(`${process.env.APP_URL}/api/order-canceled`, {
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
    }

    if (data.status === OrderStatusType.delivered) {
      // Send email
      await fetch(`${process.env.APP_URL}/api/order-delivered`, {
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
    }

    return {
      status: 'success',
      message: 'Status porudžbine sačuvan.',
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 'fail',
        message: error.message,
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/dashboard/orders')
  }
}

export async function deleteOrderImages(values: OrderDeleteImagesValues) {
  try {
    const { id, keys } = orderDeleteImagesSchema.parse(values)

    await deleteMediasFromS3(keys)

    await prisma.order.update({
      where: { id },
      data: {
        mediaRemoved: true,
      },
    })

    return {
      status: 'success',
      message: 'Slike porudžbine su izbrisane.',
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 'fail',
        message: error.message,
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/dashboard/orders')
  }
}
