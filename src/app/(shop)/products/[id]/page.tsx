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

export default async function Page({ params }: PageProps<'/products/[id]'>) {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <PageLoader params={params} />
    </Suspense>
  )
}

async function PageLoader({
  params,
}: Pick<PageProps<'/products/[id]'>, 'params'>) {
  const { id } = await params

  const productPromise = getProduct({ id })
  const productRatingsPromise = getProductRatings({
    id,
    status: RatingStatusType.approved,
  })
  const orderedProductIdsPromise = getOrderedProductIds()
  const productAlreadyRatedPromise = getProductAlreadyRated({ id })
  const sessionPromise = getSession()

  return (
    <ProductGrid
      productPromise={productPromise}
      productRatingsPromise={productRatingsPromise}
      orderedProductIdsPromise={orderedProductIdsPromise}
      productAlreadyRatedPromise={productAlreadyRatedPromise}
      sessionPromise={sessionPromise}
    />
  )
}
