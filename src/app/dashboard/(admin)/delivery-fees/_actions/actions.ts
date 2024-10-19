'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { deliveryFeeSchema, DeliveryFeeValues } from '../_components/validation'
import { adminActionGuard } from '@/lib/actionGuard'

export async function createDeliveryFee(values: DeliveryFeeValues) {
  try {
    await adminActionGuard()

    const { name, fee } = deliveryFeeSchema.parse(values)

    await prisma.deliveryFee.create({
      data: {
        name,
        fee,
      },
    })

    return {
      status: 'success',
      message: 'Cena poštarine kreirana.',
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
    revalidatePath('/dashboard/delivery-fees')
  }
}

export async function editDeliveryFee(values: DeliveryFeeValues, id: string) {
  try {
    await adminActionGuard()

    const { name, fee } = deliveryFeeSchema.parse(values)

    await prisma.deliveryFee.update({
      where: { id },
      data: {
        name,
        fee,
      },
    })

    return {
      status: 'success',
      message: 'Cena poštarine sačuvana.',
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
    revalidatePath('/dashboard/delivery-fees')
  }
}

export async function deleteDeliveryFee(id: string) {
  try {
    await adminActionGuard()

    await prisma.deliveryFee.delete({
      where: { id },
    })

    return {
      status: 'success',
      message: 'Cena poštarine obrisana.',
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
    revalidatePath('/dashboard/delivery-fees')
  }
}
