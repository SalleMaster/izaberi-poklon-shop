'use client'

import { use, useOptimistic, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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

export default function CustomPaginationOld({ countPromise, pageUrl }: Props) {
  const count = use(countPromise)
  const searchParams = useSearchParams()
  const [optimisticPage, setOptimisticPage] = useOptimistic(
    searchParams.get('stranica') || '1'
  )
  const [isPending, startTransition] = useTransition()

  const createQueryString = useCreateQueryString(searchParams)

  const pageSize = Number(searchParams.get('prikazi')) || 10
  const totalPages = Math.ceil(count / pageSize)

  if (totalPages <= 1) {
    return null
  }

  const getPageNumbers = () => {
    const currentPage = Number(optimisticPage)
    const totalPageNumbers = 7 // Total number of pagination items (including dots)
    const totalBlocks = totalPageNumbers - 2 // Pages between first and last page

    if (totalPages <= totalPageNumbers) {
      // Show all pages
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    const pages: (number | string)[] = []

    const leftSiblingIndex = Math.max(currentPage - 1, 2)
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages - 1)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    const firstPageIndex = 1
    const lastPageIndex = totalPages

    if (!shouldShowLeftDots && shouldShowRightDots) {
      // Near the start
      const leftItemCount = totalBlocks - 1
      const leftRange = Array.from(
        { length: leftItemCount },
        (_, index) => index + 2
      )

      pages.push(firstPageIndex, ...leftRange, '...', lastPageIndex)
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      // Near the end
      const rightItemCount = totalBlocks - 1
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, index) => totalPages - rightItemCount + index + 1
      )

      pages.push(firstPageIndex, '...', ...rightRange)
      // Adjust the pages array to ensure it has totalPageNumbers items
      if (pages.length < totalPageNumbers) {
        const additionalPagesNeeded = totalPageNumbers - pages.length
        const extraPages = []
        for (let i = 1; i <= additionalPagesNeeded; i++) {
          extraPages.push(rightRange[0] - i)
        }
        pages.splice(2, 0, ...extraPages.reverse())
      }
    } else if (shouldShowLeftDots && shouldShowRightDots) {
      // In the middle
      const middleRange = Array.from(
        { length: totalBlocks - 2 },
        (_, index) => currentPage - Math.floor((totalBlocks - 2) / 2) + index
      )

      pages.push(firstPageIndex, '...', ...middleRange, '...', lastPageIndex)
    } else {
      // No dots needed
      const middleRange = Array.from(
        { length: totalPages - 2 },
        (_, index) => index + 2
      )

      pages.push(firstPageIndex, ...middleRange, lastPageIndex)
    }

    return pages
  }

  function getMobilePageNumbers() {
    const currentPage = Number(optimisticPage)
    const totalPages = Math.ceil(count / pageSize)

    if (totalPages <= 5) {
      // Show all pages if total pages are less than or equal to 5
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    const pages: (number | string)[] = []

    // Always include the first page
    pages.push(1)

    // Handle the case where the current page is 1, 2, or 3
    if (currentPage <= 3) {
      pages.push(2, 3)
      pages.push('...')
    } else if (currentPage >= totalPages - 2) {
      // Handle the case where the current page is near the end
      pages.push('...')
      pages.push(totalPages - 2, totalPages - 1)
    } else {
      // Handle the case where the current page is in the middle
      pages.push('...')
      pages.push(currentPage)
      pages.push('...')
    }

    // Always include the last page
    pages.push(totalPages)

    return pages
  }

  const pageNumbers = getPageNumbers()
  const mobilePageNumbers = getMobilePageNumbers()

  return (
    <>
      <Pagination
        data-pending-pagination={isPending ? '' : undefined}
        className='hidden sm:flex'
      >
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

          {pageNumbers.map((page, index) =>
            page === '...' ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`${pageUrl}?${createQueryString({
                    addParams: [
                      {
                        name: 'stranica',
                        value: page.toString(),
                      },
                    ],
                  })}`}
                  onClick={() => {
                    startTransition(() => {
                      setOptimisticPage(page.toString())
                    })
                  }}
                  isActive={Number(optimisticPage) === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

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

      <Pagination
        data-pending-pagination={isPending ? '' : undefined}
        className='sm:hidden'
      >
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
          {mobilePageNumbers.map((page, index) =>
            page === '...' ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationLink
                  href={`${pageUrl}?${createQueryString({
                    addParams: [
                      {
                        name: 'stranica',
                        value: page.toString(),
                      },
                    ],
                  })}`}
                  onClick={() => {
                    startTransition(() => {
                      setOptimisticPage(page.toString())
                    })
                  }}
                  isActive={Number(optimisticPage) === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}

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
    </>
  )
}
