'use client'

import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from '@/components/ui/carousel'
import { ProductWithRelations } from '@/data/services/products'
import Autoplay from 'embla-carousel-autoplay'

type Props = {
  product: ProductWithRelations
}

export default function ProductCarousel({ product }: Props) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
        }),
      ]}
      className='mb-auto sm:sticky sm:top-[135px]'
    >
      <CarouselContent>
        {product.coverImage && (
          <CarouselItem>
            <Image
              src={product.coverImage.url}
              alt={product.coverImage.name}
              width={800}
              height={800}
              priority
              className='w-full'
            />
          </CarouselItem>
        )}

        {product.images.map((image) => (
          <CarouselItem key={image.id}>
            <Image
              src={image.url}
              alt={image.name}
              width={800}
              height={800}
              priority
              className='w-full'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselControls />
    </Carousel>
  )
}

export function ProductCarouselSkeleton() {
  return (
    <Carousel className='mb-auto sm:sticky sm:top-[135px]'>
      <CarouselContent>
        <CarouselItem>
          <div className='h-auto w-[100%] aspect-square'>
            <Skeleton className='h-auto w-[100%] rounded-xl aspect-square' />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselControls />
    </Carousel>
  )
}
