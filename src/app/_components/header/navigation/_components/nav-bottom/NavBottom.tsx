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
          <DropdownMenuContent>
            <DropdownMenuLabel>Kategorije</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Suspense fallback={<CategoriesListSkeleton />}>
              <CategoriesList categoriesPromise={activeCategoriesPromise} />
            </Suspense>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className='rounded-none'>Akcija</Button>
        <Button className='rounded-none'>Korporativni pokloni</Button>
        <Button className='rounded-none'>O nama</Button>
        <Button className='rounded-none ml-auto' asChild>
          <a href='tel:+3816212312123'>Call centar: 062 123 12 123</a>
        </Button>
      </div>
    </div>
  )
}
