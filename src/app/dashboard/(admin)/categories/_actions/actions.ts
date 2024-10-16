'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { Media } from '@prisma/client'
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
  await adminActionGuard()

  const { name, active } = categorySchemaWithoutImage.parse(values)

  const slug = name.replace(/\s+/g, '-').toLowerCase()

  await prisma.category.create({
    data: {
      name,
      slug,
      active,
      ...(mediaId && {
        image: {
          connect: {
            id: mediaId,
          },
        },
      }),
    },
  })

  revalidatePath('/dashboard/categories')
}

export async function editCategory(
  values: CategoryWithoutImageFile,
  id: string,
  removedMedia: Media[],
  mediaId?: string
) {
  await adminActionGuard()

  const { name, active } = categorySchemaWithoutImage.parse(values)
  const slug = name.replace(/\s+/g, '-').toLowerCase()

  await prisma.category.update({
    where: { id },
    data: {
      name,
      slug,
      active,
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
    removedMedia.forEach(
      async (media) => await deleteMedia(media.id, media.key)
    )
  }

  revalidatePath('/dashboard/categories')
}

export async function deleteCategory(id: string) {
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

  revalidatePath('/dashboard/categories')
}
