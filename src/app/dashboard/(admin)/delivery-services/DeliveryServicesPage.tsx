import prisma from '@/lib/db'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Truck } from 'lucide-react'
import { DeliveryServiceForm } from './_components/DeliveryServiceForm'
import { DeliveryService, Media } from '@prisma/client'
import { NotificationAlert } from '@/components/custom/NotificationAlert'

type DeliveryServiceWithPdf = DeliveryService & {
  pdf: Media | null
}

export default async function DeliveryServicesPage() {
  const activeDeliveryServices = await prisma.deliveryService.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
    include: { pdf: true },
  })

  const inactiveDeliveryServices = await prisma.deliveryService.findMany({
    where: { active: false },
    orderBy: { createdAt: 'desc' },
    include: { pdf: true },
  })
  return (
    <div className='space-y-10'>
      <h2 className='text-xl font-bold'>Kurirske Službe</h2>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Nova</h2>
        <DeliveryServiceCard />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Aktivne</h2>
        {activeDeliveryServices.length > 0 ? (
          activeDeliveryServices.map((deliveryService) => (
            <DeliveryServiceCard
              key={deliveryService.id}
              deliveryService={deliveryService}
            />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema aktivnih kurirskih službi'
            variant='info'
          />
        )}
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Neaktivne</h2>
        {inactiveDeliveryServices.length > 0 ? (
          inactiveDeliveryServices.map((deliveryService) => (
            <DeliveryServiceCard
              key={deliveryService.id}
              deliveryService={deliveryService}
            />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema neaktivnih kurirskih službi'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

function DeliveryServiceCard({
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
