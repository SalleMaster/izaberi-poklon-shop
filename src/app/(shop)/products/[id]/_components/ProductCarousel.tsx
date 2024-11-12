import type { Product, Discount, Media, PriceRange } from '@prisma/client'
import { use } from 'react'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

type ProductWithRelations = Product & {
  discount: Discount | null
  coverImage: Media | null
  images: Media[]
  priceTable: PriceRange[]
}

type Props = {
  productPromise: Promise<ProductWithRelations | null>
}

export default function ProductCarousel({ productPromise }: Props) {
  const product = use(productPromise)

  return (
    <>
      {product ? (
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent>
            {product.coverImage && (
              <CarouselItem>
                <Image
                  src={product.coverImage.url}
                  alt={product.coverImage.name}
                  width={300}
                  height={300}
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
                  width={300}
                  height={300}
                  priority
                  className='w-full'
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='left-0' />
          <CarouselNext className='right-0' />
        </Carousel>
      ) : (
        <NotificationAlert
          title='Obaveštenje'
          description='Ovaj proizvod nije dostupan.'
          variant='info'
          className='mb-auto'
        />
      )}
    </>
  )
}

export function ProductCarouselSkeleton() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <div className='h-auto w-[100%] aspect-square p-10'>
            <Skeleton className='h-auto w-[100%] rounded-xl aspect-square' />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className='left-0' />
      <CarouselNext className='right-0' />
    </Carousel>
  )
}
