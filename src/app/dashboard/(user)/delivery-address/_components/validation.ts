import { isValidSerbianPhoneNumber } from '@/lib/validation'
import { DeliveryAddressType } from '@/generated/prisma/enums'
import { z } from 'zod'

// Delivery address schema
export const deliveryAddressSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Ime i prezime je obavezno')
    .max(255, 'Ime i prezime ne može biti duže od 255 karaktera'),
  address: z
    .string()
    .trim()
    .min(1, 'Adresa je obavezna')
    .max(255, 'Adresa ne može biti duža od 255 karaktera'),
  city: z
    .string()
    .trim()
    .min(1, 'Grad je obavezan')
    .max(255, 'Grad ne može biti duži od 255 karaktera'),
  zip: z
    .string()
    .trim()
    .min(1, 'Poštanski broj je obavezan')
    .max(255, 'Poštanski broj ne može biti duži od 255 karaktera'),
  phone: z
    .string()
    .trim()
    .min(1, 'Broj telefona je obavezan')
    .max(255, 'Broj telefona ne može biti duži od 255 karaktera')
    .refine(isValidSerbianPhoneNumber, 'Broj telefona mora biti validan'),
  email: z
    .string()
    .trim()
    .min(1, 'Email je obavezan')
    .max(255, 'Email ne može biti duži od 255 karaktera')
    .email('Email mora biti validan'),
  note: z.string().max(255, 'Napomena ne može biti duža od 255 karaktera'),
  type: z.enum([DeliveryAddressType.delivery, DeliveryAddressType.billing]),
})

export type DeliveryAddressValues = z.infer<typeof deliveryAddressSchema>
