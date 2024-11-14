'use client'

import type { Cart, CartItem, Product } from '@prisma/client'
import React, { use } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

type CartItemWithRelations = CartItem & {
  product: Product
}

type CartWithRelations = Cart & {
  items: CartItemWithRelations[]
}

type Props = {
  cartPromise: Promise<CartWithRelations>
}

export default function CartTable({ cartPromise }: Props) {
  const cart = use(cartPromise)

  return (
    <div>
      Cart table <p>{cart.id}</p>
      {cart.items.map((item) => {
        console.log(item)
        return (
          <div key={item.id}>
            <p>{item.id}</p>
            <p>{item.product.name}</p>
            <p>{item.product.price}</p>
            <p>{item.quantity}</p>
          </div>
        )
      })}
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
