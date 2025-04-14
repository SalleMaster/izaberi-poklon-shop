import 'server-only'

import { connection } from 'next/server'
import { cache } from 'react'
import prisma from '@/lib/db'

import { Category, Media, Prisma } from '@prisma/client'

export type CategoryWithImage = Category & { image: Media | null }

export type GetCategoriesReturnType = Promise<CategoryWithImage[]>

type Props = {
  active?: boolean
  special?: boolean
}

export const getCategories = cache(
  async ({ active, special }: Props): GetCategoriesReturnType => {
    console.log('getCategories')

    await connection()

    const where: Prisma.CategoryWhereInput = {}

    if (active !== undefined) {
      where.active = active
    }

    if (special !== undefined) {
      where.special = special
    }

    const categories = await prisma.category.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { image: true },
    })

    return categories
  }
)
