import { z } from 'zod'

const magicLinkSchema = z.object({
  email: z.email({ message: 'Molimo unesite validnu email adresu' }),
  callbackUrl: z.string().optional(),
})

type MagicLinkSchemaValues = z.infer<typeof magicLinkSchema>

export { magicLinkSchema, type MagicLinkSchemaValues }
