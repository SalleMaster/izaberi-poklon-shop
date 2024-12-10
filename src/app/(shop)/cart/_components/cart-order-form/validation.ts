import { OrderDeliveryType, OrderPaymentType } from '@prisma/client'
import { z } from 'zod'

const pickupSchema = {
  pickupName: z
    .string()
    .trim()
    .max(255, 'Ime i prezime ne može biti duže od 255 karaktera')
    .optional(),
  pickupPhone: z
    .string()
    .trim()
    .max(255, 'Broj telefona ne može biti duži od 255 karaktera')
    .optional(),
  pickupEmail: z
    .string()
    .trim()
    .max(255, 'Email ne može biti duži od 255 karaktera')
    .optional(),
}

// Cart order schema
export const cartOrderSchema = z
  .object({
    deliveryType: z.enum([
      OrderDeliveryType.delivery,
      OrderDeliveryType.pickup,
    ]),
    paymentType: z.enum([OrderPaymentType.onDelivery, OrderPaymentType.card]),
    selectedDeliveryAddressId: z.string().optional(),
    selectedBillingAddressId: z.string().optional(),
    selectedDeliveryServiceId: z.string().optional(),
    pickupName: pickupSchema.pickupName,
    pickupPhone: pickupSchema.pickupPhone,
    pickupEmail: pickupSchema.pickupEmail,
  })
  .superRefine((data, ctx) => {
    if (data.deliveryType === OrderDeliveryType.pickup) {
      if (!data.pickupName || data.pickupName.trim().length < 1) {
        ctx.addIssue({
          path: ['pickupName'],
          message: 'Ime i prezime je obavezno',
          code: z.ZodIssueCode.custom,
        })
      }
      if (!data.pickupPhone || data.pickupPhone.trim().length < 1) {
        ctx.addIssue({
          path: ['pickupPhone'],
          message: 'Broj telefona je obavezan',
          code: z.ZodIssueCode.custom,
        })
      }
      if (!data.pickupEmail || data.pickupEmail.trim().length < 1) {
        ctx.addIssue({
          path: ['pickupEmail'],
          message: 'Email je obavezan',
          code: z.ZodIssueCode.custom,
        })
      } else if (!z.string().email().safeParse(data.pickupEmail).success) {
        ctx.addIssue({
          path: ['pickupEmail'],
          message: 'Email mora biti validan',
          code: z.ZodIssueCode.custom,
        })
      }
    } else if (data.deliveryType === OrderDeliveryType.delivery) {
      if (
        !data.selectedDeliveryAddressId ||
        data.selectedDeliveryAddressId.trim().length < 1
      ) {
        console.log('add issue delivery')
        ctx.addIssue({
          path: ['selectedDeliveryAddressId'],
          message: 'Adresa dostave je obavezna',
          code: z.ZodIssueCode.custom,
        })
      }
      if (
        !data.selectedBillingAddressId ||
        data.selectedBillingAddressId.trim().length < 1
      ) {
        ctx.addIssue({
          path: ['selectedBillingAddressId'],
          message: 'Adresa računa je obavezna',
          code: z.ZodIssueCode.custom,
        })
      }
      if (
        !data.selectedDeliveryServiceId ||
        data.selectedDeliveryServiceId.trim().length < 1
      ) {
        ctx.addIssue({
          path: ['selectedDeliveryServiceId'],
          message: 'Kurirska služba je obavezna',
          code: z.ZodIssueCode.custom,
        })
      }
    }
  })

export type CartOrderValues = z.infer<typeof cartOrderSchema>
