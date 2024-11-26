import { Skeleton } from '@/components/ui/skeleton'
import { ProductDetailsForm } from './product-details-form/ProductDetailsForm'
import { ProductWithRelations } from '@/data/services/products'
import ProductDetailsPrice from './ProductDetailsPrice'
import ProductDetailsPriceTable from './ProductDetailsPriceTable'

type Props = {
  product: ProductWithRelations
}

export default function ProductDetails({ product }: Props) {
  return (
    <div className='space-y-2.5'>
      <h3 className='text-2xl font-extrabold'>{product.name}</h3>
      <ProductDetailsPrice
        discount={product.discount}
        formatedPrice={product.formatedPrice}
        formatedFinalPrice={product.formatedFinalPrice}
        formatedSavings={product.formatedSavings}
        priceTable={product.priceTable}
      />
      <ProductDetailsPriceTable
        priceTable={product.priceTable}
        discount={product.discount}
      />
      <ProductDetailsForm product={product} />
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
