import { Suspense } from 'react'
import { cacheTag } from 'next/cache'

import { getCategories } from '@/data/services/category'
import NavbarMenu, { NavbarMenuSkeleton } from './NavbarMenu'

export default async function NavBottom() {
  'use cache'

  cacheTag('categories')

  const categories = await getCategories({ active: true })

  return (
    <Suspense fallback={<NavbarMenuSkeleton />}>
      <NavbarMenu categories={categories} />
    </Suspense>
  )
}
