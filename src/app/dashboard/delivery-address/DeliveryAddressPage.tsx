'use client'

import { GetDeliveryAddressesReturnType } from '@/data/services/delivery-addresses'
import { DeliveryAddress } from '@prisma/client'
import { TransitionStartFunction, use, useTransition } from 'react'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { DeliveryAddressForm } from './_components/DeliveryAddressForm'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { Truck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  deliveryAddressesPromise: GetDeliveryAddressesReturnType
}

export default function DeliveryAddressPage({
  deliveryAddressesPromise,
}: Props) {
  const deliveryAddresses = use(deliveryAddressesPromise)
  const [isPending, startTransition] = useTransition()

  return (
    <div className={cn('space-y-10', isPending && 'animate-pulse')}>
      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Nova</h2>
        <DeliveryAddressCard startTransition={startTransition} />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Sačuvane Adrese</h2>
        {deliveryAddresses.length ? (
          deliveryAddresses.map((deliveryAddress) => (
            <DeliveryAddressCard
              key={deliveryAddress.id}
              deliveryAddress={deliveryAddress}
              startTransition={startTransition}
            />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema sačuvanih adresa'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

export function DeliveryAddressPageSkeleton() {
  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Nova</h2>
        <DeliveryAddressCardSkeleton />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Sačuvane Adrese</h2>
        <DeliveryAddressCardSkeleton />
        <DeliveryAddressCardSkeleton />
        <DeliveryAddressCardSkeleton />
      </div>
    </div>
  )
}

function DeliveryAddressCard({
  deliveryAddress,
  startTransition,
}: {
  deliveryAddress?: DeliveryAddress
  startTransition: TransitionStartFunction
}) {
  return (
    <Card>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem
          value={deliveryAddress?.id || 'create-delivery-address'}
          className='border-b-0'
        >
          <AccordionTrigger>
            <div className='flex items-center gap-4'>
              <Truck />
              <p className='font-semibold'>
                {deliveryAddress?.address || 'Kreiraj adresu dostave'}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <DeliveryAddressForm
              deliveryAddress={deliveryAddress}
              startTransition={startTransition}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export function DeliveryAddressCardSkeleton() {
  return (
    <Card className='p-4'>
      <div className='flex items-center gap-4'>
        <Truck />
        <Skeleton className='h-4 w-1/2' />
      </div>
    </Card>
  )
}
