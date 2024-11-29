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
      className='mb-auto sm:sticky sm:top-[135px]'
    >
      <CarouselContent>
        {product.coverImage && (
          <CarouselItem className='px-10'>
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
          <CarouselItem key={image.id} className='px-10'>
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
      <CarouselPrevious className='left-0' />
      <CarouselNext className='right-0' />
    </Carousel>
  )
}

export function ProductCarouselSkeleton() {
  return (
    <Carousel className='mb-auto sm:sticky sm:top-[135px]'>
      <CarouselContent>
        <CarouselItem className='px-10'>
          <div className='h-auto w-[100%] aspect-square'>
            <Skeleton className='h-auto w-[100%] rounded-xl aspect-square' />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className='left-0' />
      <CarouselNext className='right-0' />
    </Carousel>
  )
}
