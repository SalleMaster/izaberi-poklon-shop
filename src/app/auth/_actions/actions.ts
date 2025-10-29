'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/lib/auth'
import { MagicLinkSchemaValues } from '../signin/_components/validation'
import getSession from '@/lib/getSession'
import prisma from '@/lib/db'
import { headers } from 'next/headers'

export async function signInWithMagicLink(values: MagicLinkSchemaValues) {
  const { email, callbackUrl } = values

  try {
    // const response = await auth.api.signInEmail({
    //   body: {
    //     email,
    //     password,
    //   },
    // })

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
    // revalidatePath('/dashboard')
    // revalidatePath('/invite')
    revalidatePath('/auth/signin')
  }
}

// export async function signInWithEmail(values: SignInWithEmailSchemaValues) {
//   const { email, password } = values

//   try {
//     const response = await auth.api.signInEmail({
//       body: {
//         email,
//         password,
//       },
//     })

//     return {
//       status: 'success',
//       message: 'Signed in successfully',
//       data: response,
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       return {
//         status: 'fail',
//         message: error.message,
//       }
//     } else {
//       throw error
//     }
//   } finally {
//     revalidatePath('/dashboard')
//     revalidatePath('/invite')
//     revalidatePath('/signin')
//   }
// }

// export async function getLoggedInUserCallbackUrl() {
//   try {
//     const session = await getSession()

//     if (!session) {
//       return {
//         status: 'fail',
//         message: 'User is not logged in',
//         callbackUrl: '/signin',
//       }
//     }

//     if (session.user.role === 'admin') {
//       return {
//         status: 'success',
//         message: 'User is admin',
//         callbackUrl: '/dashboard',
//       }
//     }

//     const usersOrganization = await prisma.user.findUnique({
//       where: { id: session.user.id },
//       select: {
//         organization: true,
//       },
//     })

//     if (usersOrganization?.organization?.slug) {
//       return {
//         status: 'success',
//         message: 'Signed in successfully',
//         callbackUrl: `/${usersOrganization.organization.slug}/categories`,
//       }
//     }

//     return {
//       status: 'fail',
//       message: 'User does not belong to any organization',
//       callbackUrl: '/',
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       return {
//         status: 'fail',
//         message: error.message,
//         callbackUrl: '/signin',
//       }
//     } else {
//       throw error
//     }
//   }
// }
