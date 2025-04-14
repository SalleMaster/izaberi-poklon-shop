import { use } from 'react'
import { GetBannersReturnType } from '@/data/services/banners'
import BannersCarousel from './BannersCarousel'

type Props = {
  bannersPromise: GetBannersReturnType
}

export default function Banners({ bannersPromise }: Props) {
  const banners = use(bannersPromise)

  if (!banners.length) {
    return null
  }

  return <BannersCarousel banners={banners} />
}
