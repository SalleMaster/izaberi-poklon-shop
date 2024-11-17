import { generateQuantityOptions } from './product-utils'

export const fallbackImageURL = `${process.env.AWS_BUCKET_URL}/fallback-image.png`

export const quantityOptions = generateQuantityOptions({ min: 1, max: 500 })
export const priceTableQuantityOptions = generateQuantityOptions({
  min: 10,
  max: 500,
})
