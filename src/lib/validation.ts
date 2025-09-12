import { z } from 'zod'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

// Custom validation function for Serbian phone numbers
export const isValidSerbianPhoneNumber = (phone: string) => {
  const phoneNumber = parsePhoneNumberFromString(phone, 'RS')
  return phoneNumber?.isValid() || false
}

export const imageFileTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
]
export const pdfFileTypes = ['application/pdf']

// File schema
export const fileSchema = z.instanceof(File, { message: 'Polje je neophodno' })

// Image schema
export const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith('image/')
)

// PDF schema
export const pdfSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type === 'application/pdf',
  { message: 'Fajl mora biti PDF' }
)

export const imageListSchemaRequired = z
  .union([
    z.instanceof(globalThis.FileList, { message: 'Slika je neophodna' }),
    z.null(),
  ])
  .refine(
    (fileList) =>
      fileList !== null &&
      fileList.length > 0 &&
      Array.from(fileList).every((file) => imageSchema.safeParse(file).success),
    { message: 'Slika je neophodna i mora biti validan fajl tip' }
  )

export const imageListSchemaOptional = z.union([
  z.null(),
  z
    .instanceof(globalThis.FileList, { message: 'Slika je neophodna' })
    .refine(
      (fileList) =>
        Array.from(fileList).every(
          (file) => imageSchema.safeParse(file).success
        ),
      { message: 'Slika mora biti validan fajl tip' }
    ),
])

export const pdfListSchemaOptional = z.union([
  z.undefined(),
  z.null(),
  z
    .instanceof(globalThis.FileList, { message: 'PDF je neophodan' })
    .refine(
      (fileList) =>
        Array.from(fileList).every((file) => pdfSchema.safeParse(file).success),
      { message: 'Svi fajlovi moraju biti validni PDF fajlovi' }
    ),
])

// User profile schema
export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, 'Cannot be empty'),
})

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>
