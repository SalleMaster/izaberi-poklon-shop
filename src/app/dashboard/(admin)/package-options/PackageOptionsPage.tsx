import prisma from '@/lib/db'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { PackagePlus } from 'lucide-react'
import { PackageOptionForm } from './_components/PackageOptionForm'
import { PackageOption } from '@prisma/client'
import { NotificationAlert } from '@/components/custom/NotificationAlert'

export default async function PackageOptionsPage() {
  const packageOptions = await prisma.packageOption.findMany({
    orderBy: { updatedAt: 'desc' },
  })
  return (
    <div className='space-y-10'>
      <h2 className='text-xl font-bold'>Poklon pakovanja</h2>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Novo</h2>
        <PackageOptionCard />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Kreirana</h2>
        {packageOptions.length > 0 ? (
          packageOptions.map((packageOption) => (
            <PackageOptionCard
              key={packageOption.id}
              packageOption={packageOption}
            />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema kreiranih poklon pakovanja.'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

function PackageOptionCard({
  packageOption,
}: {
  packageOption?: PackageOption | null
}) {
  return (
    <Card>
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
