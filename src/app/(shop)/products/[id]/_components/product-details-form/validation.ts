import { z } from 'zod'

// Product details schema
export const productDetailsSchema = z.object({
  productId: z.string().min(1, 'Polje je neophodno'),
  quantity: z.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    z
      .number()
      .min(0, 'Polje je neophodno')
      .refine((val) => Number.isInteger(val), {
        message: 'Polje mora biti ceo broj',
      })
  ),
})

export type ProductDetailsValues = z.infer<typeof productDetailsSchema>
