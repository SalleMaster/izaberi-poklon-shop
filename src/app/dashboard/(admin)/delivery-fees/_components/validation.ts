import { z } from 'zod'

// Delivery fee schema
export const deliveryFeeSchema = z.object({
  name: z.string().trim().min(1, 'Polje je neophodno'),
  fee: z.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    z
      .number()
      .min(0, 'Polje je neophodno')
      .refine((val) => Number.isInteger(val), {
        message: 'Polje mora biti ceo broj',
      })
  ),
})

export type DeliveryFeeValues = z.infer<typeof deliveryFeeSchema>
