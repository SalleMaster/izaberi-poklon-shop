import { Suspense } from 'react'
import NavBottom, {
  NavbarMenuSkeleton,
} from './_components/nav-bottom/NavBottom'
import NavTop, { NavTopSkeleton } from './_components/nav-top/NavTop'
import getSession from '@/lib/getSession'
import { getActiveCategories } from '@/data/services/category'

export default function Header() {
  const sessionPromise = getSession()
  const activeCategoriesPromise = getActiveCategories()

  return (
    <header className='sticky top-0 bg-background shadow-sm z-10'>
      <nav>
        <Suspense fallback={<NavTopSkeleton />}>
          <NavTop sessionPromise={sessionPromise} />
        </Suspense>
        <Suspense fallback={<NavbarMenuSkeleton />}>
          <NavBottom categoriesPromise={activeCategoriesPromise} />
        </Suspense>
      </nav>
    </header>
  )
}
