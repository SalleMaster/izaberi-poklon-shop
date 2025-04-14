import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { Discount } from '@prisma/client'
import { BadgePercent } from 'lucide-react'
import { DiscountForm } from './DiscountForm'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  discount?: Discount
}

export default function DiscountCard({ discount }: Props) {
  return (
    <Card className='py-0'>
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

export function DiscountCardSkeleton() {
  return (
    <Card className='p-4'>
      <div className='flex items-center gap-4'>
        <BadgePercent />
        <Skeleton className='h-4 w-full' />
      </div>
    </Card>
  )
}
