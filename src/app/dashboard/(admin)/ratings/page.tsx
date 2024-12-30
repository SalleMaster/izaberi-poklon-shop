import { Metadata } from 'next'
import { Suspense } from 'react'
import pageGuard from '@/lib/pageGuard'
import { Separator } from '@/components/ui/separator'
import { SortingValues } from '@/lib/types'
import CustomPagination from '@/components/custom/CustomPagination'
import { getRatings, getRatingsCount } from '@/data/services/ratings'
import RatingsHeader from './_components/RatingsHeader'
import RatingsPage, { RatingsPageSkeleton } from './RatingsPage'

export const metadata: Metadata = {
  title: 'Admin | Recenzije',
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type OrderByType = { createdAt: 'desc' } | { createdAt: 'asc' }

export default async function Page(props: { searchParams: SearchParams }) {
  await pageGuard({
    callbackUrl: '/admin/recenzije',
    adminGuard: true,
  })

  const searchParams = await props.searchParams
  const { sortiranje, status, stranica, prikazi } = searchParams

  let orderBy: OrderByType

  switch (sortiranje) {
    case SortingValues.Newest:
      orderBy = { createdAt: 'desc' }
      break
    case SortingValues.Oldest:
      orderBy = { createdAt: 'asc' }
      break
    default:
      orderBy = { createdAt: 'desc' }
  }

  const page = stranica ? Number(stranica) : 1
  const pageSize = prikazi ? Number(prikazi) : 10
  const skip = (page - 1) * pageSize
  const take = pageSize

  const ratingsPromise = getRatings({
    orderBy,
    status,
    skip,
    take,
  })

  const ratingsCountPromise = getRatingsCount({ status })

  return (
    <div className='space-y-5 group'>
      <RatingsHeader />

      <Separator />

      <Suspense fallback={<RatingsPageSkeleton />}>
        <RatingsPage ratingsPromise={ratingsPromise} />
        <CustomPagination
          countPromise={ratingsCountPromise}
          pageUrl='/admin/recenzije'
        />
      </Suspense>
    </div>
  )
}
