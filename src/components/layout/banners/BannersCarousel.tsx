'use client'
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from '@/components/ui/carousel'
import { fallbackImageURL } from '@/lib/consts'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import Autoplay from 'embla-carousel-autoplay'
import { BannerWithImageType } from '@/data/services/banners'
import DynamicImage from '@/components/custom/DynamicImage'

type BannersCarouselProps = { banners: BannerWithImageType[] }

export default function BannersCarousel({ banners }: BannersCarouselProps) {
  return (
    <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 5000 })]}>
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <Link href={banner.link}>
              <DynamicImage
                src={banner.desktopImage?.url || fallbackImageURL}
                alt={banner.desktopImage?.name || banner.name}
                width={1000}
                height={300}
                style={{ width: '100%' }}
                priority
                className='hidden md:block'
              />
              <DynamicImage
                src={banner.mobileImage?.url || fallbackImageURL}
                alt={banner.mobileImage?.name || banner.name}
                width={300}
                height={500}
                style={{ width: '100%' }}
                priority
                className='md:hidden'
              />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselControls />
    </Carousel>
  )
}

export function BannersSkeleton() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <Skeleton className='hidden md:block w-full rounded-none aspect-10/3' />
          <Skeleton className='md:hidden w-full rounded-none aspect-3/5' />
        </CarouselItem>
      </CarouselContent>
      <CarouselControls />
    </Carousel>
  )
}
