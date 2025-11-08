'use client'

import { useSearchParams, usePathname } from 'next/navigation'
import { useOptimistic, useTransition } from 'react'
import useCreateQueryString from '@/hooks/use-create-query-string'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { PaginationDisplayValues } from '@/lib/types'

export default function DisplayFilter() {
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  const [optimisticDisplay, setOptimisticDisplay] = useOptimistic(
    searchParams.get('prikazi')
  )

  const createQueryString = useCreateQueryString(searchParams)

  const paginationDisplayOptions = [
    {
      label: PaginationDisplayValues.small,
      url: {
        pathname,
        query: createQueryString({
          addParams: [
            { name: 'prikazi', value: PaginationDisplayValues.small },
          ],
          removeParams: ['stranica'],
        }),
      },
      value: PaginationDisplayValues.small,
    },
    {
      label: PaginationDisplayValues.medium,
      url: {
        pathname,
        query: createQueryString({
          addParams: [
            { name: 'prikazi', value: PaginationDisplayValues.medium },
          ],
          removeParams: ['stranica'],
        }),
      },
      value: PaginationDisplayValues.medium,
    },
    {
      label: PaginationDisplayValues.large,
      url: {
        pathname,
        query: createQueryString({
          addParams: [
            { name: 'prikazi', value: PaginationDisplayValues.large },
          ],
          removeParams: ['stranica'],
        }),
      },
      value: PaginationDisplayValues.large,
    },
    {
      label: PaginationDisplayValues.extraLarge,
      url: {
        pathname,
        query: createQueryString({
          addParams: [
            { name: 'prikazi', value: PaginationDisplayValues.extraLarge },
          ],
          removeParams: ['stranica'],
        }),
      },
      value: PaginationDisplayValues.extraLarge,
    },
  ]

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

  return (
    <div data-pending-products={isPending ? '' : undefined}>
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
  )
}
