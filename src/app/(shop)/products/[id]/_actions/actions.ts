'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import {
  productRatingSchema,
  ProductRatingValues,
} from '../_components/product-rating-form/validation'
import { loggedInActionGuard } from '@/lib/actionGuard'

export async function createProductRating(
  values: ProductRatingValues,
  productId: string
) {
  try {
    const { userId } = await loggedInActionGuard()

    const data = productRatingSchema.parse(values)

    await prisma.rating.create({
      data: {
        ...data,
        userId,
        productId,
      },
    })

    return {
      status: 'success',
      message:
        'Hvala na oceni proizvoda. Vaša ocena će biti prikazana nakon odobrenja.',
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
    revalidatePath(`/products/${productId}`)
  }
}
