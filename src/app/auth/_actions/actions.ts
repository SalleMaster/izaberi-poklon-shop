'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { MagicLinkSchemaValues } from '../signin/_components/validation'

export async function signInWithMagicLink(values: MagicLinkSchemaValues) {
  const { email, callbackUrl } = values

  try {
    const response = await auth.api.signInMagicLink({
      body: {
        email, // required
        name: 'my-name',
        callbackURL: callbackUrl,
        newUserCallbackURL: callbackUrl, // can be welcome page for new users
        errorCallbackURL: '/auth/error',
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    })

    return {
      status: 'success',
      message: 'Email za prijavu je poslat',
      data: response,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 'fail',
        message: error.message,
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/auth/signin')
  }
}
