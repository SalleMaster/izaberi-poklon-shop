import { z } from 'zod'

// Package schema
export const packageOptionSchema = z.object({
  name: z.string().trim().min(1, 'Polje je neophodno'),
  description: z.string().trim().min(1, 'Polje je neophodno'),
  price: z
    .number()
    .min(0, 'Polje je neophodno')
    .refine((val) => Number.isInteger(val), {
      message: 'Polje mora biti ceo broj',
    }),
})

export type PackageOptionValues = z.infer<typeof packageOptionSchema>
