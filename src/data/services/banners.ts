import 'server-only'

import { connection } from 'next/server'
import { cache } from 'react'
import prisma from '@/lib/db'

import { Banner, Media } from '@prisma/client'
import { slow } from '@/lib/slow'

export type BannerWithImageType = Banner & {
  desktopImage: Media | null
  mobileImage: Media | null
}

export type GetActiveBannersReturnType = Promise<BannerWithImageType[]>

export const getActiveBanners = cache(async (): GetActiveBannersReturnType => {
  console.log('getActiveBanners')

  await connection()

  return prisma.banner.findMany({
    where: {
      active: true,
    },
    orderBy: { createdAt: 'desc' },
    include: {
      desktopImage: true,
      mobileImage: true,
    },
  })
})

export type GetInactiveBannersReturnType = Promise<BannerWithImageType[]>

export const getInactiveBanners = cache(
  async (): GetInactiveBannersReturnType => {
    console.log('getInactiveBanners')

    await connection()

    return prisma.banner.findMany({
      where: {
        active: false,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        desktopImage: true,
        mobileImage: true,
      },
    })
  }
)
