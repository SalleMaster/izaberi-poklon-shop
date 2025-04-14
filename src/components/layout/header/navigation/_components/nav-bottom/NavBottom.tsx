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
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { shopInfo } from '@/lib/consts'
import { GetCategoriesReturnType } from '@/data/services/category'
import { usePathname, useSearchParams } from 'next/navigation'
import useCreateQueryString from '@/hooks/use-create-query-string'
import CategoriesList, {
  CategoriesListSkeleton,
} from './_components/CategoriesList'
import { cn } from '@/lib/utils'

type Props = {
  categoriesPromise: GetCategoriesReturnType
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

  const pageUrl =
    pathname === '/admin/proizvodi' ? '/admin/proizvodi' : '/pokloni'

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
          <DropdownMenuContent className='w-[90vw] md:px-4 md:w-72'>
            <DropdownMenuLabel>Kategorije</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ScrollArea className='h-[40vh]'>
              <CategoriesList
                categories={categories}
                optimisticCategory={optimisticCategory}
                pageUrl={pageUrl}
                setOptimisticCategories={setOptimisticCategories}
                startTransition={startTransition}
                createQueryString={createQueryString}
              />
            </ScrollArea>
            <DropdownMenuSeparator className='my-4' />
            <DropdownMenuItem className='text-end' asChild>
              <Link
                href={`${pageUrl}?${createQueryString({ removeParams: ['kategorija', 'stranica'] })}`}
                className={cn(
                  pathname === pageUrl &&
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
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className='rounded-none'>
          <Link href={`${pageUrl}?aktuelno=da`}>Aktuelno</Link>
        </Button>
        <Button className='rounded-none' asChild>
          <Link href={`${pageUrl}?kategorija=korporativni-pokloni`}>
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
            <CategoriesListSkeleton />
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
