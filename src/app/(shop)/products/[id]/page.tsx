import { getProduct } from '@/data/services/products'
import { Suspense } from 'react'
import getSession from '@/lib/getSession'
import ProductGrid, { ProductGridSkeleton } from './_components/ProductGrid'

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductDetailsPage(props: Props) {
  const params = await props.params

  const { id } = params

  const productPromise = getProduct({ id })
  const sessionPromise = getSession()

  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductGrid
        productPromise={productPromise}
        sessionPromise={sessionPromise}
      />
    </Suspense>
  )
}
