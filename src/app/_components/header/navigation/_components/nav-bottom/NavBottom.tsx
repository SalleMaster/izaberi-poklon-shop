import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// import Link from 'next/link'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { getActiveCategories } from '@/data/services/category'
import CategoriesList from './_components/CategoriesList'

export default async function NavbarMenu() {
  const activeCategories = getActiveCategories()

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
            <Suspense fallback={<div>Loading...</div>}>
              <CategoriesList categoriesPromise={activeCategories} />
            </Suspense>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem asChild className='text-end'>
              <Link href={'/pokloni'}>Svi pokloni</Link>
            </DropdownMenuItem> */}
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
