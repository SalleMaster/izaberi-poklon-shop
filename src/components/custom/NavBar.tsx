import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NavBar() {
  return (
    <header className='sticky top-0 bg-background px-3 shadow-sm'>
      <nav className='mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3'>
        <Link href='/' className='font-bold'>
          Izaberi poklon shop
        </Link>

        <Button>Prijava</Button>
      </nav>
    </header>
  )
}
