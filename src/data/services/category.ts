import 'server-only'

import { unstable_noStore } from 'next/cache'
import { cache } from 'react'
import prisma from '@/lib/db'
import { slow } from '@/lib/slow'

export const getAllCategories = cache(async () => {
  console.log('getAllCategories')

  unstable_noStore()
  await slow(1000)

  const categories = await prisma.category.findMany({
    orderBy: { createdAt: 'desc' },
    include: { image: true },
  })

  return categories
})

export const getActiveCategories = cache(async () => {
  console.log('getActiveCategories')

  unstable_noStore()
  await slow(1000)

  const categories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
    include: { image: true },
  })

  return categories
})

export const getSpecialCategories = cache(async () => {
  console.log('getSpecialCategories')

  unstable_noStore()
  await slow(1000)

  const categories = await prisma.category.findMany({
    where: { active: true, special: true },
    orderBy: { createdAt: 'desc' },
    include: { image: true },
  })

  return categories
})
