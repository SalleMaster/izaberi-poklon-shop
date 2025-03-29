import prisma from '@/lib/db'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Gem } from 'lucide-react'
import { CouponForm } from './_components/CouponForm'
import { Coupon } from '@prisma/client'
import { NotificationAlert } from '@/components/custom/NotificationAlert'

export default async function CouponsPage() {
  const activeCoupons = await prisma.coupon.findMany({
    where: {
      active: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  const inactiveCoupons = await prisma.coupon.findMany({
    where: {
      active: false,
    },
    orderBy: { createdAt: 'desc' },
  })
  return (
    <div className='space-y-10'>
      <h2 className='text-xl font-bold'>Kuponi</h2>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Novi</h2>
        <CouponCard />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Aktivni</h2>
        {activeCoupons.length > 0 ? (
          activeCoupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema aktivnih kupona'
            variant='info'
          />
        )}
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Neaktivni</h2>
        {inactiveCoupons.length > 0 ? (
          inactiveCoupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema neaktivnih kupona'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

function CouponCard({ coupon }: { coupon?: Coupon | null }) {
  return (
    <Card className='py-0'>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem
          value={coupon?.id || 'create-coupon'}
          className='border-b-0'
        >
          <AccordionTrigger>
            <div className='flex items-center gap-4'>
              <Gem />
              <span className='font-semibold'>
                {coupon?.name || 'Kreiraj kupon'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CouponForm coupon={coupon} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}
