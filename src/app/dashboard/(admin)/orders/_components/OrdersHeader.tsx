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
      label: OrderSortingLabels.Najnovijim,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [
          { name: 'sortiranje', value: OrderSortingValues.Najnovije },
        ],
      })}`,
      value: OrderSortingValues.Najnovije,
    },
    {
      label: OrderSortingLabels.Najstarijim,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [
          { name: 'sortiranje', value: OrderSortingValues.Najstarije },
        ],
      })}`,
      value: OrderSortingValues.Najstarije,
    },
  ]

  const statusOptions = [
    {
      label: OrderStatusLabels.Primljene,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [{ name: 'status', value: OrderStatusType.pending }],
      })}`,
      value: OrderStatusType.pending,
    },
    {
      label: OrderStatusLabels.UObradi,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [{ name: 'status', value: OrderStatusType.processing }],
      })}`,
      value: OrderStatusType.processing,
    },
    {
      label: OrderStatusLabels.Poslate,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [{ name: 'status', value: OrderStatusType.shipped }],
      })}`,
      value: OrderStatusType.shipped,
    },
    {
      label: OrderStatusLabels.Dostavljene,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [{ name: 'status', value: OrderStatusType.delivered }],
      })}`,
      value: OrderStatusType.delivered,
    },
    {
      label: OrderStatusLabels.Otkazane,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [{ name: 'status', value: OrderStatusType.canceled }],
      })}`,
      value: OrderStatusType.canceled,
    },
    {
      label: OrderStatusLabels.Sve,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [{ name: 'status', value: '' }],
      })}`,
      value: '',
    },
  ]

  let orderingLabel: string

  switch (optimisticSort) {
    case OrderSortingValues.Najnovije:
      orderingLabel = OrderSortingLabels.Najnovijim
      break
    case OrderSortingValues.Najstarije:
      orderingLabel = OrderSortingLabels.Najstarijim
      break
    default:
      orderingLabel = OrderSortingLabels.Najnovijim
  }

  let statusLabel: OrderStatusLabel
  switch (optimisticStatus) {
    case OrderStatusType.pending:
      statusLabel = OrderStatusLabels.Primljene
      break
    case OrderStatusType.processing:
      statusLabel = OrderStatusLabels.UObradi
      break
    case OrderStatusType.shipped:
      statusLabel = OrderStatusLabels.Poslate
      break
    case OrderStatusType.delivered:
      statusLabel = OrderStatusLabels.Dostavljene
      break
    case OrderStatusType.canceled:
      statusLabel = OrderStatusLabels.Otkazane
      break
    default:
      statusLabel = OrderStatusLabels.Sve
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
