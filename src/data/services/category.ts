import 'server-only'

import { connection } from 'next/server'
import { cache } from 'react'
import prisma from '@/lib/db'

import { Category, Media } from '@prisma/client'

export const getAllCategories = cache(async () => {
  console.log('getAllCategories')

  await connection()

  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
    include: { image: true },
  })

  return categories
})

export type CategoryWithImage = Category & { image: Media | null }

export type GetActiveCategoriesReturnType = Promise<CategoryWithImage[]>

export const getActiveCategories = cache(
  async (): GetActiveCategoriesReturnType => {
    console.log('getActiveCategories')

    await connection()

    const categories = await prisma.category.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
      include: { image: true },
    })

    return categories
  }
)

export const getSpecialCategories = cache(async () => {
  console.log('getSpecialCategories')

  await connection()

  const categories = await prisma.category.findMany({
    where: { active: true, special: true },
    orderBy: { createdAt: 'desc' },
    include: { image: true },
  })

  return categories
})
