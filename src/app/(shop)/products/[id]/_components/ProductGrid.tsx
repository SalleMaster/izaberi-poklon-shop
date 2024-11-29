import { use } from 'react'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { GetProductReturnType } from '@/data/services/products'
import ProductCarousel, {
  ProductCarouselSkeleton,
} from './product-details-carousel/ProductCarousel'
import ProductDetails, {
  ProductDetailsSkeleton,
} from './product-details/ProductDetails'

type Props = {
  productPromise: GetProductReturnType
}

export default function ProductGrid({ productPromise }: Props) {
  const product = use(productPromise)

  return (
    <>
      {product ? (
        <div>
          <div className='relative sm:grid sm:grid-cols-2 sm:gap-4 md:gap-10'>
            <ProductCarousel product={product} />
            <ProductDetails product={product} />
          </div>
          <div className='h-[1000px]'></div>
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
    <div className='sm:grid sm:grid-cols-2 sm:gap-4 md:gap-10'>
      <ProductCarouselSkeleton />
      <ProductDetailsSkeleton />
      <div className='h-[500px]'></div>
    </div>
  )
}
