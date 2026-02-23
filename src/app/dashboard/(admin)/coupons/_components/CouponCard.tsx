import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Gem } from 'lucide-react'
import { CouponForm } from './CouponForm'
import { Coupon } from '@/generated/prisma/client'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  coupon?: Coupon
}

export default function CouponCard({ coupon }: Props) {
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

export function CouponCardSkeleton() {
  return (
    <Card className='p-4'>
      <div className='w-full flex items-center gap-3 pr-4'>
        <Gem />

        <Skeleton className='h-4 w-full' />
      </div>
    </Card>
  )
}
