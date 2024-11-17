import { use } from 'react'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import ProductCarousel, { ProductCarouselSkeleton } from './ProductCarousel'
import ProductDetails, { ProductDetailsSkeleton } from './ProductDetails'
import { GetProductReturnType } from '@/data/services/products'

type Props = {
  productPromise: GetProductReturnType
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
