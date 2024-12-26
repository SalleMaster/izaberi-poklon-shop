import { z } from 'zod'
import { isValidSerbianPhoneNumber } from '@/lib/validation'

// Profile schema
export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Ime i prezime je obavezno')
    .max(255, 'Ime i prezime ne može biti duže od 255 karaktera'),
  phone: z
    .string()
    .trim()
    .max(255, 'Broj telefona ne može biti duži od 255 karaktera')
    .optional()
    .refine(
      (value) => !value || isValidSerbianPhoneNumber(value),
      'Broj telefona mora biti validan'
    ),
  email: z
    .string()
    .trim()
    .min(1, 'Email je obavezan')
    .max(255, 'Email ne može biti duži od 255 karaktera')
    .email('Email mora biti validan'),
})

export type ProfileValues = z.infer<typeof profileSchema>
