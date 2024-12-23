'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { profileSchema, ProfileValues } from '../_components/validation'
import { loggedInActionGuard } from '@/lib/actionGuard'

export async function editProfile(values: ProfileValues) {
  try {
    const { userId } = await loggedInActionGuard()

    const data = profileSchema.parse(values)

    await prisma.user.update({
      where: { id: userId },
      data,
    })

    return {
      status: 'success',
      message: 'Podaci sačuvani.',
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
    revalidatePath('/dashboard/profile')
  }
}
