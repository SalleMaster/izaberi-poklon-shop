'use client'

import { Button } from '@/components/ui/button'
import UserButton from './UserButton'
import { signIn } from 'next-auth/react'
import { User as UserType } from 'better-auth'

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
  return <Button onClick={() => signIn()}>Prijava</Button>
}
