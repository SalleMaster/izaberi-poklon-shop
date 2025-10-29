import { createAuthClient } from 'better-auth/react'
import { adminClient, magicLinkClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  plugins: [adminClient(), magicLinkClient()],
})

// export const authClient = createAuthClient({})

export const { signIn, signUp, useSession } = createAuthClient()
export type Session = typeof authClient.$Infer.Session
export type UserType = Session['user']
