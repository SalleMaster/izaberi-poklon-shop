import { z } from 'zod'
import { OrderStatusType } from '@/generated/prisma'

// Order status schema
export const orderStatusSchema = z
  .object({
    status: z.enum([
      OrderStatusType.pending,
      OrderStatusType.processing,
      OrderStatusType.shipped,
      OrderStatusType.readyForPickup,
      OrderStatusType.delivered,
      OrderStatusType.canceled,
      OrderStatusType.draft,
    ]),
    shippingNumber: z.string().optional(),
  })
  .refine(
    (data) => {
      // If status is 'shipped', shippingNumber is required
      if (data.status === OrderStatusType.shipped) {
        return data.shippingNumber && data.shippingNumber.trim().length > 0
      }
      return true
    },
    {
      message: 'Broj za praćenje je obavezan kada je status "Poslata".',
      path: ['shippingNumber'],
    },
  )

export type OrderStatusValues = z.infer<typeof orderStatusSchema>

// Order delete images schema
export const orderDeleteImagesSchema = z.object({
  id: z.string(),
  keys: z.array(z.string()),
})

export type OrderDeleteImagesValues = z.infer<typeof orderDeleteImagesSchema>
