import { Badge } from '@/components/ui/badge'
import { Discount, PriceRange } from '@prisma/client'

type Props = {
  discount: Discount | null
  formatedPrice: string
  formatedFinalPrice: string
  formatedSavings: string
  priceTable: PriceRange[]
}

export default function ProductDetailsPrice({
  discount,
  formatedPrice,
  formatedFinalPrice,
  formatedSavings,
  priceTable,
}: Props) {
  return (
    <div className='flex gap-2 items-center'>
      <p>Cena:</p>
      <div>
        {discount?.active && (
          <div className='flex gap-2'>
            <p className='text-muted-foreground'>
              <span className='line-through'>{formatedPrice}</span>
            </p>
            <Badge className='bg-secondary text-secondary-foreground'>
              -{discount.percentage}%
            </Badge>
          </div>
        )}
        <p className='text-2xl font-bold'>
          {priceTable.length > 1 && 'Od '} {formatedFinalPrice}
        </p>
        {discount?.active && (
          <p className='text-muted-foreground'>Ušteda {formatedSavings}</p>
        )}
      </div>
    </div>
  )
}
