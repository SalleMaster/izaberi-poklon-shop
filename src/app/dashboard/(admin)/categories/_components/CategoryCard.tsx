import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { fallbackImageURL } from '@/lib/consts'
import Image from 'next/image'
import { CategoryForm } from './CategoryForm'
import { CategoryWithImage } from '@/data/services/category'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  category?: CategoryWithImage
}

export default function CategoryCard({ category }: Props) {
  return (
    <Card className='py-0'>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem
          value={category?.id || 'create-category'}
          className='border-b-0'
        >
          <AccordionTrigger>
            <div className='flex items-center gap-4'>
              <div className='w-6'>
                <Image
                  src={category?.image?.url || fallbackImageURL}
                  alt={category?.image?.name || 'No image'}
                  width={24}
                  height={24}
                />
              </div>
              <span className='font-semibold'>
                {category?.name || 'Kreiraj kategoriju'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CategoryForm category={category} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export function CategoryCardSkeleton() {
  return (
    <Card className='p-4'>
      <div className='w-full flex items-center gap-3 pr-4'>
        <div className='w-6'>
          <Image
            src={fallbackImageURL}
            alt={'No image'}
            width={24}
            height={24}
          />
        </div>

        <Skeleton className='h-4 w-full' />
      </div>
    </Card>
  )
}
