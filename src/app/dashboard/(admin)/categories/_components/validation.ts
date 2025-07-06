import {
  imageListSchemaOptional,
  imageListSchemaRequired,
} from '@/lib/validation'
import { z } from 'zod'

// Category schema
export const categorySchema = z.object({
  name: z.string().trim().min(1, 'Polje je neophodno'),
  active: z.boolean(),
  special: z.boolean(),
  position: z.number().int().min(1, 'Polje mora biti veće ili jednako 1'),
  image: imageListSchemaRequired,
})

export const editCategorySchema = categorySchema.extend({
  image: imageListSchemaOptional,
})

export type CategoryValues = z.infer<typeof categorySchema>
