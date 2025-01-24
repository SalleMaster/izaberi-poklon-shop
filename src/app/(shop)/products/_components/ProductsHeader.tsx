'use client'

import { useSearchParams, useRouter } from 'next/navigation'
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
import { PaginationDisplayValues } from '@/lib/types'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SlidersHorizontal } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

export default function ProductsHeader() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [optimisticSort, setOptimisticSort] = useOptimistic(
    searchParams.get('sortiranje')
  )
  const [optimisticDisplay, setOptimisticDisplay] = useOptimistic(
    searchParams.get('prikazi')
  )
  const [optimisticTrending, setOptimisticTrending] = useOptimistic(
    searchParams.get('aktuelno')
  )

  const createQueryString = useCreateQueryString(searchParams)

  const paginationDisplayOptions = [
    {
      label: PaginationDisplayValues.small,
      url: `/pokloni?${createQueryString({
        addParams: [
          { name: 'prikazi', value: PaginationDisplayValues.small },
          { name: 'stranica', value: '1' },
        ],
      })}`,
      value: PaginationDisplayValues.small,
    },
    {
      label: PaginationDisplayValues.medium,
      url: `/pokloni?${createQueryString({
        addParams: [
          { name: 'prikazi', value: PaginationDisplayValues.medium },
          { name: 'stranica', value: '1' },
        ],
      })}`,
      value: PaginationDisplayValues.medium,
    },
    {
      label: PaginationDisplayValues.large,
      url: `/pokloni?${createQueryString({
        addParams: [
          { name: 'prikazi', value: PaginationDisplayValues.large },
          { name: 'stranica', value: '1' },
        ],
      })}`,
      value: PaginationDisplayValues.large,
    },
    {
      label: PaginationDisplayValues.extraLarge,
      url: `/pokloni?${createQueryString({
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

  let trending

  switch (optimisticTrending) {
    case 'da':
      trending = true
      break
    case 'ne':
      trending = false
      break
    default:
      trending = false
  }

  const handleTrendingChange = (checked: boolean) => {
    startTransition(() => {
      setOptimisticTrending(checked ? 'da' : 'ne')
    })
    router.push(
      `/pokloni?${createQueryString({ addParams: [{ name: 'aktuelno', value: checked ? 'da' : 'ne' }] })}`
    )
  }

  const filters = (
    <div className='space-y-4 md:space-y-0 md:flex md:space-x-4 items-center'>
      <div className='flex items-center'>
        <span className='mr-2'>Samo aktuelno:</span>
        <Switch checked={trending} onCheckedChange={handleTrendingChange} />
      </div>
      <Separator className='md:hidden' />
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
      data-pending-products={isPending ? '' : undefined}
      className='space-y-2.5 md:space-y-0 md:flex md:justify-between'
    >
      <h2 className='text-xl font-bold'>Pokloni</h2>

      <div className='hidden md:block'>{filters}</div>

      <Card className='md:hidden'>
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
