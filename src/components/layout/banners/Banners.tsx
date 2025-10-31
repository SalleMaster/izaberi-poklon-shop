import { getBanners } from '@/data/services/banners'
import BannersCarousel from './BannersCarousel'

export default async function Banners() {
  'use cache'
  const banners = await getBanners({ active: true })

  if (!banners.length) {
    return null
  }

  return <BannersCarousel banners={banners} />
}
