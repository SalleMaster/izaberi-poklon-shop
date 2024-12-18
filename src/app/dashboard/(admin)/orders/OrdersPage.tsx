'use client'

import { use, useEffect, useTransition } from 'react'
import { GetOrdersReturnType } from '@/data/services/order'

import { cn } from '@/lib/utils'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { OrderCard, OrderCardSkeleton } from './_components/OrderCard'

type Props = {
  ordersPromise: GetOrdersReturnType
  isAdmin: boolean
}

export default function OrdersPage({ ordersPromise, isAdmin }: Props) {
  const orders = use(ordersPromise)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [orders])

  return (
    <div
      className={cn(
        'space-y-10',
        isPending && 'animate-pulse',
        'group-has-[[data-pending-orders]]:animate-pulse',
        'group-has-[[data-pending-pagination]]:animate-pulse'
      )}
    >
      <div className='space-y-3'>
        {orders.length ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              isAdmin={isAdmin}
              startTransition={startTransition}
            />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema porudžbina'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

export function OrdersPageSkeleton() {
  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <OrderCardSkeleton />
        <OrderCardSkeleton />
        <OrderCardSkeleton />
      </div>
    </div>
  )
}
