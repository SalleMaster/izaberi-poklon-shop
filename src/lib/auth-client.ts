import { createAuthClient } from 'better-auth/react'
import { adminClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  plugins: [adminClient()],
})

// export const authClient = createAuthClient({})

export const { signIn, signUp, useSession } = createAuthClient()
export type Session = typeof authClient.$Infer.Session
