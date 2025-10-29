import { z } from 'zod'
import { DiscountType } from '@/generated/prisma'

// Coupon schema
export const couponSchema = z
  .object({
    name: z.string().trim().min(1, 'Polje je neophodno'),
    code: z.string().trim().min(1, 'Polje je neophodno'),
    discountType: z.enum([DiscountType.percentage, DiscountType.fixed]),
    discount: z
      .number()
      .min(0, 'Polje je neophodno')
      .refine((val) => Number.isInteger(val), {
        message: 'Polje mora biti ceo broj',
      }),
    cartValue: z
      .number()
      .min(0, 'Polje je neophodno')
      .refine((val) => Number.isInteger(val), {
        message: 'Polje mora biti ceo broj',
      }),
    available: z
      .number()
      .min(0, 'Polje je neophodno')
      .refine((val) => Number.isInteger(val), {
        message: 'Polje mora biti ceo broj',
      }),
    used: z
      .number()
      .min(0, 'Polje je neophodno')
      .refine((val) => Number.isInteger(val), {
        message: 'Polje mora biti ceo broj',
      }),
    active: z.boolean(),
    expiresAt: z.date(),
  })
  .refine(
    (data) => {
      if (data.discountType === 'percentage' && data.discount > 100) {
        return false
      }
      return true
    },
    { message: 'Polje mora biti manje ili jednako 100', path: ['discount'] }
  )

export type CouponValues = z.infer<typeof couponSchema>
