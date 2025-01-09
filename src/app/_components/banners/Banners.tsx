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

  if (!banners.length) {
    return null
  }

  return (
    <div className='md:px-12'>
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
                  width={1000}
                  height={300}
                  style={{ width: '100%' }}
                  className='hidden md:block'
                />
                <Image
                  src={banner.mobileImage?.url || fallbackImageURL}
                  alt={banner.mobileImage?.name || banner.name}
                  width={300}
                  height={500}
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
    </div>
  )
}

export function BannersSkeleton() {
  return (
    <div className='md:px-12'>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <Skeleton className='hidden md:block w-full rounded-none aspect-[10/3]' />
            <Skeleton className='md:hidden w-full rounded-none aspect-[3/5]' />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
