'use client'

import { use, useOptimistic, useTransition } from 'react'
import { GetCartReturnType } from '@/data/services/cart'
import {
  removeCartItem,
  removeCartItemType,
  updateCartItem,
  updateCartItemType,
} from '@/app/(shop)/_actions/cart/actions'
import CartTable, {
  CartTableSkeleton,
} from './_components/cart-table/CartTable'
import CartOverview, {
  CartOverviewSkeleton,
} from './_components/cart-overview/CartOverview'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

type Props = {
  cartPromise: GetCartReturnType
}

export default function CartPage({ cartPromise }: Props) {
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
    <div
      className={cn(
        'grid gap-6 lg:grid-cols-cart lg:gap-6',
        isPending && 'animate-pulse'
      )}
    >
      <div className='mb-auto'>
        <CartTable
          optimisticCart={optimisticCart}
          updateCartItemHandler={updateCartItemHandler}
          removeCartItemHandler={removeCartItemHandler}
        />
      </div>
      <div className='mb-auto'>
        <CartOverview
          onlinePrice={optimisticCart?.onlinePrice}
          totalPrice={optimisticCart?.totalPrice}
          discount={optimisticCart?.discount}
          disabled={isPending || optimisticCart?.items.length === 0}
        />
      </div>
    </div>
  )
}

export function CartPageSkeleton() {
  return (
    <div className='grid gap-6 lg:grid-cols-cart lg:gap-6'>
      <div className='mb-auto'>
        <CartTableSkeleton />
      </div>
      <div className='mb-auto'>
        <CartOverviewSkeleton />
      </div>
    </div>
  )
}
