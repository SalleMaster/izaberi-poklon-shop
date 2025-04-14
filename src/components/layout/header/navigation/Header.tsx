import { Suspense } from 'react'
import NavBottom, {
  NavbarMenuSkeleton,
} from './_components/nav-bottom/NavBottom'
import NavTop, { NavTopSkeleton } from './_components/nav-top/NavTop'
import getSession from '@/lib/getSession'
import { getCategories } from '@/data/services/category'
import { getCartItemsNumber } from '@/data/services/cart'

export default function Header() {
  const sessionPromise = getSession()
  const cartItemsNumberPromise = getCartItemsNumber()
  const activeCategoriesPromise = getCategories({ active: true })

  return (
    <header className='sticky top-0 bg-background shadow-xs z-10'>
      <nav>
        <Suspense fallback={<NavTopSkeleton />}>
          <NavTop
            sessionPromise={sessionPromise}
            cartItemsNumberPromise={cartItemsNumberPromise}
          />
        </Suspense>
        <Suspense fallback={<NavbarMenuSkeleton />}>
          <NavBottom categoriesPromise={activeCategoriesPromise} />
        </Suspense>
      </nav>
    </header>
  )
}
