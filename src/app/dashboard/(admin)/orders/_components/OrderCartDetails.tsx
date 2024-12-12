import { OrderCartWithRelations } from '@/data/services/order'
import { Order } from '@prisma/client'
import { OrderCartItem } from './OrderCartItem'
import { Separator } from '@/components/ui/separator'
import { OrderSummary } from './OrderSummary'

type OrderCartDetailsProps = {
  order: Order
  cart: OrderCartWithRelations
  orderFormattedTotalPrice: string
  orderFormattedOnlinePrice: string
  orderFormattedDiscount: string
  orderFormattedDeliveryFee: string
}

export function OrderCartDetails({
  order,
  cart,
  orderFormattedTotalPrice,
  orderFormattedOnlinePrice,
  orderFormattedDiscount,
  orderFormattedDeliveryFee,
}: OrderCartDetailsProps) {
  return (
    <div className='space-y-4'>
      <div className='border rounded-xl p-4 space-y-2.5'>
        {cart.items.map((cartItem) => (
          <div key={cartItem.id} className='group space-y-4'>
            <OrderCartItem cartItem={cartItem} />
            <Separator className='group-last-of-type:hidden' />
          </div>
        ))}
      </div>
      <OrderSummary
        order={order}
        orderFormattedTotalPrice={orderFormattedTotalPrice}
        orderFormattedOnlinePrice={orderFormattedOnlinePrice}
        orderFormattedDiscount={orderFormattedDiscount}
        orderFormattedDeliveryFee={orderFormattedDeliveryFee}
      />
    </div>
  )
}
