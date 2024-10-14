import {
  imageListSchemaOptional,
  imageListSchemaRequired,
} from '@/lib/validation'
import { z } from 'zod'

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
      .min(0.01, 'Cena mora biti veća od nule')
      .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
        message:
          'Cena mora biti ceo broj ili decimalni broj sa najviše dve decimale',
      })
  ),
  discount: z.string().optional(),
  material: z.string().trim().min(1, 'Polje je neophodno'),
  dimensions: z.string().trim().min(1, 'Polje je neophodno'),
  personalization: z.string().trim().min(1, 'Polje je neophodno'),
  description: z.string().trim().min(1, 'Polje je neophodno'),
  coverImage: imageListSchemaRequired,
  images: imageListSchemaOptional,
})

export const editProductSchema = productSchema.extend({
  coverImage: imageListSchemaOptional,
  images: imageListSchemaOptional,
})

export type ProductValues = z.infer<typeof productSchema>
