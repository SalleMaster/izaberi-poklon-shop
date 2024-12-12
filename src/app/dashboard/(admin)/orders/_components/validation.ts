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
  ]),
})

export type OrderStatusValues = z.infer<typeof orderStatusSchema>
