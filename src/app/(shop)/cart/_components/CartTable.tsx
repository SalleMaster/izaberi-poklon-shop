'use client'

import { use, useOptimistic, useTransition } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import {
  removeCartItem,
  removeCartItemType,
  updateCartItem,
  updateCartItemType,
} from '@/app/(shop)/_actions/cart/actions'
import { useToast } from '@/hooks/use-toast'
import { CartItemRow } from './CartItemRow'
import { Separator } from '@/components/ui/separator'
import { GetCartReturnType } from '@/data/services/cart'
import { priceTableQuantityOptions, quantityOptions } from '@/lib/consts'

type Props = {
  cartPromise: GetCartReturnType
}

export default function CartTable({ cartPromise }: Props) {
  const cart = use(cartPromise)
  const [isPending, startTransition] = useTransition()
  const [optimisticCart, setOptimisticCart] = useOptimistic(cart)
  const { toast } = useToast()

  const updateCartItemHandler = async ({
    id,
    quantity,
  }: updateCartItemType) => {
    try {
      if (optimisticCart) {
        startTransition(() => {
          setOptimisticCart({
            ...optimisticCart,
            items: optimisticCart.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          })
        })
      }

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

  const removeCartItemHandler = async ({ id }: removeCartItemType) => {
    try {
      if (optimisticCart) {
        startTransition(() => {
          setOptimisticCart({
            ...optimisticCart,
            items: optimisticCart.items.filter((item) => item.id !== id),
          })
        })
      }

      const response = await removeCartItem({ id })
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
      <p className='text-xl font-semibold mb-4'>Vaša korpa</p>

      {optimisticCart?.items.map((cartItem) => (
        <div key={cartItem.id}>
          <CartItemRow
            cartItem={cartItem}
            updateCartItemHandler={updateCartItemHandler}
            removeCartItemHandler={removeCartItemHandler}
            quantityOptions={
              cartItem.product.priceTable.length > 1
                ? priceTableQuantityOptions
                : quantityOptions
            }
          />
          <Separator />
        </div>
      ))}
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
