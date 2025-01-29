import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { getActiveCategories } from '@/data/services/category'
import CategoriesList, {
  CategoriesListSkeleton,
} from './_components/CategoriesList'
import Link from 'next/link'
import { shopInfo } from '@/lib/consts'

export default async function NavbarMenu() {
  const activeCategoriesPromise = getActiveCategories()

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
            <Suspense fallback={<CategoriesListSkeleton />}>
              <CategoriesList categoriesPromise={activeCategoriesPromise} />
            </Suspense>
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
