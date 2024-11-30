import { Skeleton } from '@/components/ui/skeleton'
import { CartItemRow } from './CartItemRow'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CartWithRelations } from '@/data/services/cart'
import { priceTableQuantityOptions, quantityOptions } from '@/lib/consts'
import {
  removeCartItemType,
  updateCartItemType,
} from '@/app/(shop)/_actions/cart/actions'
import CartEmpty from '../cart-empty/CartEmpty'

type Props = {
  optimisticCart: CartWithRelations | null
  disabled: boolean
  updateCartItemHandler: ({ id, quantity }: updateCartItemType) => void
  removeCartItemHandler: ({ id }: removeCartItemType) => void
}

export default function CartTable({
  optimisticCart,
  disabled,
  updateCartItemHandler,
  removeCartItemHandler,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl font-semibold'>Vaša korpa</CardTitle>
      </CardHeader>
      <CardContent>
        {optimisticCart?.items.map((cartItem) => (
          <div key={cartItem.id} className='group'>
            <CartItemRow
              cartItem={cartItem}
              updateCartItemHandler={updateCartItemHandler}
              removeCartItemHandler={removeCartItemHandler}
              quantityOptions={
                cartItem.product.priceTable.length > 1
                  ? priceTableQuantityOptions
                  : quantityOptions
              }
              disabled={disabled}
            />
            <Separator className='group-last-of-type:hidden' />
          </div>
        ))}

        {optimisticCart?.items.length === 0 && <CartEmpty />}
      </CardContent>
    </Card>
  )
}

export function CartTableSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl font-semibold'>Vaša korpa</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2.5'>
        <Skeleton className='h-20 w-[100%]' />
        <Separator className='w-[100%]' />
        <Skeleton className='h-20 w-[100%]' />
        <Separator className='w-[100%]' />
        <Skeleton className='h-20 w-[100%]' />
      </CardContent>
    </Card>
  )
}
