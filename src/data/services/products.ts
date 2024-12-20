import 'server-only'

import { unstable_noStore } from 'next/cache'
import { cache } from 'react'
import prisma from '@/lib/db'
import { slow } from '@/lib/slow'
import {
  Discount,
  ImagePersonalizationField,
  Media,
  PackageOption,
  PriceRange,
  Product,
  TextPersonalizationField,
} from '@prisma/client'
import { calculatePrice } from '@/lib/price'

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

export type ProductWithRelations = Product & {
  discount: Discount | null
  coverImage: Media | null
  images: Media[]
  priceTable: PriceRange[]
  imagePersonalizationFields: ImagePersonalizationField[]
  textPersonalizationFields: TextPersonalizationField[]
  finalPrice: number
  formatedPrice: string
  formatedFinalPrice: string
  formatedSavings: string
  packageOption: PackageOption | null
}

export type GetProductReturnType = Promise<ProductWithRelations | null>

export const getProduct = cache(
  async ({ id }: { id: string }): GetProductReturnType => {
    console.log('getProduct')

    unstable_noStore()
    await slow(1000)

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        discount: true,
        coverImage: true,
        images: true,
        imagePersonalizationFields: true,
        textPersonalizationFields: true,
        priceTable: {
          orderBy: { price: 'asc' },
        },
        packageOption: true,
      },
    })

    if (product) {
      const { finalPrice, formatedPrice, formatedFinalPrice, formatedSavings } =
        calculatePrice({
          discount: product?.discount,
          priceTable: product?.priceTable,
        })

      return {
        ...product,
        finalPrice,
        formatedPrice,
        formatedFinalPrice,
        formatedSavings,
      }
    }

    return null
  }
)
