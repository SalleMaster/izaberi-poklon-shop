'use client'

import { use, useTransition } from 'react'
import { GetOrderReturnType } from '@/data/services/order'

import { cn } from '@/lib/utils'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { OrderCard, OrderCardOpenSkeleton } from '../_components/OrderCard'

type Props = {
  orderPromise: GetOrderReturnType
  isAdmin: boolean
}

export default function OrderPage({ orderPromise, isAdmin }: Props) {
  const order = use(orderPromise)
  const [isPending, startTransition] = useTransition()

  return (
    <div className={cn('space-y-10', isPending && 'animate-pulse')}>
      <div className='space-y-3'>
        {order ? (
          <OrderCard
            order={order}
            isAdmin={isAdmin}
            isSingleOrder={true}
            startTransition={startTransition}
          />
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Porudžbina nije pronađena.'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

export function OrderPageSkeleton() {
  return (
    <div className='space-y-10'>
      <OrderCardOpenSkeleton />
    </div>
  )
}
