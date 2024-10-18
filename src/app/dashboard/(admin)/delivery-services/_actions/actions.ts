'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { Media, Prisma } from '@prisma/client'
import {
  deliveryServiceSchema,
  DeliveryServiceValues,
} from '../_components/validation'
import { deleteMedia, deleteMediaFromS3 } from '@/lib/actions'
import { adminActionGuard } from '@/lib/actionGuard'

type DeliveryServiceWithoutPdfFile = Omit<DeliveryServiceValues, 'pdf'>
const deliveryServiceSchemaWithoutPdf = deliveryServiceSchema.omit({
  pdf: true,
})

export async function createDeliveryService(
  values: DeliveryServiceWithoutPdfFile,
  mediaId?: string
) {
  try {
    await adminActionGuard()

    const { name, link, active } = deliveryServiceSchemaWithoutPdf.parse(values)

    await prisma.deliveryService.create({
      data: {
        name,
        link,
        active,
        ...(mediaId && {
          pdf: {
            connect: {
              id: mediaId,
            },
          },
        }),
      },
    })

    return {
      status: 'success',
      message: 'Kurirska služba kreirana.',
    }
  } catch (error) {
    // Remove media if there is an error
    if (mediaId) {
      await deleteMedia(mediaId)
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          status: 'fail',
          message:
            'Ime kurirska službe mora biti jedinstveno. Kurirska služba sa istim imenom već postoji.',
        }
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/dashboard/delivery-services')
  }
}

export async function editDeliveryService(
  values: DeliveryServiceWithoutPdfFile,
  id: string,
  removedMedia: Media[],
  mediaId?: string
) {
  try {
    await adminActionGuard()

    const { name, link, active } = deliveryServiceSchemaWithoutPdf.parse(values)

    await prisma.deliveryService.update({
      where: { id },
      data: {
        name,
        link,
        active,
        ...(mediaId && {
          pdf: {
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
      message: 'Kurirska služba kreirana.',
    }
  } catch (error) {
    // Remove media if there is an error
    if (mediaId) {
      await deleteMedia(mediaId)
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          status: 'fail',
          message:
            'Ime kurirska službe mora biti jedinstveno. Kurirska služba sa istim imenom već postoji.',
        }
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/dashboard/delivery-services')
  }
}

export async function deleteDeliveryService(id: string) {
  try {
    await adminActionGuard()

    const deletedDeliveryService = await prisma.deliveryService.delete({
      where: { id },
      include: {
        pdf: true,
      },
    })

    const mediaKey = deletedDeliveryService.pdf?.key

    if (mediaKey) {
      await deleteMediaFromS3(mediaKey)
    }

    return {
      status: 'success',
      message: 'Kurirska služba obrisana.',
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
    revalidatePath('/dashboard/delivery-services')
  }
}
