import { z } from 'zod'

// File schema
const fileSchema = z.instanceof(File, { message: 'Required' })

// Image schema
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith('image/')
)

const imageListSchemaRequired = z
  .instanceof(globalThis.FileList, { message: 'Required' })
  .refine(
    (fileList) =>
      fileList.length > 0 &&
      Array.from(fileList).every((file) => imageSchema.safeParse(file).success),
    { message: 'Image required and must be a valid image file' }
  )

const imageListSchemaOptional = z
  .instanceof(globalThis.FileList, { message: 'Required' })
  .refine(
    (fileList) =>
      Array.from(fileList).every((file) => imageSchema.safeParse(file).success),
    { message: 'Image must be a valid image file' }
  )

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
