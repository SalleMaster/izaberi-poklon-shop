'use client'

import { use } from 'react'
import { BannerWithImageType } from '@/data/services/banners'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { fallbackImageURL } from '@/lib/consts'
import Image from 'next/image'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  bannersPromise: Promise<BannerWithImageType[]>
}

export default function Banners({ bannersPromise }: Props) {
  const banners = use(bannersPromise)

  return (
    <Carousel
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <Link href={banner.link}>
              <Image
                src={banner.desktopImage?.url || fallbackImageURL}
                alt={banner.desktopImage?.name || banner.name}
                width={1200}
                height={600}
                style={{ width: '100%' }}
                className='hidden md:block'
              />
              <Image
                src={banner.mobileImage?.url || fallbackImageURL}
                alt={banner.mobileImage?.name || banner.name}
                width={500}
                height={600}
                style={{ width: '100%' }}
                className='md:hidden'
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export function BannersSkeleton() {
  return (
    <Carousel className='mt-0'>
      <CarouselContent>
        <CarouselItem>
          <Skeleton className='w-full rounded-none h-[600px]' />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
