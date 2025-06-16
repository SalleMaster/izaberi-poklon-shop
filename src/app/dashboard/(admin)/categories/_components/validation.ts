import {
  imageListSchemaOptional,
  imageListSchemaRequired,
} from '@/lib/validation'
// import { z } from 'zod'
import { z } from 'zod/v4'

// Category schema
export const categorySchema = z.object({
  name: z.string().trim().min(1, 'Polje je neophodno'),
  active: z.boolean(),
  special: z.boolean(),
  image: imageListSchemaRequired,
})

export const editCategorySchema = categorySchema.extend({
  image: imageListSchemaOptional,
})

export type CategoryValues = z.infer<typeof editCategorySchema>
