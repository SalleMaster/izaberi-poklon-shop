import { cacheTag } from 'next/cache'
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from '@/components/ui/carousel'
import {
  getDiscountedProducts,
  getTrendingProducts,
  ProductCardType,
} from '@/data/services/products'
import ProductCard from '@/components/custom/ProductCard'

type Props = {
  productType: 'trending' | 'discounted'
  title: string
}

export default async function ProductsCarousel({ productType, title }: Props) {
  'use cache'

  cacheTag('products-carousel')
  let products: ProductCardType[] = []

  switch (productType) {
    case 'trending':
      products = await getTrendingProducts({ take: 10 })
      break
    case 'discounted':
      products = await getDiscountedProducts({ take: 10 })
      break
    default:
      break
  }

  if (!products.length) {
    return null
  }

  return (
    <div>
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
        <CarouselControls />
      </Carousel>
    </div>
  )
}
