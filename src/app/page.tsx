import { Suspense } from 'react'
import Banners, { BannersSkeleton } from './_components/banners/Banners'
import { getActiveBanners } from '@/data/services/banners'
import Benefits from './_components/benefits/Benefits'

export default function Landing() {
  const bannersPromise = getActiveBanners()
  return (
    <div className='space-y-10'>
      <Suspense fallback={<BannersSkeleton />}>
        <Banners bannersPromise={bannersPromise} />
      </Suspense>
      <Benefits />
    </div>
  )
}
