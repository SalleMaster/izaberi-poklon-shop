'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { orderStatusSchema, OrderStatusValues } from '../_components/validation'
import { adminActionGuard } from '@/lib/actionGuard'

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
