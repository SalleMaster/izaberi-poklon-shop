import { Suspense } from 'react'
import Banners, { BannersSkeleton } from './_components/banners/Banners'
import { getActiveBanners } from '@/data/services/banners'

export default function Landing() {
  const bannersPromise = getActiveBanners()
  return (
    <div>
      <Suspense fallback={<BannersSkeleton />}>
        <Banners bannersPromise={bannersPromise} />
      </Suspense>
    </div>
  )
}
