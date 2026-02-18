import { z } from 'zod'
import { FontType } from '@/generated/prisma/enums'
import { imageListSchemaOptional } from '@/lib/validation'

export const textPersonalizationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Polje je neophodno'),
  placeholder: z.string().min(1, 'Polje je neophodno'),
  value: z.string().min(1, 'Polje je neophodno'),
})

const imagePersonalizationSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, 'Polje je neophodno'),
    images: imageListSchemaOptional,
    min: z.coerce
      .number<number>()
      .min(0, 'Broj slika ne može biti manji od nule'),
    max: z.coerce
      .number<number>()
      .min(1, 'Maksimalni broj slika ne može biti manji od 1')
      .optional(),
  })
  .refine(
    (data) => {
      if (data.min === 0 && !data.images) return true
      return data.images && data.images.length >= data.min
    },
    { message: 'Nedovoljan broj slika', path: ['images'] },
  )
  .superRefine((data, ctx) => {
    if (!data.max || !data.images) return

    if (data.images.length > data.max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Premašen maksimalni broj slika: ${data.max}`,
        path: ['images'],
      })
    }
  })

// Product details schema
export const productDetailsSchema = z.object({
  productId: z.string().min(1, 'Polje je neophodno'),
  quantity: z.coerce
    .number<number>()
    .min(0, 'Polje je neophodno')
    .refine((val) => Number.isInteger(val), {
      message: 'Polje mora biti ceo broj',
    }),
  fontType: z.enum([FontType.latin, FontType.cyrillic]),
  personalization: z.boolean(),
  packageOptionSelected: z.boolean(),
  textPersonalizations: z.array(textPersonalizationSchema).optional(),
  imagePersonalizations: z.array(imagePersonalizationSchema).optional(),
})

export type ProductDetailsValues = z.infer<typeof productDetailsSchema>
