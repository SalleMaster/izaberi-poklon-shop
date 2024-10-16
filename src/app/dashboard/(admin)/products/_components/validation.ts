import {
  imageListSchemaOptional,
  imageListSchemaRequired,
} from '@/lib/validation'
import { z } from 'zod'

export const textPersonalizationFieldSchema = z.object({
  id: z.string().optional(),
  originalId: z.string(),
  name: z.string().min(1, 'Polje je neophodno'),
  placeholder: z.string().min(1, 'Polje je neophodno'),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  productId: z.union([z.string(), z.null()]).optional(),
})

const imagePersonalizationFieldSchema = z.object({
  id: z.string().optional(),
  originalId: z.string(),
  name: z.string().min(1, 'Polje je neophodno'),
  min: z.preprocess(
    (val) => Number(val),
    z
      .number({ invalid_type_error: 'Polje mora biti broj' })
      .int()
      .min(0, 'Broj slika ne može biti manji od nule')
  ),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  productId: z.union([z.string(), z.null()]).optional(),
})

// Category schema
export const productSchema = z.object({
  name: z.string().trim().min(1, 'Polje je neophodno'),
  categories: z
    .array(z.string().min(1, 'Polje je neophodno'))
    .nonempty('Polje je neophodno'),
  code: z.string().trim().min(1, 'Polje je neophodno'),
  price: z.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    z
      .number({ invalid_type_error: 'Cena mora biti broj' })
      .int('Cena mora biti ceo broj')
      .min(1, 'Cena mora biti veća od nule')
  ),
  discount: z.string().optional(),
  material: z.string().trim().min(1, 'Polje je neophodno'),
  dimensions: z.string().trim().min(1, 'Polje je neophodno'),
  personalization: z.string().trim().min(1, 'Polje je neophodno'),
  description: z.string().trim().min(1, 'Polje je neophodno'),
  coverImage: imageListSchemaRequired,
  images: imageListSchemaOptional,
  imagePersonalizationFields: z
    .array(imagePersonalizationFieldSchema)
    .optional(),
  textPersonalizationFields: z.array(textPersonalizationFieldSchema).optional(),
})

export const editProductSchema = productSchema.extend({
  coverImage: imageListSchemaOptional,
  images: imageListSchemaOptional,
})

export type ProductValues = z.infer<typeof productSchema>
