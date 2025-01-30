'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import React, { use, useOptimistic, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { shopInfo } from '@/lib/consts'
import { CategoryWithImage } from '@/data/services/category'
import { usePathname, useSearchParams } from 'next/navigation'
import useCreateQueryString from '@/hooks/use-create-query-string'
import CategoriesList, {
  CategoriesListSkeleton,
} from './_components/CategoriesList'

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
          <DropdownMenuContent className='max-h-[75vh] w-[90vw] overflow-y-auto md:px-4 md:w-72'>
            <DropdownMenuLabel>Kategorije</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <CategoriesList
              categories={categories}
              pathname={pathname}
              optimisticCategory={optimisticCategory}
              pageUrl={pageUrl}
              setOptimisticCategories={setOptimisticCategories}
              startTransition={startTransition}
              createQueryString={createQueryString}
            />
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
