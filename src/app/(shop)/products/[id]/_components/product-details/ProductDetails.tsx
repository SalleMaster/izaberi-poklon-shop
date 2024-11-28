import { Skeleton } from '@/components/ui/skeleton'
import { ProductWithRelations } from '@/data/services/products'
import ProductDetailsPrice from '../product-details-price/ProductDetailsPrice'
import ProductDetailsPriceTable from '../product-details-price-table/ProductDetailsPriceTable'
import { ProductDetailsForm } from '../product-details-form/ProductDetailsForm'
import ProductDetailsInfo from '../product-details-info/ProductDetailsInfo'

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

      {product.priceTable.length > 1 ? (
        <ProductDetailsPriceTable
          priceTable={product.priceTable}
          discount={product.discount}
        />
      ) : null}

      <div className='space-y-10'>
        <ProductDetailsForm product={product} />

        <ProductDetailsInfo
          delivery={product.delivery}
          dimensions={product.dimensions}
          material={product.material}
          personalization={product.personalization}
          description={product.description}
        />
      </div>
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
