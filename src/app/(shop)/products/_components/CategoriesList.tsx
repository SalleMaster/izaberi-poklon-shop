'use client'

import { useSearchParams } from 'next/navigation'
import type { Category, Media } from '@prisma/client'
import React, { use, useOptimistic, useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { fallbackImageURL } from '@/lib/consts'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import useCreateQueryString from '@/hooks/use-create-query-string'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'

type CategoryWithImage = Category & {
  image: Media | null
}

type Props = {
  categoriesPromise: Promise<CategoryWithImage[]>
  pageUrl: string
}

export default function CategoriesList({ categoriesPromise, pageUrl }: Props) {
  const categories = use(categoriesPromise)
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [optimisticCategory, setOptimisticCategories] = useOptimistic(
    searchParams.getAll('kategorija')
  )

  const createQueryString = useCreateQueryString(searchParams)

  return (
    <>
      <ScrollArea className='h-[45vh]'>
        <ul data-pending-products={isPending ? '' : undefined}>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                className={cn(
                  'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
                  optimisticCategory?.includes(category.slug) &&
                    'bg-accent text-accent-foreground'
                )}
                href={`${pageUrl}?${createQueryString({
                  addParams: [{ name: 'kategorija', value: category.slug }],
                  removeParams: ['stranica'],
                })}`}
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
            </li>
          ))}
        </ul>
      </ScrollArea>

      <Separator className='my-4' />

      <Link
        href={`${pageUrl}?${createQueryString({ removeParams: ['kategorija', 'stranica'] })}`}
        className={cn(
          'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
          optimisticCategory.length === 0 && 'bg-accent text-accent-foreground'
        )}
        onClick={() => {
          startTransition(() => {
            setOptimisticCategories([])
          })
        }}
      >
        Svi pokloni
      </Link>
    </>
  )
}

export function CategoriesListSkeleton() {
  return (
    <div>
      <ScrollArea className='h-[45vh]'>
        <div className='space-y-1'>
          <Skeleton className='h-[36px] w-[100%]' />
          <Skeleton className='h-[36px] w-[100%]' />
          <Skeleton className='h-[36px] w-[100%]' />
          <Skeleton className='h-[36px] w-[100%]' />
          <Skeleton className='h-[36px] w-[100%]' />
          <Skeleton className='h-[36px] w-[100%]' />
          <Skeleton className='h-[36px] w-[100%]' />
          <Skeleton className='h-[36px] w-[100%]' />
          <Skeleton className='h-[36px] w-[100%]' />
          <Skeleton className='h-[36px] w-[100%]' />
          <Skeleton className='h-[36px] w-[100%]' />
          <Skeleton className='h-[36px] w-[100%]' />
          <Skeleton className='h-[36px] w-[100%]' />
          <Skeleton className='h-[36px] w-[100%]' />
          <Skeleton className='h-[36px] w-[100%]' />
          <Skeleton className='h-[36px] w-[100%]' />
        </div>
      </ScrollArea>

      <Separator className='my-4' />

      <Link
        href={`/pokloni`}
        className={cn(
          'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50'
        )}
      >
        Svi pokloni
      </Link>
    </div>
  )
}
