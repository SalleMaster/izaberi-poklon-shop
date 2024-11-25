import { Separator } from '@/components/ui/separator'
import { calculatePrice } from '@/lib/price'
import { PriceRange, Discount } from '@prisma/client'

type Props = {
  discount: Discount | null
  priceTable: PriceRange[]
}

export default function ProductDetailsPriceTable({
  priceTable,
  discount,
}: Props) {
  console.log(priceTable)

  const priceTableWithPrice = priceTable.map((priceRange) => {
    return {
      ...priceRange,
      forrmatedFinalPrice: calculatePrice({
        discount,
        priceTable: [priceRange],
      }).formatedFinalPrice,
    }
  })

  return (
    <div>
      <p>Cena po komadu u odnosu na količinu:</p>
      <div>
        {priceTableWithPrice.map((priceRange) => (
          <div key={priceRange.id}>
            <p className='flex justify-between' key={priceRange.id}>
              <span>
                {priceRange.to === 5000
                  ? `${priceRange.from}+`
                  : `${priceRange.from} - ${priceRange.to}`}
              </span>
              <span>{priceRange.forrmatedFinalPrice}</span>
            </p>
            <Separator className='my-1' />
          </div>
        ))}
      </div>
    </div>
  )
}
