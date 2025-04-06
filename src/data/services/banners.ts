import 'server-only'

import { connection } from 'next/server'
import { cache } from 'react'
import prisma from '@/lib/db'

import { Banner, Media } from '@prisma/client'

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
    include: {
      desktopImage: true,
      mobileImage: true,
    },
  })
})
