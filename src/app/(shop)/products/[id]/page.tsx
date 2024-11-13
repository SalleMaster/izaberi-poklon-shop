import { getProduct } from '@/data/services/products'
import { Suspense } from 'react'
import ProductGrid, { ProductGridSkeleton } from './_components/ProductGrid'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductDetailsPage(props: PageProps) {
  const params = await props.params

  const { id } = params

  const productPromise = getProduct({ id })

  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductGrid productPromise={productPromise} />
    </Suspense>
  )
}
