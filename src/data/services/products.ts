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

type ProductPricesType = {
  finalPrice: number
  formattedPrice: string
  formattedFinalPrice: string
  formattedSavings: string
}

export type GetProductsProps = {
  kategorija: string | string[] | undefined
  orderBy?: { price: 'asc' | 'desc' } | { createdAt: 'desc' }
  skip?: number
  take?: number
  isAdmin?: boolean
  trending?: boolean
}

export type ProductCardType = Product &
  ProductPricesType & {
    discount: Discount | null
    coverImage: Media | null
    priceTable: PriceRange[]
  }

export type GetProductsReturnType = Promise<ProductCardType[]>

export const getProducts = cache(
  async ({
    kategorija,
    orderBy = { createdAt: 'desc' },
    skip,
    take,
    isAdmin = false,
    trending = false,
  }: GetProductsProps): GetProductsReturnType => {
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
                  ...(isAdmin
                    ? {}
                    : {
                        active: true,
                      }),
                },
              },
            }
          : {
              categories: {
                some: {
                  ...(isAdmin
                    ? {}
                    : {
                        active: true,
                      }),
                },
              },
            }),
        ...(isAdmin ? {} : { inStock: true }),
        ...(trending
          ? {
              trending: true,
            }
          : {}),
      },
      orderBy,
      skip: skip && skip > 0 ? skip : undefined,
      take: take && take > 0 ? take : undefined,
      include: {
        coverImage: true,
        discount: true,
        priceTable: {
          orderBy: { price: 'asc' },
        },
      },
    })

    if (products.length) {
      const productsWithPrices: ProductCardType[] = products.map((product) => {
        const {
          finalPrice,
          formattedPrice,
          formattedFinalPrice,
          formattedSavings,
        } = calculatePrice({
          discount: product?.discount,
          priceTable: product?.priceTable,
        })

        return {
          ...product,
          finalPrice,
          formattedPrice,
          formattedFinalPrice,
          formattedSavings,
        }
      })

      return productsWithPrices
    }

    return []
  }
)

export type ProductWithRelations = Product &
  ProductPricesType & {
    discount: Discount | null
    coverImage: Media | null
    images: Media[]
    priceTable: PriceRange[]
    imagePersonalizationFields: ImagePersonalizationField[]
    textPersonalizationFields: TextPersonalizationField[]
    packageOption: PackageOption | null
  }

export type GetProductReturnType = Promise<ProductWithRelations | null>

export const getProductsCount = cache(
  async ({
    kategorija,
    isAdmin = false,
    trending = false,
  }: {
    kategorija: string | string[] | undefined
    isAdmin?: boolean
    trending?: boolean
  }): GetProductsCountReturnType => {
    console.log('getProductsCount')

    unstable_noStore()
    await slow(1000)

    return await prisma.product.count({
      where: {
        ...(kategorija
          ? {
              categories: {
                some: {
                  slug: Array.isArray(kategorija)
                    ? { in: kategorija }
                    : kategorija,
                  ...(isAdmin
                    ? {}
                    : {
                        active: true,
                      }),
                },
              },
            }
          : {
              categories: {
                some: {
                  ...(isAdmin
                    ? {}
                    : {
                        active: true,
                      }),
                },
              },
            }),
        ...(isAdmin ? {} : { inStock: true }),
        ...(trending
          ? {
              trending: true,
            }
          : {}),
      },
    })
  }
)

export type GetProductsCountReturnType = Promise<number>

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
      const {
        finalPrice,
        formattedPrice,
        formattedFinalPrice,
        formattedSavings,
      } = calculatePrice({
        discount: product?.discount,
        priceTable: product?.priceTable,
      })

      return {
        ...product,
        finalPrice,
        formattedPrice,
        formattedFinalPrice,
        formattedSavings,
      }
    }

    return null
  }
)

export type GetDiscountedProductsProps = {
  take: number
}

export const getDiscountedProducts = cache(
  async ({ take }: GetDiscountedProductsProps): GetProductsReturnType => {
    console.log('getDiscountedProducts')

    unstable_noStore()
    await slow(1000)

    const products = await prisma.product.findMany({
      where: { discount: { isNot: null }, inStock: true },
      include: {
        discount: true,
        coverImage: true,
        priceTable: {
          orderBy: { price: 'asc' },
        },
      },
      take,
      orderBy: { updatedAt: 'asc' },
    })

    if (products.length) {
      const productsWithPrices: ProductCardType[] = products.map((product) => {
        const {
          finalPrice,
          formattedPrice,
          formattedFinalPrice,
          formattedSavings,
        } = calculatePrice({
          discount: product?.discount,
          priceTable: product?.priceTable,
        })

        return {
          ...product,
          finalPrice,
          formattedPrice,
          formattedFinalPrice,
          formattedSavings,
        }
      })

      return productsWithPrices
    }

    return []
  }
)

export type GetTrendingProductsProps = {
  take: number
}

export const getTrendingProducts = cache(
  async ({ take }: GetTrendingProductsProps): GetProductsReturnType => {
    console.log('getTrendingProducts')

    unstable_noStore()
    await slow(1000)

    const products = await prisma.product.findMany({
      where: { inStock: true, trending: true },
      include: {
        discount: true,
        coverImage: true,
        priceTable: {
          orderBy: { price: 'asc' },
        },
      },
      take,
      orderBy: { updatedAt: 'asc' },
    })

    if (products.length) {
      const productsWithPrices: ProductCardType[] = products.map((product) => {
        const {
          finalPrice,
          formattedPrice,
          formattedFinalPrice,
          formattedSavings,
        } = calculatePrice({
          discount: product?.discount,
          priceTable: product?.priceTable,
        })

        return {
          ...product,
          finalPrice,
          formattedPrice,
          formattedFinalPrice,
          formattedSavings,
        }
      })

      return productsWithPrices
    }

    return []
  }
)
