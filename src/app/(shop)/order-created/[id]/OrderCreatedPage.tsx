'use client'

import { use, useTransition } from 'react'
import { GetOrderReturnType } from '@/data/services/order'

import { cn } from '@/lib/utils'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import {
  OrderCard,
  OrderCardOpenSkeleton,
} from '@/app/dashboard/(admin)/orders/_components/OrderCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Props = {
  orderPromise: GetOrderReturnType
  isAdmin: boolean
}

export default function OrderCreatedPage({ orderPromise, isAdmin }: Props) {
  const order = use(orderPromise)
  const [isPending, startTransition] = useTransition()

  return (
    <div className={cn('space-y-10', isPending && 'animate-pulse')}>
      <div className='space-y-5'>
        {order ? (
          <>
            <OrderCard
              order={order}
              isAdmin={isAdmin}
              isSingleOrder={true}
              showForm={false}
              startTransition={startTransition}
            />
            <div className='flex'>
              <Button className='ml-auto' asChild>
                <Link href={'/'}>Nastavite kupovinu</Link>
              </Button>
            </div>
          </>
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

export function OrderCreatedPageSkeleton() {
  return (
    <div className='space-y-5'>
      <OrderCardOpenSkeleton />
      <div className='flex'>
        <Button className='ml-auto' disabled>
          Nastavite kupovinu
        </Button>
      </div>
    </div>
  )
}
