import { Metadata } from 'next'
import { Suspense } from 'react'
import pageGuard from '@/lib/pageGuard'
import { Separator } from '@/components/ui/separator'
import { getUser } from '@/data/services/user'
import UserPage, { UserPageSkeleton } from './UserPage'

export const metadata: Metadata = {
  title: 'Detalji korisnika | Admin',
}

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const { id } = params

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

      <Suspense fallback={<UserPageSkeleton />}>
        <UserPage promise={userPromise} />
      </Suspense>
    </div>
  )
}
