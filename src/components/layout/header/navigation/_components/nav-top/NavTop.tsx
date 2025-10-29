'use client'

import Link from 'next/link'
import Image from 'next/image'
import User from './_components/User'
import { use } from 'react'
import { GetCartItemsNumberReturnType } from '@/data/services/cart'
import CartButton from './_components/CartButton'
import { authClient } from '@/lib/auth-client'

type Props = {
  cartItemsNumberPromise: GetCartItemsNumberReturnType
}

export default function NavTop({ cartItemsNumberPromise }: Props) {
  const cartItemsNumber = use(cartItemsNumberPromise)

  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession()

  const user = session?.user

  return (
    <div className='container px-4 mx-auto flex items-center justify-between py-2'>
      <Link href='/' className='font-bold'>
        <Image
          src='/img/red-dot-logo.svg'
          alt='Logo'
          width={80}
          height={80}
          priority
        />
      </Link>

      {!isPending && (
        <div className='flex gap-3 align-middle'>
          {user && <CartButton cartItemsNumber={cartItemsNumber} />}
          <User user={user} />
        </div>
      )}
    </div>
  )
}

export function NavTopSkeleton() {
  return (
    <div className='container px-4 mx-auto flex items-center justify-between py-2'>
      <Link href='/' className='font-bold'>
        <Image
          src='/img/red-dot-logo.svg'
          alt='Logo'
          width={80}
          height={80}
          priority
        />
      </Link>
    </div>
  )
}
