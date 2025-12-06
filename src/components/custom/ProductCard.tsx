import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ProductCardType } from '@/data/services/products'
import DynamicImage from '@/components/custom/DynamicImage'
import { Suspense } from 'react'
import EditProductButton from './EditProductButton'

type ProductCardProps = { product: ProductCardType }

export default async function ProductCard({ product }: ProductCardProps) {
  return (
    <div className='relative flex flex-col bg-white p-4 rounded-md shadow-md text-center h-full'>
      <Link href={`/pokloni/${product.id}`}>
        {product.discount?.active && (
          <Badge className='absolute top-4 right-4 bg-secondary text-secondary-foreground'>
            -{product.discount.percentage}%
          </Badge>
        )}
        {product.coverImage && (
          <DynamicImage
            src={product.coverImage.url}
            alt={product.coverImage.name}
            width={200}
            height={200}
            preload
            className='mx-auto'
          />
        )}

        <h3 className='text-lg font-bold'>{product.name}</h3>
        {product.discount?.active && (
          <p className='text-muted-foreground text-sm'>
            <span className='line-through'>{product.formattedPrice}</span>
          </p>
        )}
        <p className='text-xl font-bold'>
          {product.priceTable.length > 1 && 'Od '} {product.formattedFinalPrice}
        </p>
        {product.discount?.active && (
          <p className='text-muted-foreground text-sm'>
            Ušteda {product.formattedSavings}
          </p>
        )}
      </Link>

      <Suspense>
        <EditProductButton productId={product.id} />
      </Suspense>
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className='flex flex-col bg-white p-4 rounded-md shadow-md'>
      <Skeleton className='h-auto w-[100%] rounded-xl aspect-square mb-[8px]' />
      <div className='space-y-[12px]'>
        <Skeleton className='h-[24px] w-[100%]' />
        <Skeleton className='h-[24px] w-[100%]' />
        <Skeleton className='h-[24px] w-[100%]' />
      </div>
    </div>
  )
}
