'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import {
  packageOptionSchema,
  PackageOptionValues,
} from '../_components/validation'
import { adminActionGuard } from '@/lib/actionGuard'

export async function createPackageOption(values: PackageOptionValues) {
  try {
    await adminActionGuard()

    const { name, description, price } = packageOptionSchema.parse(values)

    await prisma.packageOption.create({
      data: {
        name,
        description,
        price,
      },
    })

    return {
      status: 'success',
      message: 'Poklon pakovanje kreirano.',
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
    revalidatePath('/dashboard/package-options')
  }
}

export async function editPackageOption(
  values: PackageOptionValues,
  id: string
) {
  try {
    await adminActionGuard()

    const { name, description, price } = packageOptionSchema.parse(values)

    await prisma.packageOption.update({
      where: { id },
      data: {
        name,
        description,
        price,
      },
    })

    return {
      status: 'success',
      message: 'Poklon pakovanje sačuvano.',
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
    revalidatePath('/dashboard/package-options')
  }
}

export async function deletePackageOption(id: string) {
  try {
    await adminActionGuard()

    await prisma.packageOption.delete({
      where: { id },
    })

    return {
      status: 'success',
      message: 'Poklon pakovanje obrisano.',
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
    revalidatePath('/dashboard/package-options')
  }
}
