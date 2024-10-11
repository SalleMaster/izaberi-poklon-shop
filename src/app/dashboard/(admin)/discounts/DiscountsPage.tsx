import prisma from '@/lib/db'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { BadgePercent } from 'lucide-react'
import { DiscountForm } from './_components/DiscountForm'
import { Discount } from '@prisma/client'
import { NotificationAlert } from '@/components/custom/NotificationAlert'

export default async function DiscountsPage() {
  const activeDiscounts = await prisma.discount.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
  })

  const inactiveDiscounts = await prisma.discount.findMany({
    where: { active: false },
    orderBy: { createdAt: 'desc' },
  })
  return (
    <div className='space-y-10'>
      <h2 className='text-xl font-bold'>Popusti</h2>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Novi</h2>
        <DiscountCard />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Aktivni</h2>
        {activeDiscounts.length > 0 ? (
          activeDiscounts.map((discount) => (
            <DiscountCard key={discount.id} discount={discount} />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema aktivnih popusta'
            variant='info'
          />
        )}
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Neaktivni</h2>
        {inactiveDiscounts.length > 0 ? (
          inactiveDiscounts.map((discount) => (
            <DiscountCard key={discount.id} discount={discount} />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema neaktivnih popusta'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

function DiscountCard({ discount }: { discount?: Discount | null }) {
  return (
    <Card>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem
          value={discount?.id || 'create-discount'}
          className='border-b-0'
        >
          <AccordionTrigger>
            <div className='flex items-center gap-4'>
              <BadgePercent />
              <span className='font-semibold'>
                {discount?.name || 'Kreiraj popust'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <DiscountForm discount={discount} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}
