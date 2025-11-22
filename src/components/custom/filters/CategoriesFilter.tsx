import { Suspense } from 'react'
import { cacheTag } from 'next/cache'

import { getCategories } from '@/data/services/category'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import CategoryFilterButton, {
  CategoryFilterButtonSkeleton,
} from '@/app/(shop)/products/_components/CategoryFilterButton'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import SelectedCategoryLabel from './components/SelectedCategory'

export default async function CategoryFilter() {
  'use cache'

  cacheTag('categories')

  const categories = await getCategories({ active: true })

  return (
    <div>
      <span className='mr-2'>Kategorije:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='secondary'>
            <Suspense fallback='Izaberi kategoriju'>
              <SelectedCategoryLabel categories={categories} />
            </Suspense>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {categories.map((category) => {
            return (
              <Suspense
                key={category.id}
                fallback={<CategoryFilterButtonSkeleton />}
              >
                <DropdownMenuPrimitive.Item asChild>
                  <CategoryFilterButton category={category} />
                </DropdownMenuPrimitive.Item>
              </Suspense>
            )
          })}

          <Separator className='my-4' />

          <Suspense fallback={<CategoryFilterButtonSkeleton />}>
            <DropdownMenuPrimitive.Item asChild>
              <CategoryFilterButton />
            </DropdownMenuPrimitive.Item>
          </Suspense>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
