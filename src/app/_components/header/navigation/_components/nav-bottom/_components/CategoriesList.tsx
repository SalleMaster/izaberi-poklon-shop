'use client'

import type { Category, Media } from '@prisma/client'
import { use } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { fallbackImageURL } from '@/lib/consts'
import useCreateQueryString from '@/hooks/use-create-query-string'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

type CategoryWithImage = Category & {
  image: Media | null
}

type Props = {
  categoriesPromise: Promise<CategoryWithImage[]>
}

export default function CategoriesList({ categoriesPromise }: Props) {
  const categories = use(categoriesPromise)
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.getAll('kategorija')

  const createQueryString = useCreateQueryString(searchParams)

  return (
    <>
      {categories.map((category) => (
        <DropdownMenuItem key={category.id} asChild>
          <Link
            href={`/pokloni?${createQueryString({
              addParams: [{ name: 'kategorija', value: category.slug }],
            })}`}
            className={cn(
              selectedCategory?.includes(category.slug) &&
                'bg-accent text-accent-foreground'
            )}
          >
            <div className='w-6 mr-2'>
              <Image
                src={category?.image?.url || fallbackImageURL}
                alt={category?.image?.name || 'No image'}
                width={24}
                height={24}
              />
            </div>
            {category.name}
          </Link>
        </DropdownMenuItem>
      ))}
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild className='text-end'>
        <Link
          href={`/pokloni?${createQueryString({ removeParams: ['kategorija'] })}`}
          className={cn(
            selectedCategory.length === 0 && 'bg-accent text-accent-foreground'
          )}
        >
          Svi pokloni
        </Link>
      </DropdownMenuItem>
    </>
  )
}

export function CategoriesListSkeleton() {
  return (
    <div className='space-y-1'>
      <Skeleton className='h-[36px] w-[100%]' />
      <Skeleton className='h-[36px] w-[100%]' />
      <Skeleton className='h-[36px] w-[100%]' />
    </div>
  )
}
