import { z } from 'zod'
import { FontType } from '@prisma/client'
import { imageListSchemaOptional } from '@/lib/validation'

export const textPersonalizationSchema = z.object({
  id: z.string().optional(),
  // originalId: z.string(),
  name: z.string().min(1, 'Polje je neophodno'),
  placeholder: z.string().min(1, 'Polje je neophodno'),
  value: z.string().min(1, 'Polje je neophodno'),
  // createdAt: z.date().optional(),
  // updatedAt: z.date().optional(),
  // productId: z.union([z.string(), z.null()]).optional(),
})

const imagePersonalizationSchema = z.object({
  id: z.string().optional(),
  // originalId: z.string(),
  name: z.string().min(1, 'Polje je neophodno'),
  images: imageListSchemaOptional,
  min: z.number().min(0, 'Broj slika ne može biti manji od nule'),
  // min: z.preprocess(
  //   (val) => Number(val),
  //   z
  //     .number({ invalid_type_error: 'Polje mora biti broj' })
  //     .int()
  //     .min(0, 'Broj slika ne može biti manji od nule')
  // ),
  // createdAt: z.date().optional(),
  // updatedAt: z.date().optional(),
  // productId: z.union([z.string(), z.null()]).optional(),
})

// Product details schema
export const productDetailsSchema = z.object({
  productId: z.string().min(1, 'Polje je neophodno'),
  quantity: z.preprocess(
    (val) => (typeof val === 'string' ? parseFloat(val) : val),
    z
      .number()
      .min(0, 'Polje je neophodno')
      .refine((val) => Number.isInteger(val), {
        message: 'Polje mora biti ceo broj',
      })
  ),
  fontType: z.enum([FontType.latin, FontType.cyrillic]),
  textPersonalizations: z.array(textPersonalizationSchema).optional(),
  imagePersonalizations: z.array(imagePersonalizationSchema).optional(),
})

export type ProductDetailsValues = z.infer<typeof productDetailsSchema>
