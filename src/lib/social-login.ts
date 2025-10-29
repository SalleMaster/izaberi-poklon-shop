import { authClient } from '@/lib/auth-client'

export const signinGoogle = async ({
  callbackUrl,
}: {
  callbackUrl?: string
}) => {
  const data = await authClient.signIn.social({
    provider: 'google',
    callbackURL: callbackUrl,
  })
  return data
}
