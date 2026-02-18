'use server'

import prisma from '@/lib/db'
import { Prisma } from '@/generated/prisma/client'
import { revalidatePath } from 'next/cache'
import { couponSchema, CouponValues } from '../_components/validation'
import { adminActionGuard } from '@/lib/actionGuard'

export async function createCoupon(values: CouponValues) {
  try {
    await adminActionGuard()

    const data = couponSchema.parse(values)

    await prisma.coupon.create({
      data,
    })

    return {
      status: 'success',
      message: 'Kupon kreiran.',
    }
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        status: 'fail',
        message:
          'Kupon kod mora biti jedinstven. Kupon kod sa istim kodom već postoji.',
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/dashboard/coupons')
  }
}

export async function editCoupon(values: CouponValues, id: string) {
  try {
    await adminActionGuard()

    const data = couponSchema.parse(values)

    await prisma.coupon.update({
      where: { id },
      data,
    })

    return {
      status: 'success',
      message: 'Kupon sačuvan.',
    }
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        status: 'fail',
        message:
          'Kupon kod mora biti jedinstven. Kupon kod sa istim kodom već postoji.',
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/dashboard/coupons')
  }
}

export async function deleteCoupon(id: string) {
  try {
    await adminActionGuard()

    await prisma.coupon.delete({
      where: { id },
    })

    return {
      status: 'success',
      message: 'Kupon obrisan.',
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
    revalidatePath('/dashboard/coupons')
  }
}
