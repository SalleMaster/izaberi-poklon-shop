import { Metadata } from 'next'
import { Suspense } from 'react'
import pageGuard from '@/lib/pageGuard'
import { Separator } from '@/components/ui/separator'
import { SortingValues } from '@/lib/types'
import CustomPagination from '@/components/custom/CustomPagination'
import { getUsers, getUsersCount } from '@/data/services/user'
import UsersHeader from './_components/UsersHeader'
import UsersPage, { UsersPageSkeleton } from './UsersPage'

export const metadata: Metadata = {
  title: 'Korisnici | Admin',
}

type OrderByType = { createdAt: 'desc' } | { createdAt: 'asc' }

export default async function Page({
  searchParams,
}: PageProps<'/dashboard/users'>) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageLoader searchParams={searchParams} />
    </Suspense>
  )
}

async function PageLoader({
  searchParams,
}: Pick<PageProps<'/dashboard/users'>, 'searchParams'>) {
  await pageGuard({
    adminGuard: true,
    callbackUrl: '/admin/korisnici',
  })

  const { sortiranje, rola, stranica, prikazi } = await searchParams

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

  const usersPromise = getUsers({
    orderBy,
    role: rola,
    skip,
    take,
  })
  const usersCountPromise = getUsersCount({ role: rola })

  return (
    <div className='space-y-5 group'>
      <UsersHeader />

      <Separator />

      <Suspense fallback={<UsersPageSkeleton />}>
        <UsersPage usersPromise={usersPromise} />
        <CustomPagination
          countPromise={usersCountPromise}
          pageUrl='/admin/korisnici'
        />
      </Suspense>
    </div>
  )
}

function PageFallback() {
  return (
    <div className='space-y-5 group'>
      <h2 className='text-xl font-bold'>Korisnici</h2>

      <Separator />

      <UsersPageSkeleton />
    </div>
  )
}
