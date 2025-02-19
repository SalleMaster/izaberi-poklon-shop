import { use } from 'react'
import { BannerWithImageType } from '@/data/services/banners'
import BannersCarousel from './BannersCarousel'

type Props = {
  bannersPromise: Promise<BannerWithImageType[]>
}

export default function Banners({ bannersPromise }: Props) {
  const banners = use(bannersPromise)

  if (!banners.length) {
    return null
  }

  return <BannersCarousel banners={banners} />
}
