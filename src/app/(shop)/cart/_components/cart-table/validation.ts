import { z } from 'zod/v4'

// Cart items schema
// export const cartItemSchema = z.object({
//   id: z.string(),
//   quantity: z.preprocess(
//     (val) => (typeof val === 'string' ? parseFloat(val) : val),
//     z
//       .number()
//       .min(0, 'Polje je neophodno')
//       .refine((val) => Number.isInteger(val), {
//         message: 'Polje mora biti ceo broj',
//       })
//   ),
// })
export const cartItemSchema = z.object({
  id: z.string(),
  quantity: z.coerce
    .number()
    .int('Polje mora biti ceo broj')
    .min(0, 'Polje je neophodno'),
})

export type CartItemValues = z.infer<typeof cartItemSchema>
