'use server'

import prisma from '@/lib/db'
import { revalidatePath, updateTag } from 'next/cache'
import { Media } from '@/generated/prisma/client'
import { bannerSchema, BannerValues } from '../_components/validation'
import { deleteMedia, deleteMediaFromS3 } from '@/lib/actions'
import { adminActionGuard } from '@/lib/actionGuard'

type BannerWithoutImageFile = Omit<BannerValues, 'desktopImage' | 'mobileImage'>
const bannerSchemaWithoutImage = bannerSchema.omit({
  desktopImage: true,
  mobileImage: true,
})

export async function createBanner(
  values: BannerWithoutImageFile,
  desktopMediaId?: string,
  mobileMediaId?: string,
) {
  try {
    await adminActionGuard()

    const { name, link, active } = bannerSchemaWithoutImage.parse(values)

    await prisma.banner.create({
      data: {
        name,
        link,
        active,
        ...(desktopMediaId && {
          desktopImage: {
            connect: {
              id: desktopMediaId,
            },
          },
        }),
        ...(mobileMediaId && {
          mobileImage: {
            connect: {
              id: mobileMediaId,
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
    if (desktopMediaId) {
      await deleteMedia(desktopMediaId)
    }
    if (mobileMediaId) {
      await deleteMedia(mobileMediaId)
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
    updateTag('banners')
  }
}

export async function editBanner(
  values: BannerWithoutImageFile,
  id: string,
  removedDesktopMedia: Media[],
  removedMobileMedia: Media[],
  desktopMediaId?: string,
  mobileMediaId?: string,
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
        ...(desktopMediaId && {
          desktopImage: {
            connect: {
              id: desktopMediaId,
            },
          },
        }),
        ...(mobileMediaId && {
          mobileImage: {
            connect: {
              id: mobileMediaId,
            },
          },
        }),
      },
    })

    if (removedDesktopMedia.length > 0) {
      removedDesktopMedia.forEach(async (media) => await deleteMedia(media.id))
    }

    if (removedMobileMedia.length > 0) {
      removedMobileMedia.forEach(async (media) => await deleteMedia(media.id))
    }

    return {
      status: 'success',
      message: 'Baner sačuvan.',
    }
  } catch (error) {
    // Remove media if there is an error
    if (desktopMediaId) {
      await deleteMedia(desktopMediaId)
    }
    if (mobileMediaId) {
      await deleteMedia(mobileMediaId)
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
    updateTag('banners')
  }
}

export async function deleteBanner(id: string) {
  try {
    await adminActionGuard()

    const deletedBanner = await prisma.banner.delete({
      where: { id },
      include: {
        desktopImage: true,
        mobileImage: true,
      },
    })

    const desktopMediaKey = deletedBanner.desktopImage?.key

    if (desktopMediaKey) {
      await deleteMediaFromS3(desktopMediaKey)
    }

    const mobileMediaKey = deletedBanner.mobileImage?.key

    if (mobileMediaKey) {
      await deleteMediaFromS3(mobileMediaKey)
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
    updateTag('banners')
  }
}
