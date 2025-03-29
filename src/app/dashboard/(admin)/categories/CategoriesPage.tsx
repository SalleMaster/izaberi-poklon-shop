import prisma from '@/lib/db'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { CategoryForm } from './_components/CategoryForm'
import { Category, Media } from '@prisma/client'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { fallbackImageURL } from '@/lib/consts'

type CategoryWithImage = Category & {
  image: Media | null
}

export default async function CategoriesPage() {
  const activeCategories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
    include: { image: true },
  })

  const inactiveCategories = await prisma.category.findMany({
    where: { active: false },
    orderBy: { createdAt: 'desc' },
    include: { image: true },
  })
  return (
    <div className='space-y-10'>
      <h2 className='text-xl font-bold'>Kategorije</h2>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Nova</h2>
        <CategoryCard />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Aktivne</h2>
        {activeCategories.length > 0 ? (
          activeCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema aktivnih kategorija'
            variant='info'
          />
        )}
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Neaktivne</h2>
        {inactiveCategories.length > 0 ? (
          inactiveCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema neaktivnih kategorija'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

function CategoryCard({ category }: { category?: CategoryWithImage }) {
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
