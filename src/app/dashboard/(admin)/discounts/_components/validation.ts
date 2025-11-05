import { z } from 'zod'

// Discount schema
export const discountSchema = z.object({
  name: z.string().trim().min(1, 'Polje je neophodno'),
  percentage: z.coerce
    .number<number>()
    .min(0, 'Polje je neophodno')
    .max(100, 'Polje mora biti manje ili jednako 100')
    .refine((val) => Number.isInteger(val), {
      message: 'Polje mora biti ceo broj', // Ensure the number is an integer
    }),
  active: z.boolean(),
})

export type DiscountValues = z.infer<typeof discountSchema>
