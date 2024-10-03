import { z } from 'zod'

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
})

export type CreatePostValues = z.infer<typeof createPostSchema>
