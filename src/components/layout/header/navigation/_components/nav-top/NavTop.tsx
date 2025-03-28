'use client'

import Link from 'next/link'
import Image from 'next/image'
import User from './_components/User'
import { Session } from 'next-auth'
import { use } from 'react'
import { GetCartItemsNumberReturnType } from '@/data/services/cart'
import CartButton from './_components/CartButton'

type Props = {
  sessionPromise: Promise<Session | null>
  cartItemsNumberPromise: GetCartItemsNumberReturnType
}

export default function NavTop({
  sessionPromise,
  cartItemsNumberPromise,
}: Props) {
  const session = use(sessionPromise)
  const cartItemsNumber = use(cartItemsNumberPromise)
  const user = session?.user

  return (
    <div className='container px-4 mx-auto flex items-center justify-between py-2'>
      <Link href='/' className='font-bold'>
        <Image src='/img/red-dot-logo.svg' alt='Logo' width={80} height={80} />
      </Link>

      <div className='flex gap-3 align-middle'>
        {user && <CartButton cartItemsNumber={cartItemsNumber} />}
        <User user={user} />
      </div>
    </div>
  )
}

export function NavTopSkeleton() {
  return (
    <div className='container px-4 mx-auto flex items-center justify-between py-2'>
      <Link href='/' className='font-bold'>
        <Image src='/img/red-dot-logo.svg' alt='Logo' width={80} height={80} />
      </Link>
    </div>
  )
}
