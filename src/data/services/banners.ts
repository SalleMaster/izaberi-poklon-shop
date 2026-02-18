import 'server-only'

import { cache } from 'react'
import prisma from '@/lib/db'

import { Banner, Media } from '@/generated/prisma/client'

export type BannerWithImageType = Banner & {
  desktopImage: Media | null
  mobileImage: Media | null
}

export type GetBannersReturnType = Promise<BannerWithImageType[]>

type Props = {
  active: boolean
}

export const getBanners = cache(
  async ({ active }: Props): GetBannersReturnType => {
    console.log('getBanners')

    return prisma.banner.findMany({
      where: {
        active,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        desktopImage: true,
        mobileImage: true,
      },
    })
  },
)
