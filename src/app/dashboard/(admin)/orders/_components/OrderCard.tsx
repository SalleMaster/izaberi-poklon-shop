import { priceFormatter } from '@/lib/format'
import { Order } from '@prisma/client'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { format } from 'date-fns'
import { srLatn } from 'date-fns/locale'
import { Clock4, HandCoins, Hash } from 'lucide-react'
import { OrderCartDetails } from './OrderCartDetails'
import { OrderCartWithRelations } from '@/data/services/order'
import { OrderStatusBadge } from './OrderStatusBadge'
import { OrderStatusForm } from './OrderStatusForm'
import { TransitionStartFunction } from 'react'

type OrderCardProps = {
  order: Order
  startTransition: TransitionStartFunction
}

export function OrderCard({ order, startTransition }: OrderCardProps) {
  const orderFormattedTotalPrice = priceFormatter(order.orderTotalPrice)
  const orderFormattedOnlinePrice = priceFormatter(order.orderOnlinePrice)
  const orderFormattedDiscount = priceFormatter(order.orderDiscount)
  const orderFormattedDeliveryFee = priceFormatter(order.orderDeliveryFee)
  const orderFormattedCreatedAt = format(order.createdAt, 'PPpp', {
    locale: srLatn,
  })
  return (
    <Card>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem value={order.id} className='border-b-0'>
          <AccordionTrigger>
            <div className='w-full grid gap-3 sm:grid-cols-4'>
              <div className='flex items-center gap-4'>
                <Hash />
                <p className='font-semibold'>{order.orderNumber}</p>
              </div>
              <div className='flex items-center gap-4'>
                <Clock4 />
                <p className='font-semibold'>{orderFormattedCreatedAt}</p>
              </div>
              <div className='flex items-center gap-4'>
                <HandCoins />
                <p className='font-semibold'>{orderFormattedTotalPrice}</p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
          </AccordionTrigger>
          <AccordionContent className='space-y-4'>
            <OrderCartDetails
              order={order}
              cart={order.cart as unknown as OrderCartWithRelations}
              orderFormattedTotalPrice={orderFormattedTotalPrice}
              orderFormattedOnlinePrice={orderFormattedOnlinePrice}
              orderFormattedDiscount={orderFormattedDiscount}
              orderFormattedDeliveryFee={orderFormattedDeliveryFee}
            />
            <div className='border rounded-xl p-4'>
              <OrderStatusForm
                status={order.status}
                id={order.id}
                startTransition={startTransition}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}
