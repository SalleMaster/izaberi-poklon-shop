'use client'

import { useSearchParams } from 'next/navigation'
import { useOptimistic, useTransition } from 'react'
import useCreateQueryString from '@/hooks/use-create-query-string'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  SortingLabels,
  SortingValues,
  OrderStatusLabel,
  OrderStatusLabels,
  PaginationDisplayValues,
} from '@/lib/types'
import { OrderStatusType } from '@/generated/prisma'
import { SlidersHorizontal } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export default function OrdersHeader() {
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [optimisticSort, setOptimisticSort] = useOptimistic(
    searchParams.get('sortiranje')
  )
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    searchParams.get('status')
  )

  const [optimisticDisplay, setOptimisticDisplay] = useOptimistic(
    searchParams.get('prikazi')
  )

  const createQueryString = useCreateQueryString(searchParams)

  const paginationDisplayOptions = [
    {
      label: PaginationDisplayValues.small,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [
          { name: 'prikazi', value: PaginationDisplayValues.small },
          { name: 'stranica', value: '1' },
        ],
      })}`,
      value: PaginationDisplayValues.small,
    },
    {
      label: PaginationDisplayValues.medium,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [
          { name: 'prikazi', value: PaginationDisplayValues.medium },
          { name: 'stranica', value: '1' },
        ],
      })}`,
      value: PaginationDisplayValues.medium,
    },
    {
      label: PaginationDisplayValues.large,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [
          { name: 'prikazi', value: PaginationDisplayValues.large },
          { name: 'stranica', value: '1' },
        ],
      })}`,
      value: PaginationDisplayValues.large,
    },
    {
      label: PaginationDisplayValues.extraLarge,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [
          { name: 'prikazi', value: PaginationDisplayValues.extraLarge },
          { name: 'stranica', value: '1' },
        ],
      })}`,
      value: PaginationDisplayValues.extraLarge,
    },
  ]

  const sortingOptions = [
    {
      label: SortingLabels.Newest,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [
          { name: 'sortiranje', value: SortingValues.Newest },
          { name: 'stranica', value: '1' },
        ],
      })}`,
      value: SortingValues.Newest,
    },
    {
      label: SortingLabels.Oldest,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [
          { name: 'sortiranje', value: SortingValues.Oldest },
          { name: 'stranica', value: '1' },
        ],
      })}`,
      value: SortingValues.Oldest,
    },
  ]

  const statusOptions = [
    {
      label: OrderStatusLabels.Pending,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [
          { name: 'status', value: OrderStatusType.pending },
          { name: 'stranica', value: '1' },
        ],
      })}`,
      value: OrderStatusType.pending,
    },
    {
      label: OrderStatusLabels.Processing,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [
          { name: 'status', value: OrderStatusType.processing },
          { name: 'stranica', value: '1' },
        ],
      })}`,
      value: OrderStatusType.processing,
    },
    {
      label: OrderStatusLabels.Shipped,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [
          { name: 'status', value: OrderStatusType.shipped },
          { name: 'stranica', value: '1' },
        ],
      })}`,
      value: OrderStatusType.shipped,
    },
    {
      label: OrderStatusLabels.Delivered,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [
          { name: 'status', value: OrderStatusType.delivered },
          { name: 'stranica', value: '1' },
        ],
      })}`,
      value: OrderStatusType.delivered,
    },
    {
      label: OrderStatusLabels.Canceled,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [
          { name: 'status', value: OrderStatusType.canceled },
          { name: 'stranica', value: '1' },
        ],
      })}`,
      value: OrderStatusType.canceled,
    },
    {
      label: OrderStatusLabels.Draft,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [
          { name: 'status', value: OrderStatusType.draft },
          { name: 'stranica', value: '1' },
        ],
      })}`,
      value: OrderStatusType.pending,
    },
    {
      label: OrderStatusLabels.All,
      url: `/admin/porudzbine?${createQueryString({
        addParams: [
          { name: 'status', value: '' },
          { name: 'stranica', value: '1' },
        ],
      })}`,
      value: '',
    },
  ]

  let orderingLabel: string

  switch (optimisticSort) {
    case SortingValues.Newest:
      orderingLabel = SortingLabels.Newest
      break
    case SortingValues.Oldest:
      orderingLabel = SortingLabels.Oldest
      break
    default:
      orderingLabel = SortingLabels.Newest
  }

  let displayLabel: string

  switch (optimisticDisplay) {
    case PaginationDisplayValues.small:
      displayLabel = PaginationDisplayValues.small
      break
    case PaginationDisplayValues.medium:
      displayLabel = PaginationDisplayValues.medium
      break
    case PaginationDisplayValues.large:
      displayLabel = PaginationDisplayValues.large
      break
    case PaginationDisplayValues.extraLarge:
      displayLabel = PaginationDisplayValues.extraLarge
      break
    default:
      displayLabel = PaginationDisplayValues.small
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
    case OrderStatusType.draft:
      statusLabel = OrderStatusLabels.Draft
      break
    default:
      statusLabel = OrderStatusLabels.All
  }

  const filters = (
    <div className='space-y-4 md:space-y-0 md:flex md:space-x-4'>
      <div>
        <span className='mr-2'>Prikazi:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary'>{displayLabel}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {paginationDisplayOptions.map((option) => (
              <DropdownMenuItem key={option.label} asChild>
                <Link
                  href={option.url}
                  onClick={() => {
                    startTransition(() => {
                      setOptimisticDisplay(option.value)
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
      <Separator className='md:hidden' />
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
      <Separator className='md:hidden' />
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
  )

  return (
    <div
      data-pending-orders={isPending ? '' : undefined}
      className='space-y-2.5 md:space-y-0 md:flex md:justify-between'
    >
      <h2 className='text-xl font-bold'>Porudžbine</h2>

      <div className='hidden md:block'>{filters}</div>

      <Card className='md:hidden py-0'>
        <Accordion type='single' collapsible className='px-4'>
          <AccordionItem value='item-1' className='border-b-0'>
            <AccordionTrigger>
              <SlidersHorizontal />
            </AccordionTrigger>
            <AccordionContent className='space-y-4'>{filters}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  )
}
