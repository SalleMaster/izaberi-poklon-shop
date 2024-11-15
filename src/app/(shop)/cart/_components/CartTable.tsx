'use client'

import type { Cart, CartItem, Product, Media } from '@prisma/client'
import { use, useOptimistic, useTransition } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable } from './DataTable'
import { columns } from './columns'
import { removeCartItem } from '@/app/(shop)/_actions/cart/actions'

type CartItemWithRelations = CartItem & {
  product: Product & {
    coverImage: Media | null
  }
}

type CartWithRelations = Cart & {
  items: CartItemWithRelations[]
}

type Props = {
  cartPromise: Promise<CartWithRelations>
}

export default function CartTable({ cartPromise }: Props) {
  const cart = use(cartPromise)
  const [isPending, startTransition] = useTransition()
  const [optimisticCart, setOptimisticCart] = useOptimistic(cart)

  console.log(optimisticCart)

  const removeCartItemHandler = (cartItemId: string) => {
    startTransition(() => {
      setOptimisticCart({
        ...cart,
        items: cart.items.filter((item) => item.id !== cartItemId),
      })
    })
    removeCartItem({ cartItemId })
  }

  return (
    <div className={isPending ? 'animate-pulse' : ''}>
      Cart table <p>{cart.id}</p>
      <DataTable
        columns={columns}
        data={optimisticCart.items}
        removeCartItemHandler={removeCartItemHandler}
      />
    </div>
  )
}

export function CartTableSkeleton() {
  return (
    <div className='space-y-1'>
      <Skeleton className='h-[36px] w-[100%]' />
      <Skeleton className='h-[36px] w-[100%]' />
      <Skeleton className='h-[36px] w-[100%]' />
    </div>
  )
}
