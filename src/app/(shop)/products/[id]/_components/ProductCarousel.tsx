import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ProductWithRelations } from '@/data/services/products'

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
