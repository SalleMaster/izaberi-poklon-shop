import { z } from 'zod'

// Cart items schema
export const cartItemSchema = z.object({
  id: z.string(),
  quantity: z.coerce
    .number<number>()
    .min(0, 'Polje je neophodno')
    .refine((val) => Number.isInteger(val), {
      message: 'Polje mora biti ceo broj',
    }),
})

export type CartItemValues = z.infer<typeof cartItemSchema>
