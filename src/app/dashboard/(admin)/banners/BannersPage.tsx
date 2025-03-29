import prisma from '@/lib/db'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { BannerForm } from './_components/BannerForm'
import { fallbackImageURL } from '@/lib/consts'
import { BannerWithImageType } from '@/data/services/banners'

export default async function BannersPage() {
  const activeBanners = await prisma.banner.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
    include: { desktopImage: true, mobileImage: true },
  })

  const inactiveBanners = await prisma.banner.findMany({
    where: { active: false },
    orderBy: { createdAt: 'desc' },
    include: { desktopImage: true, mobileImage: true },
  })
  return (
    <div className='space-y-10'>
      <h2 className='text-xl font-bold'>Baneri</h2>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Novi</h2>
        <BannerCard />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Aktivni</h2>
        {activeBanners.length > 0 ? (
          activeBanners.map((banner) => (
            <BannerCard key={banner.id} banner={banner} />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema aktivnih banera'
            variant='info'
          />
        )}
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Neaktivni</h2>
        {inactiveBanners.length > 0 ? (
          inactiveBanners.map((banner) => (
            <BannerCard key={banner.id} banner={banner} />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema neaktivnih banera'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

function BannerCard({ banner }: { banner?: BannerWithImageType }) {
  return (
    <Card className='py-0'>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem
          value={banner?.id || 'create-banner'}
          className='border-b-0'
        >
          <AccordionTrigger>
            <div className='flex items-center gap-4'>
              <div className='w-6'>
                <Image
                  src={banner?.desktopImage?.url || fallbackImageURL}
                  alt={banner?.desktopImage?.name || 'No image'}
                  width={24}
                  height={24}
                />
              </div>
              <span className='font-semibold'>
                {banner?.name || 'Kreiraj baner'}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <BannerForm banner={banner} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}
