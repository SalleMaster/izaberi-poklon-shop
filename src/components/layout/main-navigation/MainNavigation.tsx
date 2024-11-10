import Link from 'next/link'
import Image from 'next/image'
import CartButton from './components/CartButton'
import User from './components/User'
import NavbarMenu from './components/NavbarMenu'

export default function MainNavigation() {
  return (
    <header className='sticky top-0 bg-background shadow-sm z-10'>
      <nav>
        <div className='container mx-auto flex items-center justify-between py-2'>
          <Link href='/' className='font-bold'>
            <Image
              src='/img/red-dot-logo.svg'
              alt='Logo'
              width={50}
              height={50}
            />
          </Link>

          <div className='flex gap-3 align-middle'>
            <CartButton />
            <User />
          </div>
        </div>
        <NavbarMenu />
      </nav>
    </header>
  )
}
