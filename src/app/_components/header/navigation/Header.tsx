import { Suspense } from 'react'
import NavBottom from './_components/nav-bottom/NavBottom'
import NavTop, { NavTopSkeleton } from './_components/nav-top/NavTop'
import getSession from '@/lib/getSession'

export default function Header() {
  const sessionPromise = getSession()

  return (
    <header className='sticky top-0 bg-background shadow-sm z-10'>
      <nav>
        <Suspense fallback={<NavTopSkeleton />}>
          <NavTop sessionPromise={sessionPromise} />
        </Suspense>
        <NavBottom />
      </nav>
    </header>
  )
}
