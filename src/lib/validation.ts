import { z } from 'zod'

// File schema
export const fileSchema = z.instanceof(File, { message: 'Polje je neophodno' })

// Image schema
export const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith('image/')
)

export const imageListSchemaRequired = z
  .instanceof(globalThis.FileList, { message: 'Slika je neophodna' })
  .refine(
    (fileList) =>
      fileList.length > 0 &&
      Array.from(fileList).every((file) => imageSchema.safeParse(file).success),
    { message: 'Slika je neophodna i mora biti validan fajl tip' }
  )

export const imageListSchemaOptional = z.union([
  z.undefined(),
  z
    .instanceof(globalThis.FileList, { message: 'Slika je neophodna' })
    .refine(
      (fileList) =>
        Array.from(fileList).every(
          (file) => imageSchema.safeParse(file).success
        ),
      { message: 'Slika je neophodna i mora biti validan fajl tip' }
    ),
])

// User profile schema
export const updateProfileSchema = z.object({
  name: z.string().trim().min(1, 'Cannot be empty'),
})

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>

// Create post schema
export const createPostSchema = z.object({
  title: z.string().trim().min(1, 'Cannot be empty'),
  content: z.string().trim().min(1, 'Cannot be empty'),
  published: z.boolean(),
  image: imageListSchemaRequired,
})

export type CreatePostValues = z.infer<typeof createPostSchema>

// Edit post schema
export const editPostSchema = z.object({
  title: z.string().trim().min(1, 'Cannot be empty'),
  content: z.string().trim().min(1, 'Cannot be empty'),
  published: z.boolean(),
  image: imageListSchemaOptional,
})
