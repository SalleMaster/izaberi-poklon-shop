'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import {
  deliveryAddressSchema,
  DeliveryAddressValues,
} from '../_components/validation'
import { loggedInActionGuard } from '@/lib/actionGuard'

export async function createDeliveryAddress(values: DeliveryAddressValues) {
  try {
    const { userId } = await loggedInActionGuard()

    const data = deliveryAddressSchema.parse(values)

    await prisma.deliveryAddress.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })

    return {
      status: 'success',
      message: 'Adresa kreirana.',
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
    revalidatePath('/dashboard/delivery-address')
  }
}

export async function editDeliveryAddress(
  values: DeliveryAddressValues,
  id: string
) {
  try {
    const { userId } = await loggedInActionGuard()

    const data = deliveryAddressSchema.parse(values)

    const deliveryAddress = await prisma.deliveryAddress.update({
      where: { id, userId },
      data,
    })

    if (!deliveryAddress) {
      throw new Error('Adresa nije pronađena.')
    }

    return {
      status: 'success',
      message: 'Adresa sačuvana.',
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
    revalidatePath('/dashboard/delivery-address')
  }
}

export async function deleteDeliveryAddress(id: string) {
  try {
    const { userId } = await loggedInActionGuard()

    const deletedDeliveryAddress = await prisma.deliveryAddress.delete({
      where: { id, userId },
    })

    if (!deletedDeliveryAddress) {
      throw new Error('Adresa nije pronađena.')
    }

    return {
      status: 'success',
      message: 'Adresa obrisana.',
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
    revalidatePath('/dashboard/delivery-address')
  }
}
