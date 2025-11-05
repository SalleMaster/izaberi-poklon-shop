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
  title: 'Recenzije | Admin',
}

type OrderByType = { createdAt: 'desc' } | { createdAt: 'asc' }

export default async function Page({
  searchParams,
}: PageProps<'/dashboard/ratings'>) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageLoader searchParams={searchParams} />
    </Suspense>
  )
}

async function PageLoader({
  searchParams,
}: Pick<PageProps<'/dashboard/ratings'>, 'searchParams'>) {
  await pageGuard({
    callbackUrl: '/admin/recenzije',
    adminGuard: true,
  })

  const { sortiranje, status, stranica, prikazi } = await searchParams

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

function PageFallback() {
  return (
    <div className='space-y-5 group'>
      <h2 className='text-xl font-bold'>Recenzije</h2>

      <Separator />

      <RatingsPageSkeleton />
    </div>
  )
}
