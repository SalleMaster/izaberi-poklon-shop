import { getProduct } from '@/data/services/products'
import { Suspense } from 'react'
import getSession from '@/lib/getSession'
import ProductGrid, { ProductGridSkeleton } from './_components/ProductGrid'
import { getProductRatings } from '@/data/services/ratings'
import { RatingStatusType } from '@prisma/client'

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
  const sessionPromise = getSession()

  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductGrid
        productPromise={productPromise}
        productRatingsPromise={productRatingsPromise}
        sessionPromise={sessionPromise}
      />
    </Suspense>
  )
}
