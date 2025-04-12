import { z } from 'zod'
import { UserRoleType } from '@prisma/client'

export const userSchema = z.object({
  id: z.string(),
  role: z.nativeEnum(UserRoleType),
})

export type UserValues = z.infer<typeof userSchema>
