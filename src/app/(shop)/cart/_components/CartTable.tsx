'use client'

import type { Cart, CartItem, Product, Media } from '@prisma/client'
import React, { use } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable } from './DataTable'
import { columns } from './columns'

type CartItemWithRelations = CartItem & {
  product: Product & {
    coverImage: Media
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

  console.log(cart.items)

  return (
    <div>
      Cart table <p>{cart.id}</p>
      {/* {cart.items.map((item) => {
        console.log(item)
        return (
          <div key={item.id}>
            <p>{item.id}</p>
            <p>{item.product.name}</p>
            <p>{item.product.price}</p>
            <p>{item.quantity}</p>
          </div>
        )
      })} */}
      <DataTable columns={columns} data={cart.items} />
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
