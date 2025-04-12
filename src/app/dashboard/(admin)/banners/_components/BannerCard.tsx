import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { BannerForm } from './BannerForm'
import { fallbackImageURL } from '@/lib/consts'
import { BannerWithImageType } from '@/data/services/banners'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  banner?: BannerWithImageType
}

export default function BannerCard({ banner }: Props) {
  return (
    <Card className='py-0'>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem
          value={banner?.id || 'create-banner'}
          className='border-b-0'
        >
          <AccordionTrigger>
            <div className='flex items-center gap-4'>
              <div className='flex items-center w-6 h-6'>
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

export function BannerCardSkeleton() {
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
