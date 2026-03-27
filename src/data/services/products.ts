import 'server-only'

import { connection } from 'next/server'
import { cache } from 'react'
import prisma from '@/lib/db'

import {
  Category,
  Discount,
  ImagePersonalizationField,
  Media,
  PackageOption,
  PriceRange,
  Product,
  TextPersonalizationField,
} from '@/generated/prisma/client'
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

    await connection()

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
  },
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
    categories: Category[]
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

    await connection()

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
  },
)

export type GetProductsCountReturnType = Promise<number>

export const getProduct = cache(
  async ({ id }: { id: string }): GetProductReturnType => {
    console.log('getProduct')

    await connection()

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
        categories: true,
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
  },
)

export type GetDiscountedProductsProps = {
  take: number
}

export const getDiscountedProducts = cache(
  async ({ take }: GetDiscountedProductsProps): GetProductsReturnType => {
    console.log('getDiscountedProducts')

    const products = await prisma.product.findMany({
      where: {
        discountId: {
          not: null,
        },
        discount: {
          active: true,
        },
        inStock: true,
        categories: { some: { active: true } },
      },
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
  },
)

export type GetTrendingProductsProps = {
  take: number
}

export const getTrendingProducts = cache(
  async ({ take }: GetTrendingProductsProps): GetProductsReturnType => {
    console.log('getTrendingProducts')

    const products = await prisma.product.findMany({
      where: {
        inStock: true,
        trending: true,
        categories: { some: { active: true } },
      },
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
  },
)
