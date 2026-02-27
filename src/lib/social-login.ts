import { authClient } from '@/lib/auth-client'

export const signinGoogle = async ({
  callbackUrl,
}: {
  callbackUrl?: string
}) => {
  const res = await authClient.signIn.social({
    provider: 'google',
    callbackURL: callbackUrl,
  })
  return res
}
