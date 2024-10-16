'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { discountSchema, DiscountValues } from '../_components/validation'
import { adminActionGuard } from '@/lib/actionGuard'

export async function createDiscount(values: DiscountValues) {
  await adminActionGuard()

  const { name, percentage, active } = discountSchema.parse(values)

  await prisma.discount.create({
    data: {
      name,
      percentage,
      active,
    },
  })

  revalidatePath('/dashboard/discounts')
}

export async function editDiscount(values: DiscountValues, id: string) {
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

  revalidatePath('/dashboard/discounts')
}

export async function deleteDiscount(id: string) {
  await adminActionGuard()

  await prisma.discount.delete({
    where: { id },
  })

  revalidatePath('/dashboard/discounts')
}
