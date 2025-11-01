'use server'

import prisma from '@/lib/db'
import { revalidatePath, updateTag } from 'next/cache'
import { Media, Prisma } from '@/generated/prisma'
import { categorySchema, CategoryValues } from '../_components/validation'
import { deleteMedia, deleteMediaFromS3 } from '@/lib/actions'
import { adminActionGuard } from '@/lib/actionGuard'

type CategoryWithoutImageFile = Omit<CategoryValues, 'image'>
const categorySchemaWithoutImage = categorySchema.omit({
  image: true,
})

export async function createCategory(
  values: CategoryWithoutImageFile,
  mediaId?: string
) {
  try {
    await adminActionGuard()

    const { name, active, special, position } =
      categorySchemaWithoutImage.parse(values)

    const slug = name.replace(/\s+/g, '-').toLowerCase()

    await prisma.category.create({
      data: {
        name,
        slug,
        active,
        special,
        position,
        ...(mediaId && {
          image: {
            connect: {
              id: mediaId,
            },
          },
        }),
      },
    })

    return {
      status: 'success',
      message: 'Kategorija kreirana.',
    }
  } catch (error) {
    // Remove media if there is an error
    if (mediaId) {
      await deleteMedia(mediaId)
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        status: 'fail',
        message:
          'Ime kategorije mora biti jedinstveno. Kategorija sa istim imenom već postoji.',
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/dashboard/categories')
    updateTag('categories')
  }
}

export async function editCategory(
  values: CategoryWithoutImageFile,
  id: string,
  removedMedia: Media[],
  mediaId?: string
) {
  try {
    await adminActionGuard()

    const { name, active, special, position } =
      categorySchemaWithoutImage.parse(values)
    const slug = name.replace(/\s+/g, '-').toLowerCase()

    await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        active,
        special,
        position,
        ...(mediaId && {
          image: {
            connect: {
              id: mediaId,
            },
          },
        }),
      },
    })

    if (removedMedia.length > 0) {
      removedMedia.forEach(async (media) => await deleteMedia(media.id))
    }

    return {
      status: 'success',
      message: 'Kategorija sačuvana.',
    }
  } catch (error) {
    // Remove media if there is an error
    if (mediaId) {
      await deleteMedia(mediaId)
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        status: 'fail',
        message:
          'Ime kategorije mora biti jedinstveno. Kategorija sa istim imenom već postoji.',
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/dashboard/categories')
    updateTag('categories')
  }
}

export async function deleteCategory(id: string) {
  try {
    await adminActionGuard()

    const deletedCategory = await prisma.category.delete({
      where: { id },
      include: {
        image: true,
      },
    })

    const mediaKey = deletedCategory.image?.key

    if (mediaKey) {
      await deleteMediaFromS3(mediaKey)
    }

    return {
      status: 'success',
      message: 'Kategorija obrisana.',
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
    revalidatePath('/dashboard/categories')
    updateTag('categories')
  }
}
