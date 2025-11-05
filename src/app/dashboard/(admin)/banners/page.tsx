import { Metadata } from 'next'
import BannersPage, { BannersPageSkeleton } from './BannersPage'
import pageGuard from '@/lib/pageGuard'
import { getBanners } from '@/data/services/banners'
import { Separator } from '@/components/ui/separator'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Baneri | Admin',
}

export default async function Page() {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageLoader />
    </Suspense>
  )
}

async function PageLoader() {
  await pageGuard({ callbackUrl: '/admin/baneri', adminGuard: true })

  const activeBannersPromise = getBanners({ active: true })
  const inactiveBannersPromise = getBanners({ active: false })

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Baneri</h2>

      <Separator />

      <Suspense fallback={<BannersPageSkeleton />}>
        <BannersPage
          activeBannersPromise={activeBannersPromise}
          inactiveBannersPromise={inactiveBannersPromise}
        />
      </Suspense>
    </div>
  )
}

function PageFallback() {
  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Baneri</h2>

      <Separator />

      <BannersPageSkeleton />
    </div>
  )
}
