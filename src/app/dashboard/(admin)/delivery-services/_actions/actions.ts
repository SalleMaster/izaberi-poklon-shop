'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { Media } from '@prisma/client'
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

  revalidatePath('/dashboard/delivery-services')
}

export async function editDeliveryService(
  values: DeliveryServiceWithoutPdfFile,
  id: string,
  removedMedia: Media[],
  mediaId?: string
) {
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
    removedMedia.forEach(
      async (media) => await deleteMedia(media.id, media.key)
    )
  }

  revalidatePath('/dashboard/delivery-services')
}

export async function deleteDeliveryService(id: string) {
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

  revalidatePath('/dashboard/categories')
}
