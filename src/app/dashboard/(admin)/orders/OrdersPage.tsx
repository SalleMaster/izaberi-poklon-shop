'use client'

import { use, useTransition } from 'react'
import { GetAllOrdersReturnType } from '@/data/services/order'

import { cn } from '@/lib/utils'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { OrderCard } from './_components/OrderCard'

type Props = {
  ordersPromise: GetAllOrdersReturnType
}

export default function OrdersPage({ ordersPromise }: Props) {
  const orders = use(ordersPromise)
  const [isPending, startTransition] = useTransition()

  return (
    <div className={cn('space-y-10', isPending && 'animate-pulse')}>
      <h2 className='text-xl font-bold'>Porudžbine</h2>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Sve porudžbine</h2>
        {orders.length ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
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
  return <p>Orders skeleton</p>
}
