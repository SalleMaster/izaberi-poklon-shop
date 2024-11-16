'use client'

import type { Cart, CartItem, Product, Media } from '@prisma/client'
import { use, useOptimistic, useTransition } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
// import { DataTable } from './DataTable'
// import { columns } from './columns'
import {
  removeCartItem,
  removeCartItemType,
  updateCartItem,
  updateCartItemType,
} from '@/app/(shop)/_actions/cart/actions'
import { useToast } from '@/hooks/use-toast'
import { CartItemRow } from './CartItemRow'
import { Separator } from '@/components/ui/separator'

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

  function generateQuantityOptions(max: number) {
    const options = []
    for (let i = 1; i <= max; i++) {
      options.push({ value: i.toString(), label: i.toString() })
    }
    return options
  }

  const quantityOptions = generateQuantityOptions(500)

  const removeCartItemHandler = async ({ id }: removeCartItemType) => {
    try {
      startTransition(() => {
        setOptimisticCart({
          ...cart,
          items: cart.items.filter((item) => item.id !== id),
        })
      })
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

  const updateCartItemHandler = async ({
    id,
    quantity,
  }: updateCartItemType) => {
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
      <p className='text-xl font-semibold mb-4'>Vaša korpa</p>
      <div>
        {optimisticCart.items.map((cartItem) => (
          <div key={cartItem.id}>
            <CartItemRow
              cartItem={cartItem}
              updateCartItemHandler={updateCartItemHandler}
              removeCartItemHandler={removeCartItemHandler}
              quantityOptions={quantityOptions}
            />
            <Separator />
          </div>
        ))}
      </div>
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
