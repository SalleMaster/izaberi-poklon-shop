import Link from 'next/link'

import { cn } from '@/lib/utils'
import { shopInfo } from '@/lib/consts'

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button, buttonVariants } from '@/components/ui/button'
import CategoriesDropdown from './_components/CategoriesDropdown'

export default function NavBottom() {
  return (
    <div className='bg-primary'>
      <div className='container mx-auto flex'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary' className='rounded-none'>
              Pokloni
            </Button>
          </DropdownMenuTrigger>
          <CategoriesDropdown />
        </DropdownMenu>
        <Link
          href={{ pathname: '/pokloni', query: { aktuelno: 'da' } }}
          className={buttonVariants()}
        >
          Aktuelno
        </Link>
        <Link
          href={{
            pathname: '/pokloni',
            query: { kategorija: 'korporativni-pokloni' },
          }}
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
