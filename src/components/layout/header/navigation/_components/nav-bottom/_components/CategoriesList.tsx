import React, { TransitionStartFunction } from 'react'
import Image from 'next/image'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { fallbackImageURL } from '@/lib/consts'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { CategoryWithImage } from '@/data/services/category'

type Props = {
  categories: CategoryWithImage[]
  optimisticCategory: string[]
  pageUrl: string
  setOptimisticCategories: (categories: string[]) => void
  startTransition: TransitionStartFunction
  createQueryString: ({
    addParams,
    removeParams,
  }: {
    addParams?: {
      name: string
      value: string
    }[]
    removeParams?: string[]
  }) => string
}

export default function CategoriesList({
  categories,
  pageUrl,
  optimisticCategory,
  setOptimisticCategories,
  startTransition,
  createQueryString,
}: Props) {
  return (
    <>
      {categories.map((category) => (
        <DropdownMenuItem key={category.id} asChild>
          <Link
            href={`${pageUrl}?${createQueryString({
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
    </>
  )
}

export function CategoriesListSkeleton() {
  return (
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
      <Skeleton className='h-[36px] w-[100%]' />
      <Skeleton className='h-[36px] w-[100%]' />
    </div>
  )
}
