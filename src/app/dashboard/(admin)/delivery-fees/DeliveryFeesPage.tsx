import prisma from '@/lib/db'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Package } from 'lucide-react'
import { DeliveryFeeForm } from './_components/DeliveryFeeForm'
import { DeliveryFee } from '@prisma/client'
import { NotificationAlert } from '@/components/custom/NotificationAlert'

export default async function DeliveryFeesPage() {
  const deliveryFees = await prisma.deliveryFee.findMany({
    orderBy: { fee: 'asc' },
  })
  return (
    <div className='space-y-10'>
      <h2 className='text-xl font-bold'>Poštarine</h2>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Nova</h2>
        <DeliveryFeeCard />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Kreirane</h2>
        {deliveryFees.length > 0 ? (
          deliveryFees.map((deliveryFee) => (
            <DeliveryFeeCard key={deliveryFee.id} deliveryFee={deliveryFee} />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema kreiranih cena poštarine.'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

function DeliveryFeeCard({
  deliveryFee,
}: {
  deliveryFee?: DeliveryFee | null
}) {
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
