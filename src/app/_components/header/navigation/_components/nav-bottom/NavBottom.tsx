'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import React, { use, useOptimistic, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { fallbackImageURL, shopInfo } from '@/lib/consts'
import { CategoryWithImage } from '@/data/services/category'
import { usePathname, useSearchParams } from 'next/navigation'
import useCreateQueryString from '@/hooks/use-create-query-string'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  categoriesPromise: Promise<CategoryWithImage[]>
}

export default function NavbarMenu({ categoriesPromise }: Props) {
  const categories = use(categoriesPromise)
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [optimisticCategory, setOptimisticCategories] = useOptimistic(
    searchParams.getAll('kategorija')
  )

  const createQueryString = useCreateQueryString(searchParams)

  return (
    <div
      data-pending-products={isPending ? '' : undefined}
      className='bg-primary'
    >
      <div className='container mx-auto flex'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary' className='rounded-none'>
              Pokloni
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='max-h-[75vh] w-[90vw] overflow-y-auto md:px-4 md:w-72'>
            <DropdownMenuLabel>Kategorije</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categories.map((category) => (
              <DropdownMenuItem key={category.id} asChild>
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
              <a href={`tel:${shopInfo.phone}`}>
                Call centar: {shopInfo.phone}
              </a>
            </DropdownMenuItem>
            {/* <CategoriesList
              categories={categories}
              pathname={pathname}
              optimisticCategory={optimisticCategory}
              setOptimisticCategories={setOptimisticCategories}
              startTransition={startTransition}
              createQueryString={createQueryString}
            /> */}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className='rounded-none'>
          <Link href={`/pokloni?aktuelno=da`}>Aktuelno</Link>
        </Button>
        <Button className='rounded-none' asChild>
          <Link href={`/pokloni?kategorija=korporativni-pokloni`}>
            Korporativni pokloni
          </Link>
        </Button>
        <Button className='hidden md:block rounded-none' asChild>
          <Link href={'/o-nama'}>O nama</Link>
        </Button>
        <Button className='hidden md:block rounded-none ml-auto' asChild>
          <a href={`tel:${shopInfo.phone}`}>Call centar: {shopInfo.phone}</a>
        </Button>
      </div>
    </div>
  )
}

export function NavbarMenuSkeleton() {
  return (
    <div className='bg-primary'>
      <div className='container mx-auto flex'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary' className='rounded-none'>
              Pokloni
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='max-h-[75vh] w-[90vw] overflow-y-auto md:px-4 md:w-72'>
            <DropdownMenuLabel>Kategorije</DropdownMenuLabel>
            <DropdownMenuSeparator />
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
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className='rounded-none'>
          <Link href={`/pokloni?aktuelno=da`}>Aktuelno</Link>
        </Button>
        <Button className='rounded-none' asChild>
          <Link href={`/pokloni?kategorija=korporativni-pokloni`}>
            Korporativni pokloni
          </Link>
        </Button>
        <Button className='hidden md:block rounded-none' asChild>
          <Link href={'/o-nama'}>O nama</Link>
        </Button>
        <Button className='hidden md:block rounded-none ml-auto' asChild>
          <a href={`tel:${shopInfo.phone}`}>Call centar: {shopInfo.phone}</a>
        </Button>
      </div>
    </div>
  )
}
