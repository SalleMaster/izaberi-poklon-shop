import type { Product, Discount, Media, PriceRange } from '@prisma/client'
import { Skeleton } from '@/components/ui/skeleton'

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
  return (
    <div>
      <p className='text-xl font-semibold'>{product.name}</p>
    </div>
  )
}

export function ProductDetailsSkeleton() {
  return (
    <div className='h-auto w-[100%] aspect-square p-10'>
      <Skeleton className='h-auto w-[100%] rounded-xl aspect-square' />
    </div>
  )
}
