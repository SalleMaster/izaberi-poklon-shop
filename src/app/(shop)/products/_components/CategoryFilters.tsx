import { Suspense } from 'react'
import { cacheTag } from 'next/cache'

import { getCategories } from '@/data/services/category'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import CategoryFilterButton, {
  CategoryFilterButtonSkeleton,
} from './CategoryFilterButton'
import { Separator } from '@/components/ui/separator'

export default async function CategoryFilters() {
  'use cache'

  cacheTag('categories')

  const categories = await getCategories({ active: true })

  return (
    <Card className='hidden md:block mb-auto sticky top-[120px]'>
      <CardHeader>
        <CardDescription>Kategorije</CardDescription>
      </CardHeader>
      <CardContent>
        {categories.map((category) => {
          return (
            <Suspense
              key={category.id}
              fallback={<CategoryFilterButtonSkeleton />}
            >
              <CategoryFilterButton category={category} />
            </Suspense>
          )
        })}

        <Separator className='my-4' />

        <Suspense fallback={<CategoryFilterButtonSkeleton />}>
          <CategoryFilterButton />
        </Suspense>
      </CardContent>
    </Card>
  )
}
