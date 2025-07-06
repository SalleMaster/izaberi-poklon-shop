import {
  imageListSchemaOptional,
  imageListSchemaRequired,
} from '@/lib/validation'
import { z } from 'zod'

// Category schema
export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Naziv je neophodan')
    .max(100, 'Naziv ne može biti duži od 100 znakova'),
  active: z.boolean(),
  special: z.boolean(),
  position: z.number().int().min(1, 'Pozicija mora biti veća ili jednaka 1'),
  image: imageListSchemaRequired,
})

export const editCategorySchema = categorySchema.extend({
  image: imageListSchemaOptional,
})

export type CategoryValues = z.infer<typeof categorySchema>
