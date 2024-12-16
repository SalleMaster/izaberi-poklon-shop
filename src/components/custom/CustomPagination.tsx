'use client'

import { use, useOptimistic, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  //   PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import useCreateQueryString from '@/hooks/use-create-query-string'

type Props = {
  countPromise: Promise<number>
  pageUrl: string
}

export default function CustomPagination({ countPromise, pageUrl }: Props) {
  const count = use(countPromise)
  const searchParams = useSearchParams()
  const [optimisticPage, setOptimisticPage] = useOptimistic(
    searchParams.get('stranica') || '1'
  )
  const [isPending, startTransition] = useTransition()

  const createQueryString = useCreateQueryString(searchParams)

  //   const page = 1
  const pageSize = Number(searchParams.get('prikazi')) || 10 // Number of items per page
  const totalPages = Math.ceil(count / pageSize)

  return (
    <Pagination data-pending-pagination={isPending ? '' : undefined}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`${pageUrl}?${createQueryString({
              addParams: [
                {
                  name: 'stranica',
                  value: (Number(optimisticPage) - 1).toString(),
                },
              ],
            })}`}
            onClick={() => {
              startTransition(() => {
                setOptimisticPage((Number(optimisticPage) - 1).toString())
              })
            }}
            aria-disabled={Number(optimisticPage) <= 1}
            tabIndex={Number(optimisticPage) <= 1 ? -1 : undefined}
            className={
              Number(optimisticPage) <= 1
                ? 'pointer-events-none opacity-50'
                : undefined
            }
          />
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              isActive={Number(optimisticPage) === index + 1}
              href={`${pageUrl}?${createQueryString({
                addParams: [
                  { name: 'stranica', value: (index + 1).toString() },
                ],
              })}`}
              onClick={() => {
                startTransition(() => {
                  setOptimisticPage((index + 1).toString())
                })
              }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href={`${pageUrl}?${createQueryString({
              addParams: [
                {
                  name: 'stranica',
                  value: (Number(optimisticPage) + 1).toString(),
                },
              ],
            })}`}
            onClick={() => {
              startTransition(() => {
                setOptimisticPage((Number(optimisticPage) + 1).toString())
              })
            }}
            aria-disabled={Number(optimisticPage) >= totalPages}
            tabIndex={
              Number(optimisticPage) >= totalPages ? +totalPages : undefined
            }
            className={
              Number(optimisticPage) >= totalPages
                ? 'pointer-events-none opacity-50'
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
