import { use } from 'react'
import { Session } from 'next-auth'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { GetProductReturnType } from '@/data/services/products'
import ProductCarousel, {
  ProductCarouselSkeleton,
} from './product-details-carousel/ProductCarousel'
import ProductDetails, {
  ProductDetailsSkeleton,
} from './product-details/ProductDetails'
import {
  GetProductAlreadyRatedReturnType,
  GetProductRatingsReturnType,
} from '@/data/services/ratings'
import ProductRatings from './product-ratings/ProductRatings'
import { GetOrderedProductIdsReturnType } from '@/data/services/order'

type Props = {
  productPromise: GetProductReturnType
  productRatingsPromise: GetProductRatingsReturnType
  orderedProductIdsPromise: GetOrderedProductIdsReturnType
  productAlreadyRatedPromise: GetProductAlreadyRatedReturnType
  sessionPromise: Promise<Session | null>
}

export default function ProductGrid({
  productPromise,
  productRatingsPromise,
  orderedProductIdsPromise,
  productAlreadyRatedPromise,
  sessionPromise,
}: Props) {
  const product = use(productPromise)
  const ratings = use(productRatingsPromise)
  const orderedProductIds = use(orderedProductIdsPromise)
  const productAlreadyRated = use(productAlreadyRatedPromise)
  const session = use(sessionPromise)
  const user = session?.user

  console.log(ratings)

  return (
    <>
      {product ? (
        <div className='space-y-10'>
          <div className='relative sm:grid sm:grid-cols-2 sm:gap-4 md:gap-10'>
            <ProductCarousel product={product} />
            <ProductDetails product={product} user={user} />
          </div>
          <ProductRatings
            product={product}
            ratings={ratings}
            user={user}
            orderedProductIds={orderedProductIds}
            productAlreadyRated={productAlreadyRated}
          />
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
