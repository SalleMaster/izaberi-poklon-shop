import { Suspense } from 'react'

import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SlidersHorizontal } from 'lucide-react'
import ProductsFilters from './ProductsFilters'

export default async function ProductsHeader() {
  return (
    <div className='space-y-2.5 md:space-y-0 md:flex md:justify-between'>
      <h2 className='text-xl font-bold'>Pokloni</h2>

      <div className='hidden md:block'>
        <Suspense>
          <ProductsFilters />
        </Suspense>
      </div>

      <Card className='md:hidden py-0'>
        <Accordion type='single' collapsible className='px-4'>
          <AccordionItem value='item-1' className='border-b-0'>
            <AccordionTrigger aria-label='Filters'>
              <SlidersHorizontal />
            </AccordionTrigger>
            <AccordionContent className='space-y-4'>
              <Suspense>
                <ProductsFilters />
              </Suspense>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  )
}
