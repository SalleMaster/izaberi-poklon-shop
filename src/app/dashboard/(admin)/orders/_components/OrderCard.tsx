import { priceFormatter } from '@/lib/format'
import { Order, OrderStatusType } from '@prisma/client'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { format } from 'date-fns'
import { srLatn } from 'date-fns/locale'
import { Clock4, HandCoins, Hash, SquareArrowOutUpRight } from 'lucide-react'
import { OrderCartDetails } from './OrderCartDetails'
import { OrderCartWithRelations } from '@/data/services/order'
import { OrderStatusBadge } from './OrderStatusBadge'
import { OrderStatusForm } from './OrderStatusForm'
import { TransitionStartFunction } from 'react'
import { OrderDeleteImagesForm } from './OrderDeleteImages'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type OrderCardProps = {
  order: Order
  isAdmin: boolean
  isSingleOrder: boolean
  startTransition: TransitionStartFunction
}

export function OrderCard({
  order,
  isAdmin = false,
  isSingleOrder = false,
  startTransition,
}: OrderCardProps) {
  const orderFormattedTotalPrice = priceFormatter(order.orderTotalPrice)
  const orderFormattedOnlinePrice = priceFormatter(order.orderOnlinePrice)
  const orderFormattedDiscount = priceFormatter(order.orderDiscount)
  const orderFormattedDeliveryFee = priceFormatter(order.orderDeliveryFee)
  const orderFormattedCreatedAt = format(order.createdAt, 'PPpp', {
    locale: srLatn,
  })

  const cart = order.cart as unknown as OrderCartWithRelations

  const orderImageKeys = cart.items
    .map((item) => item.imagePersonalizations)
    .flat()
    .map((item) => item.images)
    .flat()
    .map((image) => image.key)

  const showDeleteImagesForm =
    isAdmin &&
    orderImageKeys.length > 0 &&
    !order.mediaRemoved &&
    (order.status === OrderStatusType.canceled ||
      order.status === OrderStatusType.shipped ||
      order.status === OrderStatusType.delivered)

  return (
    <Card>
      <Accordion
        type='single'
        collapsible
        defaultValue={isSingleOrder ? order.id : undefined}
        className='px-4'
      >
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
              <div className='flex mr-6'>
                <OrderStatusBadge status={order.status} />
                {!isSingleOrder && (
                  <Button variant='outline' size='sm' asChild>
                    <Link href={`/admin/porudzbine/${order.id}`}>
                      <SquareArrowOutUpRight className='w-4 h-4' />
                    </Link>
                  </Button>
                )}
              </div>
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
            {isAdmin ? (
              <div className='border rounded-xl p-4'>
                <OrderStatusForm
                  status={order.status}
                  id={order.id}
                  startTransition={startTransition}
                />
              </div>
            ) : null}
            {showDeleteImagesForm ? (
              <div className='border rounded-xl p-4'>
                <OrderDeleteImagesForm
                  id={order.id}
                  keys={orderImageKeys}
                  startTransition={startTransition}
                />
              </div>
            ) : null}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export function OrderCardSkeleton() {
  return (
    <Card className='p-4'>
      <div className='w-full grid gap-3 sm:grid-cols-4 pr-4'>
        <div className='flex items-center gap-4'>
          <Hash />
          <Skeleton className='h-4 w-3/4' />
        </div>
        <div className='flex items-center gap-4'>
          <Clock4 />
          <Skeleton className='h-4 w-3/4' />
        </div>
        <div className='flex items-center gap-4'>
          <HandCoins />
          <Skeleton className='h-4 w-3/4' />
        </div>
        <div className='flex items-center gap-4'>
          <Skeleton className='h-4 w-3/4' />
        </div>
      </div>
    </Card>
  )
}

export function OrderCardOpenSkeleton() {
  return (
    <Card className='p-4 space-y-4'>
      <div className='w-full grid gap-3 sm:grid-cols-4 pr-4'>
        <div className='flex items-center gap-4'>
          <Hash />
          <Skeleton className='h-4 w-3/4' />
        </div>
        <div className='flex items-center gap-4'>
          <Clock4 />
          <Skeleton className='h-4 w-3/4' />
        </div>
        <div className='flex items-center gap-4'>
          <HandCoins />
          <Skeleton className='h-4 w-3/4' />
        </div>
        <div className='flex items-center gap-4'>
          <Skeleton className='h-4 w-3/4' />
        </div>
      </div>
      <div className='space-y-4'>
        <div className='border rounded-xl p-4 space-y-2.5'>
          <Skeleton className='w-full h-60' />
        </div>
        <div className='border rounded-xl p-4 space-y-2.5'>
          <Skeleton className='w-full h-60' />
        </div>
        <div className='border rounded-xl p-4 space-y-2.5'>
          <Skeleton className='w-full h-60' />
        </div>
      </div>
    </Card>
  )
}
