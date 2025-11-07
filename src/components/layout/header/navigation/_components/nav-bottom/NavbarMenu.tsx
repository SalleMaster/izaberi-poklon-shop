'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useOptimistic, useTransition } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { shopInfo } from '@/lib/consts'
import { CategoryWithImage } from '@/data/services/category'
import { usePathname, useSearchParams } from 'next/navigation'
import useCreateQueryString from '@/hooks/use-create-query-string'
import CategoriesList, {
  CategoriesListSkeleton,
} from './_components/CategoriesList'
import { cn } from '@/lib/utils'

type Props = {
  categories: CategoryWithImage[]
}

export default function NavbarMenu({ categories }: Props) {
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
                // href={`${pageUrl}?${createQueryString({ removeParams: ['kategorija', 'stranica'] })}`}
                href={{
                  pathname: pageUrl,
                  query: createQueryString({
                    removeParams: ['kategorija', 'stranica'],
                  }),
                }}
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
        <Link href={`${pageUrl}?aktuelno=da`} className={buttonVariants()}>
          Aktuelno
        </Link>
        <Link
          href={`${pageUrl}?kategorija=korporativni-pokloni`}
          className={buttonVariants()}
        >
          Korporativni pokloni
        </Link>
        <Link
          href={'/'}
          className={cn(buttonVariants(), 'hidden md:block rounded-none')}
        >
          O nama
        </Link>
        <a
          href={`tel:${shopInfo.phone}`}
          className={cn(
            buttonVariants(),
            'hidden md:block rounded-none ml-auto'
          )}
        >
          Call centar: {shopInfo.phone}
        </a>
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
        <Link href={`/pokloni?aktuelno=da`} className={buttonVariants()}>
          Aktuelno
        </Link>
        <Link
          href={`/pokloni?kategorija=korporativni-pokloni`}
          className={buttonVariants()}
        >
          Korporativni pokloni
        </Link>
        <Link
          href={'/'}
          className={cn(buttonVariants(), 'hidden md:block rounded-none')}
        >
          O nama
        </Link>
        <a
          href={`tel:${shopInfo.phone}`}
          className={cn(
            buttonVariants(),
            'hidden md:block rounded-none ml-auto'
          )}
        >
          Call centar: {shopInfo.phone}
        </a>
      </div>
    </div>
  )
}
