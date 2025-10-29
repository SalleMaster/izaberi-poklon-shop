'use client'

import { buttonVariants } from '@/components/ui/button'
import UserButton from './UserButton'
// import { signIn } from 'next-auth/react'
// import { User as UserType } from '@/generated/prisma'
import { signIn, UserType } from '@/lib/auth-client'
import Link from 'next/link'

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
