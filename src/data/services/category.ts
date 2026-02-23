import 'server-only'

import { cache } from 'react'
import prisma from '@/lib/db'

import { Category, Media, Prisma } from '@/generated/prisma/client'

export type CategoryWithImage = Category & { image: Media | null }

export type GetCategoriesReturnType = Promise<CategoryWithImage[]>

type Props = {
  active?: boolean
  special?: boolean
}

export const getCategories = cache(
  async ({ active, special }: Props): GetCategoriesReturnType => {
    console.log('getCategories')

    const where: Prisma.CategoryWhereInput = {}

    if (active !== undefined) {
      where.active = active
    }

    if (special !== undefined) {
      where.special = special
    }

    const categories = await prisma.category.findMany({
      where,
      orderBy: { position: 'asc' },
      include: { image: true },
    })

    return categories
  },
)
