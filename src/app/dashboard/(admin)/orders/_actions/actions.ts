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
import { OrderStatusType } from '@prisma/client'

export async function updateOrderStatus(values: OrderStatusValues, id: string) {
  try {
    await adminActionGuard()

    const data = orderStatusSchema.parse(values)

    const order = await prisma.order.update({
      where: { id },
      data,
    })

    let successMessage = `Status porudžbine sačuvan.`

    if (data.status === OrderStatusType.shipped && data.shippingNumber) {
      // Send email
      const response = await fetch(`${process.env.APP_URL}/api/order-sent`, {
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

      const result = await response.json()

      console.log('Response from email API:', result)

      successMessage = `Status porudžbine sačuvan. ${result.success ? 'Email poslat.' : 'Greška prilikom slanja email-a.'}`
    }

    return {
      status: 'success',
      message: successMessage,
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
