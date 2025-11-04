import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { getCoupons } from '@/data/services/coupons'
import CouponCard, { CouponCardSkeleton } from './_components/CouponCard'
import { Separator } from '@/components/ui/separator'

export default async function CouponsPage() {
  const activeCoupons = await getCoupons({ active: true })
  const inactiveCoupons = await getCoupons({ active: false })

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Kuponi</h2>

      <Separator />
      <div className='space-y-10'>
        <div className='space-y-3'>
          <h2 className='text-lg font-medium'>Novi</h2>
          <CouponCard />
        </div>

        <div className='space-y-3'>
          <h2 className='text-lg font-medium'>Aktivni</h2>
          {activeCoupons.length > 0 ? (
            activeCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))
          ) : (
            <NotificationAlert
              title='Obaveštenje'
              description='Trenutno nema aktivnih kupona'
              variant='info'
            />
          )}
        </div>

        <div className='space-y-3'>
          <h2 className='text-lg font-medium'>Neaktivni</h2>
          {inactiveCoupons.length > 0 ? (
            inactiveCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} />
            ))
          ) : (
            <NotificationAlert
              title='Obaveštenje'
              description='Trenutno nema neaktivnih kupona'
              variant='info'
            />
          )}
        </div>
      </div>
    </div>
  )
}

export function CouponsPageSkeleton() {
  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Kuponi</h2>

      <Separator />
      <div className='space-y-10'>
        <div className='space-y-3'>
          <h2 className='text-lg font-medium'>Novi</h2>
          <CouponCardSkeleton />
        </div>

        <div className='space-y-3'>
          <h2 className='text-lg font-medium'>Aktivni</h2>
          <CouponCardSkeleton />
          <CouponCardSkeleton />
          <CouponCardSkeleton />
        </div>

        <div className='space-y-3'>
          <h2 className='text-lg font-medium'>Neaktivni</h2>
          <CouponCardSkeleton />
          <CouponCardSkeleton />
          <CouponCardSkeleton />
        </div>
      </div>
    </div>
  )
}
