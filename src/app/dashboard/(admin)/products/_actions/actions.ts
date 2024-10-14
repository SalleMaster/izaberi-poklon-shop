'use server'

import { auth } from '@/auth'
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { Media } from '@prisma/client'
import { productSchema, ProductValues } from '../_components/validation'
import { deleteMedia, deleteMediaFromS3 } from '@/lib/actions'

type ProductWithoutImageFiles = Omit<ProductValues, 'coverImage' | 'images'>
const productSchemaWithoutImages = productSchema.omit({
  coverImage: true,
  images: true,
})

export async function createProduct(
  values: ProductWithoutImageFiles,
  coverImageMediaId?: string,
  imagesMediaIds?: string[]
) {
  const session = await auth()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  if (!userId || userRole !== 'admin') {
    throw Error('Unauthorized')
  }

  const {
    name,
    categories,
    code,
    price,
    discount,
    material,
    dimensions,
    personalization,
    description,
  } = productSchemaWithoutImages.parse(values)

  //   const slug = name.replace(/\s+/g, '-').toLowerCase()

  await prisma.product.create({
    data: {
      name,
      // slug,
      categories: {
        connect: categories.map((id) => ({ id })),
      },
      code,
      price,
      discount: discount
        ? {
            connect: {
              id: discount,
            },
          }
        : undefined,
      material,
      dimensions,
      personalization,
      description,
      ...(coverImageMediaId && {
        coverImage: {
          connect: {
            id: coverImageMediaId,
          },
        },
      }),
      ...(imagesMediaIds && {
        images: {
          connect: imagesMediaIds.map((id) => ({ id })),
        },
      }),
    },
  })

  revalidatePath('/dashboard/products')
}

export async function editProduct(
  values: ProductWithoutImageFiles,
  id: string,
  removedMedia: Media[],
  coverImageMediaId?: string,
  imagesMediaIds?: string[]
) {
  const session = await auth()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  if (!userId || userRole !== 'admin') {
    throw Error('Unauthorized')
  }

  const {
    name,
    categories,
    code,
    price,
    discount,
    material,
    dimensions,
    personalization,
    description,
  } = productSchemaWithoutImages.parse(values)

  //   const slug = name.replace(/\s+/g, '-').toLowerCase()

  await prisma.product.update({
    where: { id },
    data: {
      name,
      // slug,
      categories: {
        connect: categories.map((id) => ({ id })),
      },
      code,
      price,
      discount: discount
        ? {
            connect: {
              id: discount,
            },
          }
        : {
            disconnect: true,
          },
      material,
      dimensions,
      personalization,
      description,
      ...(coverImageMediaId && {
        coverImage: {
          connect: {
            id: coverImageMediaId,
          },
        },
      }),
      ...(imagesMediaIds && {
        images: {
          connect: imagesMediaIds.map((id) => ({ id })),
        },
      }),
    },
  })

  if (removedMedia.length > 0) {
    removedMedia.forEach(
      async (media) => await deleteMedia(media.id, media.key)
    )
  }

  revalidatePath('/dashboard/products')
}

export async function deleteProduct(id: string) {
  const session = await auth()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  if (!userId || userRole !== 'admin') {
    throw Error('Unauthorized')
  }

  const deletedProduct = await prisma.product.delete({
    where: { id },
    include: {
      coverImage: true,
      images: true,
    },
  })

  const coverImageMediaKey = deletedProduct.coverImage?.key
  const imagesMediaKeys = deletedProduct.images.map((image) => image.key)

  if (coverImageMediaKey) {
    await deleteMediaFromS3(coverImageMediaKey)
  }

  if (imagesMediaKeys.length > 0) {
    imagesMediaKeys.forEach(async (key) => await deleteMediaFromS3(key))
  }

  revalidatePath('/dashboard/products')
}
