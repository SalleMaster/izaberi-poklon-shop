import { Metadata } from 'next'
import CouponsPage, { CouponsPageSkeleton } from './CouponsPage'
import pageGuard from '@/lib/pageGuard'
import { getCoupons } from '@/data/services/coupons'
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

  const activeCouponsPromise = getCoupons({ active: true })
  const inactiveCouponsPromise = getCoupons({ active: false })

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
