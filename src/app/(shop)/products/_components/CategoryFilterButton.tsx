'use client'

import { ComponentProps, useOptimistic, useTransition } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import useCreateQueryString from '@/hooks/use-create-query-string'
import { CategoryWithImage } from '@/data/services/category'
import { fallbackImageURL } from '@/lib/consts'
import { cn } from '@/lib/utils'

import DynamicImage from '@/components/custom/DynamicImage'

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {
  category?: CategoryWithImage
}

export default function CategoryFilterButton({ category, ...props }: Props) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [optimisticCategory, setOptimisticCategories] = useOptimistic(
    searchParams.getAll('kategorija')
  )

  const baseURL =
    pathname === '/admin/proizvodi' ? '/admin/proizvodi' : '/pokloni'

  const createQueryString = useCreateQueryString(searchParams)
  const active = category
    ? optimisticCategory?.includes(category.slug)
    : !searchParams.get('kategorija')

  const href = category
    ? {
        pathname: baseURL,
        query: createQueryString({
          addParams: [{ name: 'kategorija', value: category.slug }],
          removeParams: ['stranica'],
        }),
      }
    : {
        pathname: baseURL,
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
      {...props}
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
      {...props}
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
