import 'server-only'

import { unstable_noStore } from 'next/cache'
import { cache } from 'react'
import prisma from '@/lib/db'
import { slow } from '@/lib/slow'
import { Banner, Media } from '@prisma/client'

export type BannerWithImageType = Banner & {
  desktopImage: Media | null
  mobileImage: Media | null
}

export type GetActiveBannersReturnType = Promise<BannerWithImageType[]>

export const getActiveBanners = cache(async (): GetActiveBannersReturnType => {
  console.log('getActiveBanners')

  unstable_noStore()
  await slow(1000)

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
