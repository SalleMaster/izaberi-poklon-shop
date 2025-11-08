import { Suspense } from 'react'
import { cacheTag } from 'next/cache'
import Link from 'next/link'

import { getCategories } from '@/data/services/category'
import { shopInfo } from '@/lib/consts'

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import CategoryFilterButton, {
  CategoryFilterButtonSkeleton,
} from '@/app/(shop)/products/_components/CategoryFilterButton'

export default async function CategoriesDropdown() {
  'use cache'

  cacheTag('categories')

  const categories = await getCategories({ active: true })

  return (
    <DropdownMenuContent className='w-[90vw] md:px-4 md:w-72'>
      <DropdownMenuLabel>Kategorije</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {categories.map((category) => {
        return (
          <Suspense
            key={category.id}
            fallback={<CategoryFilterButtonSkeleton />}
          >
            <DropdownMenuItem asChild className='text-end'>
              <CategoryFilterButton category={category} />
            </DropdownMenuItem>
          </Suspense>
        )
      })}

      <DropdownMenuSeparator className='my-4' />
      <DropdownMenuItem className='text-end' asChild>
        <Suspense fallback={<CategoryFilterButtonSkeleton />}>
          <DropdownMenuItem asChild className='text-end'>
            <CategoryFilterButton />
          </DropdownMenuItem>
        </Suspense>
      </DropdownMenuItem>
      <DropdownMenuItem asChild className='text-end'>
        <Link href={'/o-nama'}>O nama</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <a href={`tel:${shopInfo.phone}`}>Call centar: {shopInfo.phone}</a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
