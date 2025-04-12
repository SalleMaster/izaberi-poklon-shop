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

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type OrderByType = { createdAt: 'desc' } | { createdAt: 'asc' }

export default async function Page(props: { searchParams: SearchParams }) {
  const { userId, userRole } = await pageGuard({
    adminGuard: true,
    callbackUrl: '/admin/korisnici',
  })

  const searchParams = await props.searchParams
  const { sortiranje, rola, stranica, prikazi } = searchParams

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
