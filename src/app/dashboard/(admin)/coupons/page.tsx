import { Metadata } from 'next'
import CouponsPage, { CouponsPageSkeleton } from './CouponsPage'
import pageGuard from '@/lib/pageGuard'
import { getActiveCoupons, getInactiveCoupons } from '@/data/services/coupons'
import { Separator } from '@/components/ui/separator'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Kuponi | Admin',
}

export default async function Page() {
  await pageGuard({
    callbackUrl: '/admin/kuponi',
    adminGuard: true,
  })

  const activeCouponsPromise = getActiveCoupons()
  const inactiveCouponsPromise = getInactiveCoupons()

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Kuponi</h2>

      <Separator />

      <Suspense fallback={<CouponsPageSkeleton />}>
        <CouponsPage
          activeCouponsPromise={activeCouponsPromise}
          inactiveCouponsPromise={inactiveCouponsPromise}
        />
      </Suspense>
    </div>
  )
}
