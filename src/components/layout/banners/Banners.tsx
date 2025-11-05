import { getBanners } from '@/data/services/banners'
import BannersCarousel from './BannersCarousel'
import { cacheTag } from 'next/cache'

export default async function Banners() {
  'use cache'

  cacheTag('banners')
  const banners = await getBanners({ active: true })

  if (!banners.length) {
    return null
  }

  return <BannersCarousel banners={banners} />
}
