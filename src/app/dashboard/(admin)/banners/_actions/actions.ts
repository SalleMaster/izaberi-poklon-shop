'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { Media } from '@prisma/client'
import { bannerSchema, BannerValues } from '../_components/validation'
import { deleteMedia, deleteMediaFromS3 } from '@/lib/actions'
import { adminActionGuard } from '@/lib/actionGuard'

type BannerWithoutImageFile = Omit<BannerValues, 'image'>
const bannerSchemaWithoutImage = bannerSchema.omit({
  image: true,
})

export async function createBanner(
  values: BannerWithoutImageFile,
  mediaId?: string
) {
  try {
    await adminActionGuard()

    const { name, link, active } = bannerSchemaWithoutImage.parse(values)

    await prisma.banner.create({
      data: {
        name,
        link,
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

    return {
      status: 'success',
      message: 'Baner kreiran.',
    }
  } catch (error) {
    // Remove media if there is an error
    if (mediaId) {
      await deleteMedia(mediaId)
    }

    if (error instanceof Error) {
      return {
        status: 'fail',
        message: error.message,
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/dashboard/banners')
  }
}

export async function editBanner(
  values: BannerWithoutImageFile,
  id: string,
  removedMedia: Media[],
  mediaId?: string
) {
  try {
    await adminActionGuard()

    const { name, link, active } = bannerSchemaWithoutImage.parse(values)

    await prisma.banner.update({
      where: { id },
      data: {
        name,
        link,
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
      removedMedia.forEach(async (media) => await deleteMedia(media.id))
    }

    return {
      status: 'success',
      message: 'Baner sačuvan.',
    }
  } catch (error) {
    // Remove media if there is an error
    if (mediaId) {
      await deleteMedia(mediaId)
    }

    if (error instanceof Error) {
      return {
        status: 'fail',
        message: error.message,
      }
    } else {
      throw error
    }
  } finally {
    revalidatePath('/dashboard/banners')
  }
}

export async function deleteBanner(id: string) {
  try {
    await adminActionGuard()

    const deletedBanner = await prisma.banner.delete({
      where: { id },
      include: {
        image: true,
      },
    })

    const mediaKey = deletedBanner.image?.key

    if (mediaKey) {
      await deleteMediaFromS3(mediaKey)
    }

    return {
      status: 'success',
      message: 'Baner obrisan.',
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
    revalidatePath('/dashboard/banners')
  }
}
