import { use } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { GetProductsReturnType } from '@/data/services/products'
import ProductCard, {
  ProductCardSkeleton,
} from '@/components/custom/ProductCard'

type Props = {
  productsPromise: GetProductsReturnType
  title: string
}

export default function ProductsCarousel({ productsPromise, title }: Props) {
  const products = use(productsPromise)

  if (!products.length) {
    return null
  }

  return (
    <div className='md:px-12'>
      <h2 className='text-2xl font-bold text-center mb-5'>{title}</h2>
      <Carousel
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className='py-1'>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className='basis-1/2 md:basis-1/4 lg:basis-1/6'
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

type ProductsCarouselSkeletonProps = {
  title: string
}

export function ProductsCarouselSkeleton({
  title,
}: ProductsCarouselSkeletonProps) {
  return (
    <div className='md:px-12'>
      <h2 className='text-2xl font-bold text-center mb-5'>{title}</h2>
      <Carousel>
        <CarouselContent className='py-1'>
          <CarouselItem className='basis-1/2 md:basis-1/4 lg:basis-1/6'>
            <ProductCardSkeleton />
          </CarouselItem>
          <CarouselItem className='basis-1/2 md:basis-1/4 lg:basis-1/6'>
            <ProductCardSkeleton />
          </CarouselItem>
          <CarouselItem className='basis-1/2 md:basis-1/4 lg:basis-1/6'>
            <ProductCardSkeleton />
          </CarouselItem>
          <CarouselItem className='basis-1/2 md:basis-1/4 lg:basis-1/6'>
            <ProductCardSkeleton />
          </CarouselItem>
          <CarouselItem className='basis-1/2 md:basis-1/4 lg:basis-1/6'>
            <ProductCardSkeleton />
          </CarouselItem>
          <CarouselItem className='basis-1/2 md:basis-1/4 lg:basis-1/6'>
            <ProductCardSkeleton />
          </CarouselItem>
          <CarouselItem className='basis-1/2 md:basis-1/4 lg:basis-1/6'>
            <ProductCardSkeleton />
          </CarouselItem>
          <CarouselItem className='basis-1/2 md:basis-1/4 lg:basis-1/6'>
            <ProductCardSkeleton />
          </CarouselItem>
          <CarouselItem className='basis-1/2 md:basis-1/4 lg:basis-1/6'>
            <ProductCardSkeleton />
          </CarouselItem>
          <CarouselItem className='basis-1/2 md:basis-1/4 lg:basis-1/6'>
            <ProductCardSkeleton />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
