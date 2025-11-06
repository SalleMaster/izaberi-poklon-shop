import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import UserButton from './UserButton'
import CartButton from './CartButton'
import { getCartItemsNumber } from '@/data/services/cart'
import getSession from '@/lib/getSession'

export default async function User() {
  const cartItemsNumber = await getCartItemsNumber()
  const session = await getSession()
  const user = session?.user

  return user ? (
    <div className='flex gap-3 align-middle'>
      <CartButton cartItemsNumber={cartItemsNumber} />
      <UserButton user={user} />
    </div>
  ) : (
    <SignInButton />
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
