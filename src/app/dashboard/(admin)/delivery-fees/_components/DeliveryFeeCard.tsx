import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { DeliveryFee } from '@/generated/prisma'
import { Package } from 'lucide-react'
import { DeliveryFeeForm } from './DeliveryFeeForm'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  deliveryFee?: DeliveryFee
}

export default function DeliveryFeeCard({ deliveryFee }: Props) {
  return (
    <Card className='py-0'>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem
          value={deliveryFee?.id || 'create-delivery-fee'}
          className='border-b-0'
        >
          <AccordionTrigger>
            <div className='flex items-center gap-4'>
              <Package />
              <span className='font-semibold'>
                {deliveryFee?.name || 'Kreiraj cenu poštarine'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <DeliveryFeeForm deliveryFee={deliveryFee} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export function DeliveryFeeCardSkeleton() {
  return (
    <Card className='p-4'>
      <div className='w-full flex items-center gap-4 pr-4'>
        <Package />

        <Skeleton className='h-4 w-full' />
      </div>
    </Card>
  )
}
