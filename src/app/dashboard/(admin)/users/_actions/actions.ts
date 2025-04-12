'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { userSchema, UserValues } from '../_components/validation'
import { adminActionGuard } from '@/lib/actionGuard'
import { ResponseStatus } from '@/lib/types'

export async function editUser(values: UserValues) {
  try {
    await adminActionGuard()

    const { role, id } = userSchema.parse(values)

    await prisma.user.update({
      where: { id },
      data: {
        role,
      },
    })

    return {
      status: ResponseStatus.success,
      message: 'Korisnik sačuvan.',
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: ResponseStatus.fail,
        message: error.message,
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/dashboard/users')
  }
}
