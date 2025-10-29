'use server'

import prisma from '@/lib/db'
import { Prisma } from '@/generated/prisma'
import { revalidatePath } from 'next/cache'
import { discountSchema, DiscountValues } from '../_components/validation'
import { adminActionGuard } from '@/lib/actionGuard'

export async function createDiscount(values: DiscountValues) {
  try {
    await adminActionGuard()

    const { name, percentage, active } = discountSchema.parse(values)

    await prisma.discount.create({
      data: {
        name,
        percentage,
        active,
      },
    })

    return {
      status: 'success',
      message: 'Popust kreiran.',
    }
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        status: 'fail',
        message:
          'Ime popusta mora biti jedinstveno. Popust sa istim imenom već postoji.',
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/dashboard/discounts')
  }
}

export async function editDiscount(values: DiscountValues, id: string) {
  try {
    await adminActionGuard()

    const { name, percentage, active } = discountSchema.parse(values)

    await prisma.discount.update({
      where: { id },
      data: {
        name,
        percentage,
        active,
      },
    })

    return {
      status: 'success',
      message: 'Popust sačuvan.',
    }
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        status: 'fail',
        message:
          'Ime popusta mora biti jedinstveno. Popust sa istim imenom već postoji.',
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/dashboard/discounts')
  }
}

export async function deleteDiscount(id: string) {
  try {
    await adminActionGuard()

    await prisma.discount.delete({
      where: { id },
    })

    return {
      status: 'success',
      message: 'Popust obrisan.',
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
    revalidatePath('/dashboard/discounts')
  }
}
