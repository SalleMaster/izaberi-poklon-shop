import 'server-only'

import { unstable_noStore } from 'next/cache'
import { cache } from 'react'
import prisma from '@/lib/db'
import { slow } from '@/lib/slow'
import { loggedInActionGuard } from '@/lib/actionGuard'
import { Order } from '@prisma/client'

export type GetAllOrdersReturnType = Promise<Order[]>

export const getAllOrders = cache(async (): GetAllOrdersReturnType => {
  console.log('getAllOrders')

  unstable_noStore()
  await slow(1000)

  await loggedInActionGuard()

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  })

  orders.map((order) => {
    console.log(order)
  })

  return orders
})
