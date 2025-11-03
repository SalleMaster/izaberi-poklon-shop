import { Suspense } from 'react'
import NavBottom, {
  NavbarMenuSkeleton,
} from './_components/nav-bottom/NavBottom'
import NavTop from './_components/nav-top/NavTop'

export default function Header() {
  // const activeCategoriesPromise = getCategories({ active: true })

  return (
    <header className='sticky top-0 bg-background shadow-xs z-10'>
      <nav>
        <NavTop />
        <Suspense fallback={<NavbarMenuSkeleton />}>
          {/* <NavBottom categoriesPromise={activeCategoriesPromise} /> */}
        </Suspense>
      </nav>
    </header>
  )
}
