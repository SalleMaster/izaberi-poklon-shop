'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Media, Prisma } from '@prisma/client'
import { productSchema, ProductValues } from '../_components/validation'
import { deleteMedia, deleteMediaFromS3 } from '@/lib/actions'
import { adminActionGuard } from '@/lib/actionGuard'

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
  await adminActionGuard()

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
    delivery,
    inStock,
    imagePersonalizationFields,
    textPersonalizationFields,
  } = productSchemaWithoutImages.parse(values)

  try {
    await prisma.product.create({
      data: {
        name,
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
        delivery,
        inStock,
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
        imagePersonalizationFields: {
          create: imagePersonalizationFields?.map((field) => ({
            name: field.name,
            min: field.min,
          })),
        },
        textPersonalizationFields: {
          create: textPersonalizationFields?.map((field) => ({
            name: field.name,
            placeholder: field.placeholder,
          })),
        },
      },
    })

    return {
      status: 'success',
      message: 'Proizvod kreiran.',
    }
  } catch (error) {
    // Remove media if there is an error
    if (coverImageMediaId) {
      await deleteMedia(coverImageMediaId)
    }
    if (imagesMediaIds) {
      imagesMediaIds.forEach(async (id) => await deleteMedia(id))
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          status: 'fail',
          message:
            'Šifra proizvoda mora biti jedinstvena. Proizvod sa istom šifrom već postoji.',
        }
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/dashboard/products')
  }
}

export async function editProduct(
  values: ProductWithoutImageFiles,
  id: string,
  removedMedia: Media[],
  removedTextFields: string[],
  removedImageFields: string[],
  coverImageMediaId?: string,
  imagesMediaIds?: string[]
) {
  await adminActionGuard()

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
    delivery,
    inStock,
    imagePersonalizationFields,
    textPersonalizationFields,
  } = productSchemaWithoutImages.parse(values)

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name,
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
        delivery,
        inStock,
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
        imagePersonalizationFields: {
          upsert: imagePersonalizationFields?.map((field) => ({
            where: { id: field.id || '' },
            create: { name: field.name, min: field.min },
            update: { name: field.name, min: field.min },
          })),
        },
        textPersonalizationFields: {
          upsert: textPersonalizationFields?.map((field) => ({
            where: { id: field.id || '' },
            create: { name: field.name, placeholder: field.placeholder },
            update: { name: field.name, placeholder: field.placeholder },
          })),
        },
      },
    })

    if (removedMedia.length > 0) {
      removedMedia.forEach(async (media) => await deleteMedia(media.id))
    }

    if (removedTextFields.length > 0) {
      removedTextFields.forEach(
        async (id) =>
          await prisma.textPersonalizationField.delete({ where: { id } })
      )
    }

    if (removedImageFields.length > 0) {
      removedImageFields.forEach(
        async (id) =>
          await prisma.imagePersonalizationField.delete({ where: { id } })
      )
    }

    return {
      status: 'success',
      message: 'Proizvod sačuvan.',
    }
  } catch (error) {
    // Remove media if there is an error
    if (coverImageMediaId) {
      await deleteMedia(coverImageMediaId)
    }
    if (imagesMediaIds) {
      imagesMediaIds.forEach(async (id) => await deleteMedia(id))
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          status: 'fail',
          message:
            'Šifra proizvoda mora biti jedinstvena. Proizvod sa istom šifrom već postoji.',
        }
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/dashboard/products')
  }
}

export async function deleteProduct(id: string) {
  try {
    await adminActionGuard()

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

    return {
      status: 'success',
      message: 'Proizvod obrisan.',
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
    revalidatePath('/dashboard/products')
    redirect('/dashboard/products')
  }
}
