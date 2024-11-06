'use client'

import { Button } from '@/components/ui/button'
import UserButton from './UserButton'
import { signIn, useSession } from 'next-auth/react'

export default function User() {
  const session = useSession()
  const user = session.data?.user
  return (
    <>
      {user && <UserButton user={user} />}
      {!user && session.status !== 'loading' && <SignInButton />}
    </>
  )
}

function SignInButton() {
  return <Button onClick={() => signIn()}>Prijava</Button>
}
