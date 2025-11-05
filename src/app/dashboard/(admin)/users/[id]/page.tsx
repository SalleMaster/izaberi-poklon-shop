import { Metadata } from 'next'
import { Suspense } from 'react'
import pageGuard from '@/lib/pageGuard'
import { Separator } from '@/components/ui/separator'
import { getUser } from '@/data/services/user'
import UserPage, { UserPageSkeleton } from './UserPage'

export const metadata: Metadata = {
  title: 'Detalji korisnika | Admin',
}

export default async function Page({
  params,
}: PageProps<'/dashboard/users/[id]'>) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageLoader params={params} />
    </Suspense>
  )
}

async function PageLoader({
  params,
}: Pick<PageProps<'/dashboard/users/[id]'>, 'params'>) {
  const { id } = await params

  await pageGuard({
    callbackUrl: `/admin/korisnici/${id}`,
    adminGuard: true,
  })

  const userPromise = getUser({
    id,
  })

  return (
    <div className='space-y-5 group'>
      <h2 className='text-xl font-bold'>Detalji korisnika</h2>

      <Separator />

      <UserPage promise={userPromise} />
    </div>
  )
}

function PageFallback() {
  return (
    <div className='space-y-5 group'>
      <h2 className='text-xl font-bold'>Detalji korisnika</h2>

      <Separator />

      <UserPageSkeleton />
    </div>
  )
}
