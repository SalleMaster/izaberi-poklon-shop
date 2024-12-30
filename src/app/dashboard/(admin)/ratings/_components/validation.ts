import { z } from 'zod'
import { RatingStatusType } from '@prisma/client'

// Rating status schema
export const ratingStatusSchema = z.object({
  status: z.enum([
    RatingStatusType.pending,
    RatingStatusType.approved,
    RatingStatusType.rejected,
  ]),
})

export type RatingStatusValues = z.infer<typeof ratingStatusSchema>
