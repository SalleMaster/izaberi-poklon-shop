import 'server-only'

import { unstable_noStore } from 'next/cache'
import { cache } from 'react'
import prisma from '@/lib/db'
import { slow } from '@/lib/slow'
import { loggedInActionGuard } from '@/lib/actionGuard'

export const getCart = cache(async () => {
  console.log('getCart')

  unstable_noStore()
  await slow(1000)

  const { userId } = await loggedInActionGuard()

  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              coverImage: true,
            },
          },
        },
      },
    },
  })

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                coverImage: true,
              },
            },
          },
        },
      },
    })
  }

  return cart
})
