'use client'

import type { Cart, CartItem, Product, Media } from '@prisma/client'
import { use, useOptimistic, useTransition } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { DataTable } from './DataTable'
import { columns } from './columns'
import {
  removeCartItem,
  updateCartItem,
} from '@/app/(shop)/_actions/cart/actions'
import { useToast } from '@/hooks/use-toast'

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
  const { toast } = useToast()

  console.log(optimisticCart)

  const removeCartItemHandler = async (cartItemId: string) => {
    try {
      startTransition(() => {
        setOptimisticCart({
          ...cart,
          items: cart.items.filter((item) => item.id !== cartItemId),
        })
      })
      const response = await removeCartItem({ cartItemId })
      if (response) {
        if (response.status === 'fail') {
          return toast({
            variant: 'destructive',
            description: response.message,
          })
        }

        if (response.status === 'success') {
          toast({ description: response.message })
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          error instanceof Error
            ? error.message
            : 'Došlo je do greške. Molimo pokušajte ponovo.',
      })
    }
  }

  const updateCartItemHandler = async ({
    id,
    quantity,
  }: {
    id: string
    quantity: number
  }) => {
    try {
      startTransition(() => {
        setOptimisticCart({
          ...cart,
          items: cart.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })
      })
      const response = await updateCartItem({ id, quantity })
      if (response) {
        if (response.status === 'fail') {
          return toast({
            variant: 'destructive',
            description: response.message,
          })
        }

        if (response.status === 'success') {
          toast({ description: response.message })
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          error instanceof Error
            ? error.message
            : 'Došlo je do greške. Molimo pokušajte ponovo.',
      })
    }
  }

  return (
    <div className={isPending ? 'animate-pulse' : ''}>
      Cart table <p>{cart.id}</p>
      <DataTable
        columns={columns}
        data={optimisticCart.items}
        removeCartItemHandler={removeCartItemHandler}
        updateCartItemHandler={updateCartItemHandler}
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
