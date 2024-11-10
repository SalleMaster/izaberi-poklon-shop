import Link from 'next/link'
import Image from 'next/image'
import CartButton from './_components/CartButton'
import User from './_components/User'

export default function NavTop() {
  return (
    <div className='container mx-auto flex items-center justify-between py-2'>
      <Link href='/' className='font-bold'>
        <Image src='/img/red-dot-logo.png' alt='Logo' width={52} height={56} />
      </Link>

      <div className='flex gap-3 align-middle'>
        <CartButton />
        <User />
      </div>
    </div>
  )
}
