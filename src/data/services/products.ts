import 'server-only'

import { unstable_noStore } from 'next/cache'
import { cache } from 'react'
import prisma from '@/lib/db'
import { slow } from '@/lib/slow'

export const getProducts = cache(
  async ({
    kategorija,
    orderBy = { createdAt: 'desc' },
  }: {
    kategorija: string | string[] | undefined
    orderBy?: { price: 'asc' | 'desc' } | { createdAt: 'desc' }
  }) => {
    console.log('getProducts')

    unstable_noStore()
    await slow(1000)

    const products = await prisma.product.findMany({
      where: {
        ...(kategorija
          ? {
              categories: {
                some: {
                  slug: Array.isArray(kategorija)
                    ? { in: kategorija }
                    : kategorija,
                  active: true,
                },
              },
            }
          : {
              categories: {
                some: {
                  active: true,
                },
              },
            }),
      },
      orderBy,
      include: {
        coverImage: true,
        discount: true,
        priceTable: {
          orderBy: { price: 'asc' },
        },
      },
    })

    return products
  }
)
