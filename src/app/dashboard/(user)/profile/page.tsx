import { Metadata } from 'next'
import ProfilePage, { ProfilePageSkeleton } from './ProfilePage'
import pageGuard from '@/lib/pageGuard'
import { getUserProfile } from '@/data/services/user'
import { Suspense } from 'react'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Moji podaci | Profil',
}

export default async function Page() {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageLoader />
    </Suspense>
  )
}

async function PageLoader() {
  const { userId } = await pageGuard({ callbackUrl: '/profil/moji-podaci' })
  const userProfilePromise = getUserProfile({ id: userId || '' })

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Moji podaci</h2>

      <Separator />

      <ProfilePage userProfilePromise={userProfilePromise} />
    </div>
  )
}

function PageFallback() {
  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Moji podaci</h2>

      <Separator />

      <ProfilePageSkeleton />
    </div>
  )
}
