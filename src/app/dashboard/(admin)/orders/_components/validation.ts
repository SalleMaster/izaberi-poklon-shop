import { z } from 'zod'
import { OrderStatusType } from '@prisma/client'

// Order status schema
export const orderStatusSchema = z.object({
  status: z.enum([
    OrderStatusType.pending,
    OrderStatusType.processing,
    OrderStatusType.shipped,
    OrderStatusType.delivered,
    OrderStatusType.canceled,
    OrderStatusType.draft,
  ]),
  shippingNumber: z.string().optional(),
})

export type OrderStatusValues = z.infer<typeof orderStatusSchema>

// Order delete images schema
export const orderDeleteImagesSchema = z.object({
  id: z.string(),
  keys: z.array(z.string()),
})

export type OrderDeleteImagesValues = z.infer<typeof orderDeleteImagesSchema>
