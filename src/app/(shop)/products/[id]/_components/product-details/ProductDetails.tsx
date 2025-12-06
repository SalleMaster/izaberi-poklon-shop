import { Skeleton } from '@/components/ui/skeleton'
import { ProductWithRelations } from '@/data/services/products'
import ProductDetailsPrice from '../product-details-price/ProductDetailsPrice'
import ProductDetailsPriceTable from '../product-details-price-table/ProductDetailsPriceTable'
import { ProductDetailsForm } from '../product-details-form/ProductDetailsForm'
import ProductDetailsInfo from '../product-details-info/ProductDetailsInfo'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { User as UserType } from 'better-auth'
import Link from 'next/link'
import clsx from 'clsx'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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

      <p className='text-sm'> Šifra: {product.code}</p>

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
        {isAvailable && user ? <ProductDetailsForm product={product} /> : null}

        {!isAvailable ? (
          <NotificationAlert
            title='Obaveštenje:'
            description='Ovaj proizvod trenutno nije dostupan za poručivanje.'
            className='mt-10'
          />
        ) : null}

        {!user ? (
          <>
            <NotificationAlert
              title='Obaveštenje:'
              description='Morate biti ulogovani da biste poručili proizvod.'
              className='mt-10'
            />
            <div className='flex'>
              <Link
                href={`/auth/signin?callbackUrl=/pokloni/${product.id}`}
                className={clsx(
                  buttonVariants({ variant: 'default' }),
                  'ml-auto'
                )}
              >
                Prijava / Registracija
              </Link>
            </div>
          </>
        ) : null}

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
    <div className='h-auto w-full aspect-square'>
      <Skeleton className='h-auto w-full rounded-xl aspect-square' />
    </div>
  )
}
