'use server'

import { auth } from '@/auth'
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { discountSchema, DiscountValues } from '../_components/validation'

export async function createDiscount(values: DiscountValues) {
  const session = await auth()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  if (!userId || userRole !== 'admin') {
    throw Error('Unauthorized')
  }

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
  const session = await auth()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  if (!userId || userRole !== 'admin') {
    throw Error('Unauthorized')
  }

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
  const session = await auth()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  if (!userId || userRole !== 'admin') {
    throw Error('Unauthorized')
  }

  await prisma.discount.delete({
    where: { id },
  })

  revalidatePath('/dashboard/discounts')
}
