import { Badge } from '@/components/ui/badge'
import { Discount, PriceRange } from '@/generated/prisma/client'

type Props = {
  discount: Discount | null
  formattedPrice: string
  formattedFinalPrice: string
  formattedSavings: string
  priceTable: PriceRange[]
}

export default function ProductDetailsPrice({
  discount,
  formattedPrice,
  formattedFinalPrice,
  formattedSavings,
  priceTable,
}: Props) {
  return (
    <div className='flex gap-2 items-center'>
      <p>Cena:</p>
      <div>
        {discount?.active && (
          <div className='flex gap-2'>
            <p className='text-muted-foreground'>
              <span className='line-through'>{formattedPrice}</span>
            </p>
            <Badge className='bg-secondary text-secondary-foreground'>
              -{discount.percentage}%
            </Badge>
          </div>
        )}
        <p className='text-3xl font-bold'>
          {priceTable.length > 1 && 'Od '} {formattedFinalPrice}
        </p>
        {discount?.active && (
          <p className='text-muted-foreground'>Ušteda {formattedSavings}</p>
        )}
      </div>
    </div>
  )
}
