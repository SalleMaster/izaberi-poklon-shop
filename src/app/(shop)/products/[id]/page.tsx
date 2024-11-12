import { getProduct } from '@/data/services/products'
import { Suspense } from 'react'
import ProductCarousel, {
  ProductCarouselSkeleton,
} from './_components/ProductCarousel'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductDetailsPage(props: PageProps) {
  const params = await props.params

  const { id } = params

  const productPromise = getProduct({ id })

  return (
    <div className='space-y-10'>
      <div className='sm:grid sm:grid-cols-2'>
        <Suspense fallback={<ProductCarouselSkeleton />}>
          <ProductCarousel productPromise={productPromise} />
        </Suspense>
      </div>
    </div>
  )
}
