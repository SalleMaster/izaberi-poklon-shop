import { getProduct } from '@/data/services/products'
import { Suspense } from 'react'
import getSession from '@/lib/getSession'
import ProductGrid, { ProductGridSkeleton } from './_components/ProductGrid'
import {
  getProductAlreadyRated,
  getProductRatings,
} from '@/data/services/ratings'
import { RatingStatusType } from '@/generated/prisma'
import { getOrderedProductIds } from '@/data/services/order'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductDetailsPage(props: Props) {
  const params = await props.params

  const { id } = params

  const productPromise = getProduct({ id })
  const productRatingsPromise = getProductRatings({
    id,
    status: RatingStatusType.approved,
  })
  const orderedProductIdsPromise = getOrderedProductIds()
  const productAlreadyRatedPromise = getProductAlreadyRated({ id })
  const sessionPromise = getSession()

  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductGrid
        productPromise={productPromise}
        productRatingsPromise={productRatingsPromise}
        orderedProductIdsPromise={orderedProductIdsPromise}
        productAlreadyRatedPromise={productAlreadyRatedPromise}
        sessionPromise={sessionPromise}
      />
    </Suspense>
  )
}
