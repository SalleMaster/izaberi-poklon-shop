'use client'

import type { Category, Media } from '@prisma/client'
import { usePathname } from 'next/navigation'
import React, { use, useOptimistic, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { fallbackImageURL, shopInfo } from '@/lib/consts'
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
  const pathname = usePathname()
  const categories = use(categoriesPromise)
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [optimisticCategory, setOptimisticCategories] = useOptimistic(
    searchParams.getAll('kategorija')
  )
  // const selectedCategory = searchParams.getAll('kategorija')

  const createQueryString = useCreateQueryString(searchParams)

  return (
    <>
      {categories.map((category) => (
        <DropdownMenuItem
          data-pending-products={isPending ? '' : undefined}
          key={category.id}
          asChild
        >
          <Link
            href={`/pokloni?${createQueryString({
              addParams: [{ name: 'kategorija', value: category.slug }],
              removeParams: ['stranica'],
            })}`}
            className={cn(
              optimisticCategory?.includes(category.slug) &&
                'bg-accent text-accent-foreground'
            )}
            onClick={() => {
              startTransition(() => {
                setOptimisticCategories([category.slug])
              })
            }}
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
      <DropdownMenuSeparator className='my-4' />
      <DropdownMenuItem className='text-end' asChild>
        <Link
          href={`/pokloni?${createQueryString({ removeParams: ['kategorija', 'stranica'] })}`}
          className={cn(
            pathname === '/pokloni' &&
              optimisticCategory.length === 0 &&
              'bg-accent text-accent-foreground'
          )}
          onClick={() => {
            startTransition(() => {
              setOptimisticCategories([])
            })
          }}
        >
          Svi pokloni
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild className='text-end'>
        <Link
          href={'/o-nama'}
          className={cn(
            pathname === '/o-nama' && 'bg-accent text-accent-foreground'
          )}
        >
          O nama
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <a href={`tel:${shopInfo.phone}`}>Call centar: {shopInfo.phone}</a>
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
