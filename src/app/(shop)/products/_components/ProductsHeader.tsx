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

export default function ProductsHeader() {
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [optimisticSort, setOptimisticSort] = useOptimistic(
    searchParams.get('sortiranje')
  )

  const createQueryString = useCreateQueryString(searchParams)

  const sortingOptions = [
    {
      label: 'Najnovijim',
      url: `/pokloni?${createQueryString({
        addParams: [{ name: 'sortiranje', value: 'najnoviji' }],
      })}`,
      value: 'najnoviji',
    },
    {
      label: 'Najnižoj ceni',
      url: `/pokloni?${createQueryString({ addParams: [{ name: 'sortiranje', value: 'najniza-cena' }] })}`,
      value: 'najniza-cena',
    },
    {
      label: 'Najvišoj ceni',
      url: `/pokloni?${createQueryString({ addParams: [{ name: 'sortiranje', value: 'najvisa-cena' }] })}`,
      value: 'najvisa-cena',
    },
  ]

  let orderingLabel: string

  switch (optimisticSort) {
    case 'najvisa-cena':
      orderingLabel = 'Najvišoj ceni'
      break
    case 'najniza-cena':
      orderingLabel = 'Najnižoj ceni'
      break
    case 'najnoviji':
      orderingLabel = 'Najnovijim'
      break
    default:
      orderingLabel = 'Najnovijim'
  }

  return (
    <div
      data-pending-products={isPending ? '' : undefined}
      className='flex justify-between'
    >
      <h2 className='text-xl font-bold'>Pokloni</h2>

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
}
