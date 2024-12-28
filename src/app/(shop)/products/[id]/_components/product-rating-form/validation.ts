import { z } from 'zod'

// Product rating schema
export const productRatingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Molimo unesite ime')
    .max(255, 'Ime ne može biti duže od 255 karaktera'),
  score: z
    .number()
    .int()
    .min(1, 'Ocena mora biti između 1 i 5')
    .max(5, 'Ocena mora biti između 1 i 5'),
  comment: z
    .string()
    .trim()
    .min(1, 'Molimo unesite komentar')
    .max(500, 'Komentar ne može biti duži od 500 karaktera'),
})

export type ProductRatingValues = z.infer<typeof productRatingSchema>
