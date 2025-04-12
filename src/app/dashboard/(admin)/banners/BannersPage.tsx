'use client'

import { NotificationAlert } from '@/components/custom/NotificationAlert'
import {
  GetActiveBannersReturnType,
  GetInactiveBannersReturnType,
} from '@/data/services/banners'
import { use, useEffect } from 'react'
import BannerCard, { BannerCardSkeleton } from './_components/BannerCard'

type Props = {
  activeBannersPromise: GetActiveBannersReturnType
  inactiveBannersPromise: GetInactiveBannersReturnType
}

export default function BannersPage({
  activeBannersPromise,
  inactiveBannersPromise,
}: Props) {
  const activeBanners = use(activeBannersPromise)
  const inactiveBanners = use(inactiveBannersPromise)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeBanners, inactiveBanners])

  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Novi</h2>
        <BannerCard />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Aktivni</h2>
        {activeBanners.length > 0 ? (
          activeBanners.map((banner) => (
            <BannerCard key={banner.id} banner={banner} />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema aktivnih banera'
            variant='info'
          />
        )}
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Neaktivni</h2>
        {inactiveBanners.length > 0 ? (
          inactiveBanners.map((banner) => (
            <BannerCard key={banner.id} banner={banner} />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema neaktivnih banera'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

export function BannersPageSkeleton() {
  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Novi</h2>
        <BannerCardSkeleton />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Aktivni</h2>
        <BannerCardSkeleton />
        <BannerCardSkeleton />
        <BannerCardSkeleton />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Neaktivni</h2>
        <BannerCardSkeleton />
        <BannerCardSkeleton />
        <BannerCardSkeleton />
      </div>
    </div>
  )
}
