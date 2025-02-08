import { ShoppingCart } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

type Props = {
  cartItemsNumber: number
}

export default function CartButton({ cartItemsNumber }: Props) {
  return (
    <Link
      href='/korpa'
      className={cn(
        buttonVariants({
          variant: 'ghost',
          size: 'icon',
        }),
        'relative rounded-full z-10'
      )}
    >
      {cartItemsNumber > 0 ? (
        <Badge
          variant='secondary'
          className='absolute -z-10 top-[-4px] right-5'
        >
          {cartItemsNumber}
        </Badge>
      ) : null}

      <ShoppingCart className='h-4 w-4' />
    </Link>
  )
}
