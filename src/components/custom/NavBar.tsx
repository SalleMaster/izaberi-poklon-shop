'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { signIn, useSession } from 'next-auth/react'
import UserButton from './UserButton'
import TestNavigation from './TestNavigation'

export default function NavBar() {
  const session = useSession()
  const user = session.data?.user
  return (
    <header className='sticky top-0 bg-background px-3 shadow-sm'>
      <nav className='mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3'>
        <Link href='/' className='font-bold'>
          Izaberi poklon shop
        </Link>

        <div className='flex gap-3 align-middle'>
          <TestNavigation />
          {user && <UserButton user={user} />}
          {!user && session.status !== 'loading' && <SignInButton />}
        </div>
      </nav>
    </header>
  )
}

function SignInButton() {
  return <Button onClick={() => signIn()}>Prijava</Button>
}
