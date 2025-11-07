'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useOptimistic, useTransition } from 'react'

import useCreateQueryString from '@/hooks/use-create-query-string'
import { CategoryWithImage } from '@/data/services/category'
import { fallbackImageURL } from '@/lib/consts'
import DynamicImage from '@/components/custom/DynamicImage'
import { cn } from '@/lib/utils'

interface Props {
  category?: CategoryWithImage
}

export default function CategoryFilterButton({ category }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [optimisticCategory, setOptimisticCategories] = useOptimistic(
    searchParams.getAll('kategorija')
  )

  const createQueryString = useCreateQueryString(searchParams)
  const active = category
    ? optimisticCategory?.includes(category.slug)
    : !searchParams.get('kategorija')

  const href = category
    ? {
        pathname,
        query: createQueryString({
          addParams: [{ name: 'kategorija', value: category.slug }],
          removeParams: ['stranica'],
        }),
      }
    : {
        pathname,
        query: createQueryString({ removeParams: ['kategorija', 'stranica'] }),
      }

  return category ? (
    <Link
      data-pending-products={isPending ? '' : undefined}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
        active && 'bg-accent text-accent-foreground'
      )}
      href={href}
      onClick={() => {
        startTransition(() => {
          setOptimisticCategories([category.slug])
        })
      }}
    >
      <div className='w-6 mr-2'>
        <DynamicImage
          src={category?.image?.url || fallbackImageURL}
          alt={category?.image?.name || 'No image'}
          width={24}
          height={24}
        />
      </div>
      {category.name}
    </Link>
  ) : (
    <Link
      data-pending-products={isPending ? '' : undefined}
      href={href}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
        active && 'bg-accent text-accent-foreground'
      )}
      onClick={() => {
        startTransition(() => {
          setOptimisticCategories([])
        })
      }}
    >
      Svi pokloni
    </Link>
  )
}

export function CategoryFilterButtonSkeleton() {
  return (
    <div
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50'
      )}
    >
      ...
    </div>
  )
}
