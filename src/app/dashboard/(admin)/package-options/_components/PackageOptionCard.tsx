import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { PackageOption } from '@/generated/prisma'
import { PackagePlus } from 'lucide-react'
import { PackageOptionForm } from './PackageOptionForm'
import { Skeleton } from '@/components/ui/skeleton'

export default function PackageOptionCard({
  packageOption,
}: {
  packageOption?: PackageOption
}) {
  return (
    <Card className='py-0'>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem
          value={packageOption?.id || 'create-package-option'}
          className='border-b-0'
        >
          <AccordionTrigger>
            <div className='flex items-center gap-4'>
              <PackagePlus />
              <span className='font-semibold'>
                {packageOption?.name || 'Kreiraj poklon pakovanje'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <PackageOptionForm packageOption={packageOption} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export function PackageOptionCardSkeleton() {
  return (
    <Card className='p-4'>
      <div className='flex items-center gap-4'>
        <PackagePlus />
        <Skeleton className='h-4 w-full' />
      </div>
    </Card>
  )
}
