'use client'

import { useSearchParams } from 'next/navigation'
import React, { useOptimistic, useTransition } from 'react'
import useCreateQueryString from '@/hooks/use-create-query-string'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  OrderSortingLabels,
  OrderSortingValues,
  OrderStatusLabel,
  OrderStatusLabels,
} from '@/lib/types'
import { OrderStatusType } from '@prisma/client'

export default function OrdersHeader() {
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [optimisticSort, setOptimisticSort] = useOptimistic(
    searchParams.get('sortiranje')
  )
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    searchParams.get('status')
  )

  const createQueryString = useCreateQueryString(searchParams)

  const sortingOptions = [
    {
      label: OrderSortingLabels.Newest,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [{ name: 'sortiranje', value: OrderSortingValues.Newest }],
      })}`,
      value: OrderSortingValues.Newest,
    },
    {
      label: OrderSortingLabels.Oldest,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [{ name: 'sortiranje', value: OrderSortingValues.Oldest }],
      })}`,
      value: OrderSortingValues.Oldest,
    },
  ]

  const statusOptions = [
    {
      label: OrderStatusLabels.Pending,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [{ name: 'status', value: OrderStatusType.pending }],
      })}`,
      value: OrderStatusType.pending,
    },
    {
      label: OrderStatusLabels.Processing,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [{ name: 'status', value: OrderStatusType.processing }],
      })}`,
      value: OrderStatusType.processing,
    },
    {
      label: OrderStatusLabels.Shipped,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [{ name: 'status', value: OrderStatusType.shipped }],
      })}`,
      value: OrderStatusType.shipped,
    },
    {
      label: OrderStatusLabels.Delivered,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [{ name: 'status', value: OrderStatusType.delivered }],
      })}`,
      value: OrderStatusType.delivered,
    },
    {
      label: OrderStatusLabels.Canceled,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [{ name: 'status', value: OrderStatusType.canceled }],
      })}`,
      value: OrderStatusType.canceled,
    },
    {
      label: OrderStatusLabels.All,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [{ name: 'status', value: '' }],
      })}`,
      value: '',
    },
  ]

  let orderingLabel: string

  switch (optimisticSort) {
    case OrderSortingValues.Newest:
      orderingLabel = OrderSortingLabels.Newest
      break
    case OrderSortingValues.Oldest:
      orderingLabel = OrderSortingLabels.Oldest
      break
    default:
      orderingLabel = OrderSortingLabels.Newest
  }

  let statusLabel: OrderStatusLabel
  switch (optimisticStatus) {
    case OrderStatusType.pending:
      statusLabel = OrderStatusLabels.Pending
      break
    case OrderStatusType.processing:
      statusLabel = OrderStatusLabels.Processing
      break
    case OrderStatusType.shipped:
      statusLabel = OrderStatusLabels.Shipped
      break
    case OrderStatusType.delivered:
      statusLabel = OrderStatusLabels.Delivered
      break
    case OrderStatusType.canceled:
      statusLabel = OrderStatusLabels.Canceled
      break
    default:
      statusLabel = OrderStatusLabels.All
  }

  return (
    <div
      data-pending-orders={isPending ? '' : undefined}
      className='space-y-2.5 md:space-y-0 md:flex md:justify-between'
    >
      <h2 className='text-xl font-bold'>Porudžbine</h2>

      <div className='space-y-2.5 md:space-y-0 md:flex md:space-x-2.5'>
        <div>
          <span className='mr-2'>Status:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>{statusLabel}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {statusOptions.map((option) => (
                <DropdownMenuItem key={option.label} asChild>
                  <Link
                    href={option.url}
                    onClick={() => {
                      startTransition(() => {
                        setOptimisticStatus(option.value)
                      })
                    }}
                  >
                    {option.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <span className='mr-2'>Sortiranje prema:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>{orderingLabel}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sortingOptions.map((option) => (
                <DropdownMenuItem key={option.label} asChild>
                  <Link
                    href={option.url}
                    onClick={() => {
                      startTransition(() => {
                        setOptimisticSort(option.value)
                      })
                    }}
                  >
                    {option.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
