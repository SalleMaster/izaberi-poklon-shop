'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import {
  ratingStatusSchema,
  RatingStatusValues,
} from '../_components/validation'
import { adminActionGuard } from '@/lib/actionGuard'

export async function updateRatingStatus(
  values: RatingStatusValues,
  id: string
) {
  try {
    await adminActionGuard()

    const data = ratingStatusSchema.parse(values)

    await prisma.rating.update({
      where: { id },
      data,
    })

    return {
      status: 'success',
      message: 'Status recenzije sačuvan.',
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
    revalidatePath('/admin/ratings')
  }
}
