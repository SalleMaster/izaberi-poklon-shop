import {
  imageListSchemaOptional,
  imageListSchemaRequired,
} from '@/lib/validation'
import { DeliveryType } from '@prisma/client'
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

const imagePersonalizationFieldSchema = z
  .object({
    id: z.string().optional(),
    originalId: z.string(),
    name: z.string().min(1, 'Polje je neophodno'),
    min: z.preprocess(
      (val) => Number(val),
      z
        .number({ invalid_type_error: 'Polje mora biti broj' })
        .int()
        .min(0, 'Minimalni broj slika ne može biti manji od nule')
    ),
    max: z.preprocess(
      (val) => Number(val),
      z
        .number({ invalid_type_error: 'Polje mora biti broj' })
        .int()
        .min(1, 'Maksimalni broj slika ne može biti manji od 1')
    ),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    productId: z.union([z.string(), z.null()]).optional(),
  })
  .superRefine((data, ctx) => {
    // Check if max is smaller than min
    if (data.max < data.min) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Maksimalni broj slika ne može biti manji od minimalnog broja',
        path: ['max'],
      })
    }
  })

const priceTableSchema = z.array(
  z.object({
    from: z.preprocess(
      (val) => (typeof val === 'string' ? parseFloat(val) : val),
      z
        .number({ invalid_type_error: 'Polje mora biti broj' })
        .int('Polje mora biti ceo broj')
        .min(1, 'Polje mora biti veće od nule')
    ),
    to: z.preprocess(
      (val) => (typeof val === 'string' ? parseFloat(val) : val),
      z
        .number({ invalid_type_error: 'Polje mora biti broj' })
        .int('Polje mora biti ceo broj')
        .min(1, 'Polje mora biti veće od nule')
    ),
    price: z.preprocess(
      (val) => (typeof val === 'string' ? parseFloat(val) : val),
      z
        .number({ invalid_type_error: 'Cena mora biti broj' })
        .int('Cena mora biti ceo broj')
        .min(1, 'Cena mora biti veće od nule')
    ),
    deliveryFeeId: z.string().min(1, 'Polje je neophodno'),
  })
)

// Product schema
export const productSchema = z.object({
  name: z.string().trim().min(1, 'Polje je neophodno'),
  categories: z
    .array(z.string().min(1, 'Polje je neophodno'))
    .nonempty('Polje je neophodno'),
  code: z.string().trim().min(1, 'Polje je neophodno'),
  priceTable: priceTableSchema,
  discount: z.string().optional(),
  material: z.string().trim().min(1, 'Polje je neophodno'),
  dimensions: z.string().trim().min(1, 'Polje je neophodno'),
  personalization: z.string().trim().min(1, 'Polje je neophodno'),
  description: z.string().trim().min(1, 'Polje je neophodno'),
  delivery: z.enum([DeliveryType.fast, DeliveryType.slow]),
  inStock: z.boolean().optional(),
  trending: z.boolean().optional(),
  packageOption: z.string().optional(),
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
