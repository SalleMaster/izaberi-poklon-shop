import type { Product, Discount, Media, PriceRange } from '@prisma/client'
import { use } from 'react'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import ProductCarousel, { ProductCarouselSkeleton } from './ProductCarousel'
import ProductDetails, { ProductDetailsSkeleton } from './ProductDetails'

type ProductWithRelations = Product & {
  discount: Discount | null
  coverImage: Media | null
  images: Media[]
  priceTable: PriceRange[]
}

type Props = {
  productPromise: Promise<ProductWithRelations | null>
}

export default function ProductGrid({ productPromise }: Props) {
  const product = use(productPromise)

  return (
    <>
      {product ? (
        <div className='sm:grid sm:grid-cols-2'>
          <ProductCarousel product={product} />
          <ProductDetails product={product} />
        </div>
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

export function ProductGridSkeleton() {
  return (
    <div className='sm:grid sm:grid-cols-2'>
      <ProductCarouselSkeleton />
      <ProductDetailsSkeleton />
    </div>
  )
}
