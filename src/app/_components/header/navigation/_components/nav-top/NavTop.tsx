'use client'

import Link from 'next/link'
import Image from 'next/image'
import CartButton from './_components/CartButton'
import User from './_components/User'
import { Session } from 'next-auth'
import { use } from 'react'

type Props = {
  sessionPromise: Promise<Session | null>
}

export default function NavTop({ sessionPromise }: Props) {
  const session = use(sessionPromise)
  const user = session?.user

  return (
    <div className='container px-4 mx-auto flex items-center justify-between py-2'>
      <Link href='/' className='font-bold'>
        <Image src='/img/red-dot-logo.png' alt='Logo' width={52} height={56} />
      </Link>

      <div className='flex gap-3 align-middle'>
        {user && <CartButton />}
        <User user={user} />
      </div>
    </div>
  )
}

export function NavTopSkeleton() {
  return (
    <div className='container mx-auto flex items-center justify-between py-2'>
      <Link href='/' className='font-bold'>
        <Image src='/img/red-dot-logo.png' alt='Logo' width={52} height={56} />
      </Link>
    </div>
  )
}
