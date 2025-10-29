'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import UserButton from './UserButton'
import { UserType } from '@/lib/auth-client'

type Props = {
  user?: UserType
}

export default function User({ user }: Props) {
  return (
    <>
      {user && <UserButton user={user} />}
      {!user && <SignInButton />}
    </>
  )
}

function SignInButton() {
  return (
    <Link
      href='/auth/signin'
      className={buttonVariants({ variant: 'default' })}
    >
      Prijava
    </Link>
  )
}
