import { Skeleton } from '@/components/ui/skeleton'
import { ProductDetailsForm } from './product-details-form/ProductDetailsForm'
import { ProductWithRelations } from '@/data/services/products'

type Props = {
  product: ProductWithRelations
}

export default function ProductDetails({ product }: Props) {
  return <ProductDetailsForm productId={product.id} />
}

export function ProductDetailsSkeleton() {
  return (
    <div className='h-auto w-[100%] aspect-square p-10'>
      <Skeleton className='h-auto w-[100%] rounded-xl aspect-square' />
    </div>
  )
}
