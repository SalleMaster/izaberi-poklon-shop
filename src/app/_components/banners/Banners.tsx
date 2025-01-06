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
                src={banner.image?.url || fallbackImageURL}
                alt={banner.image?.name || banner.name}
                width={1000}
                height={333}
                style={{ width: '100%' }}
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
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <Skeleton className='w-full rounded-none h-[333px]' />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
