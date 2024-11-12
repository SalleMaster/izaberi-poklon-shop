import type { Product, Discount, Media, PriceRange } from '@prisma/client'
import { use } from 'react'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import ProductCard, {
  ProductCardSkeleton,
} from '@/components/custom/ProductCard'

type ProductWithRelations = Product & {
  discount: Discount | null
  coverImage: Media | null
  priceTable: PriceRange[]
}

type Props = {
  productsPromise: Promise<ProductWithRelations[]>
}

export default function ProductsGrid({ productsPromise }: Props) {
  const products = use(productsPromise)

  return (
    <div className='group-has-[[data-pending-products]]:animate-pulse'>
      {products.length > 0 ? (
        <div className='grid gap-2 grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <NotificationAlert
          title='Obaveštenje'
          description='Trenutno nema proizvoda po zadatom kriterijumu.'
          variant='info'
          className='mb-auto'
        />
      )}
    </div>
  )
}

export function ProductsGridSkeleton() {
  return (
    <div className='grid gap-2 grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5'>
      {Array.from({ length: 12 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}
