import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import User from './_components/User'

export default function NavTop() {
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

      <div className='flex gap-3 align-middle'>
        <Suspense>
          <User />
        </Suspense>
      </div>
    </div>
  )
}
