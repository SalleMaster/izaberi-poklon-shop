import { z } from 'zod'

// Cart coupon schema
export const cartCouponSchema = z.object({
  coupon: z.string().trim().min(1, 'Unesite kupon kod.'),
})

export type CartCouponValues = z.infer<typeof cartCouponSchema>
