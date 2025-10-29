'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Media, Prisma } from '@/generated/prisma'
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
    priceTable,
    discount,
    material,
    dimensions,
    personalization,
    description,
    delivery,
    inStock,
    trending,
    packageOption,
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
        priceTable: {
          create: priceTable.map((priceRange) => ({
            from: priceRange.from,
            to: priceRange.to,
            price: priceRange.price,
            deliveryFee: { connect: { id: priceRange.deliveryFeeId } },
          })),
        },
        price: priceTable[0].price,
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
        trending,
        packageOption: packageOption
          ? {
              connect: {
                id: packageOption,
              },
            }
          : undefined,
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
            max: field.max,
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

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        status: 'fail',
        message:
          'Šifra proizvoda mora biti jedinstvena. Proizvod sa istom šifrom već postoji.',
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
    priceTable,
    discount,
    material,
    dimensions,
    personalization,
    description,
    delivery,
    inStock,
    trending,
    packageOption,
    imagePersonalizationFields,
    textPersonalizationFields,
  } = productSchemaWithoutImages.parse(values)

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        categories: {
          set: [],
          connect: categories.map((id) => ({ id })),
        },
        code,
        priceTable: {
          deleteMany: {
            productId: id,
          },
          create: priceTable.map((priceRange) => ({
            from: priceRange.from,
            to: priceRange.to,
            price: priceRange.price,
            deliveryFee: { connect: { id: priceRange.deliveryFeeId } },
          })),
        },
        price: priceTable[0].price,
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
        trending,
        packageOption: packageOption
          ? {
              connect: {
                id: packageOption,
              },
            }
          : {
              disconnect: true,
            },
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
            create: { name: field.name, min: field.min, max: field.max },
            update: { name: field.name, min: field.min, max: field.max },
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

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        status: 'fail',
        message:
          'Šifra proizvoda mora biti jedinstvena. Proizvod sa istom šifrom već postoji.',
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

    revalidatePath('/dashboard/products')

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
  }
}
