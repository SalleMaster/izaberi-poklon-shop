import { Skeleton } from '@/components/ui/skeleton'
import { ProductWithRelations } from '@/data/services/products'
import ProductDetailsPrice from '../product-details-price/ProductDetailsPrice'
import ProductDetailsPriceTable from '../product-details-price-table/ProductDetailsPriceTable'
import { ProductDetailsForm } from '../product-details-form/ProductDetailsForm'
import ProductDetailsInfo from '../product-details-info/ProductDetailsInfo'
import { User as UserType } from 'next-auth'
import { NotificationAlert } from '@/components/custom/NotificationAlert'

type Props = {
  product: ProductWithRelations
  user?: UserType
}

export default function ProductDetails({ product, user }: Props) {
  const isAvailable =
    product?.inStock && product.categories.some((category) => category.active)
  return (
    <div className='space-y-2.5'>
      <h3 className='text-2xl font-extrabold'>{product.name}</h3>
      <ProductDetailsPrice
        discount={product.discount}
        formattedPrice={product.formattedPrice}
        formattedFinalPrice={product.formattedFinalPrice}
        formattedSavings={product.formattedSavings}
        priceTable={product.priceTable}
      />

      {product.priceTable.length > 1 ? (
        <ProductDetailsPriceTable
          priceTable={product.priceTable}
          discount={product.discount}
        />
      ) : null}

      <div className='space-y-10'>
        {isAvailable ? (
          <ProductDetailsForm product={product} user={user} />
        ) : (
          <NotificationAlert
            title='Obaveštenje:'
            description='Ovaj proizvod trenutno nije dostupan za poručivanje.'
            className='mt-10'
          />
        )}

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
    <div className='h-auto w-[100%] aspect-square'>
      <Skeleton className='h-auto w-[100%] rounded-xl aspect-square' />
    </div>
  )
}
