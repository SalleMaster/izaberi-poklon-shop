import 'server-only'

import { Discount, PriceRange } from '@/generated/prisma'
import { priceFormatter } from './format'

type Props = {
  discount: Discount | null
  priceTable: PriceRange[]
}

export const calculatePrice = ({ discount, priceTable }: Props) => {
  const price = priceTable[0].price

  const finalPrice = discount?.active
    ? Math.floor(price - (price * discount.percentage) / 100)
    : Math.floor(price)

  const savings = discount?.active ? price - finalPrice : 0

  const formattedPrice = priceFormatter(price)
  const formattedFinalPrice = priceFormatter(finalPrice)
  const formattedSavings = priceFormatter(savings)

  return {
    finalPrice,
    formattedPrice,
    formattedFinalPrice,
    formattedSavings,
  }
}
