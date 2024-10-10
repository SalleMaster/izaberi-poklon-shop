'use server'

import { auth } from '@/auth'
import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { Media } from '@prisma/client'
import {
  deliveryServiceSchema,
  DeliveryServiceValues,
} from '../_components/validation'
import { deleteMedia, deleteMediaFromS3 } from '@/lib/actions'

type DeliveryServiceWithoutPdfFile = Omit<DeliveryServiceValues, 'pdf'>
const deliveryServiceSchemaWithoutPdf = deliveryServiceSchema.omit({
  pdf: true,
})

export async function createDeliveryService(
  values: DeliveryServiceWithoutPdfFile,
  mediaId?: string
) {
  const session = await auth()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  if (!userId || userRole !== 'admin') {
    throw Error('Unauthorized')
  }

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
  const session = await auth()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  if (!userId || userRole !== 'admin') {
    throw Error('Unauthorized')
  }

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
  const session = await auth()
  const userId = session?.user?.id
  const userRole = session?.user?.role

  if (!userId || userRole !== 'admin') {
    throw Error('Unauthorized')
  }

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
