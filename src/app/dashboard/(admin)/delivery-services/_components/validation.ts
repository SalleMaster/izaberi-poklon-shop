import { pdfListSchemaOptional } from '@/lib/validation'
import { z } from 'zod'

// Category schema
export const deliveryServiceSchema = z.object({
  name: z.string().trim().min(1, 'Polje je neophodno'),
  link: z.string().trim().url('Polje mora biti validan URL'),
  active: z.boolean(),
  pdf: pdfListSchemaOptional,
})

export type DeliveryServiceValues = z.infer<typeof deliveryServiceSchema>
