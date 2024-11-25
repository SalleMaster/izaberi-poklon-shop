import 'server-only'

import { Discount, PriceRange } from '@prisma/client'
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

  const formatedPrice = priceFormatter(price)
  const formatedFinalPrice = priceFormatter(finalPrice)
  const formatedSavings = priceFormatter(savings)

  return {
    finalPrice,
    formatedPrice,
    formatedFinalPrice,
    formatedSavings,
  }
}
