import { ProductWithCoverImageType } from '@/data/services/ratings'
import { fallbackImageURL } from '@/lib/consts'
import Image from 'next/image'
import Link from 'next/link'

type RatingProductInfoProps = {
  product: ProductWithCoverImageType
}

export function RatingProductInfo({ product }: RatingProductInfoProps) {
  return (
    <Link href={`/pokloni/${product.id}`} className='text-center'>
      {product.coverImage && (
        <Image
          src={product.coverImage?.url || fallbackImageURL}
          alt={product.name}
          width={80}
          height={80}
          priority
          className='mx-auto'
        />
      )}
    </Link>
  )
}
