import { priceFormatter } from '@/lib/format'
import { Product, Discount, Media, PriceRange } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import getUserRole from '@/lib/userRole'
import { Skeleton } from '@/components/ui/skeleton'

type ProductWithRelations = Product & {
  discount: Discount | null
  coverImage: Media | null
  priceTable: PriceRange[]
}

type ProductCardProps = {
  product: ProductWithRelations
}

export default async function ProductCard({ product }: ProductCardProps) {
  const userRole = await getUserRole()

  const discount = product.discount
  const price = product.priceTable[0].price

  const finalPrice = discount?.active
    ? Math.floor(price - (price * discount.percentage) / 100)
    : Math.floor(price)

  const savings = discount?.active ? price - finalPrice : 0

  const formatedPrice = priceFormatter(price)
  const formatedFinalPrice = priceFormatter(finalPrice)
  const formatedSavings = priceFormatter(savings)

  return (
    <div className='relative flex flex-col bg-white p-4 rounded-md shadow-md text-center'>
      <Link href={`/pokloni/${product.id}`}>
        {discount?.active && (
          <Badge className='absolute top-4 right-4 bg-secondary text-secondary-foreground'>
            -{discount.percentage}%
          </Badge>
        )}
        {product.coverImage && (
          <Image
            src={product.coverImage.url}
            alt={product.coverImage.name}
            width={300}
            height={300}
            priority
            className='mx-auto'
          />
        )}

        <h3 className='text-lg font-bold'>{product.name}</h3>
        {discount?.active && (
          <p className='text-muted-foreground'>
            <span className='line-through'>{formatedPrice}</span>
          </p>
        )}
        <p className='text-xl font-bold'>
          {product.priceTable.length > 1 && 'Od '} {formatedFinalPrice}
        </p>
        {discount?.active && (
          <p className='text-muted-foreground'>Ušteda {formatedSavings}</p>
        )}
      </Link>

      {userRole === 'admin' && (
        <Button className='ml-auto mt-auto' asChild>
          <Link href={`/admin/proizvodi/${product.id}/edit`}>Edit</Link>
        </Button>
      )}
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
