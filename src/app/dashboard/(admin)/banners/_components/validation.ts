import {
  imageListSchemaOptional,
  imageListSchemaRequired,
} from '@/lib/validation'
import { z } from 'zod'

// Banner schema
export const bannerSchema = z.object({
  name: z.string().trim().min(1, 'Polje je neophodno'),
  link: z.string().trim().url('Polje mora biti validan URL'),
  image: imageListSchemaRequired,
  active: z.boolean(),
})

export const editBannerSchema = bannerSchema.extend({
  image: imageListSchemaOptional,
})

export type BannerValues = z.infer<typeof bannerSchema>
