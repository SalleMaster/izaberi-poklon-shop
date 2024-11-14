import type { Product, Discount, Media, PriceRange } from '@prisma/client'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductDetailsForm } from './product-details-form/ProductDetailsForm'

type ProductWithRelations = Product & {
  discount: Discount | null
  coverImage: Media | null
  images: Media[]
  priceTable: PriceRange[]
}

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
