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

export async function updateOrderStatus(values: OrderStatusValues, id: string) {
  try {
    await adminActionGuard()

    const data = orderStatusSchema.parse(values)

    await prisma.order.update({
      where: { id },
      data,
    })

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

    console.log({ id, keys })

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
