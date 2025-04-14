import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Truck } from 'lucide-react'
import { DeliveryServiceForm } from './DeliveryServiceForm'
import { DeliveryServiceWithPdf } from '@/data/services/delivery-services'
import { Skeleton } from '@/components/ui/skeleton'

export default function DeliveryServiceCard({
  deliveryService,
}: {
  deliveryService?: DeliveryServiceWithPdf
}) {
  return (
    <Card className='py-0'>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem
          value={deliveryService?.id || 'create-delivery-service'}
          className='border-b-0'
        >
          <AccordionTrigger>
            <div className='flex items-center gap-4'>
              <Truck />
              <span className='font-semibold'>
                {deliveryService?.name || 'Kreiraj kurirsku službu'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <DeliveryServiceForm deliveryService={deliveryService} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export function DeliveryServiceCardSkeleton() {
  return (
    <Card className='p-4'>
      <div className='w-full flex items-center gap-4 pr-4'>
        <Truck />
        <Skeleton className='h-4 w-full' />
      </div>
    </Card>
  )
}
