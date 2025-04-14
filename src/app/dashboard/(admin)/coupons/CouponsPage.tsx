import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { GetCouponsReturnType } from '@/data/services/coupons'
import { use } from 'react'
import CouponCard, { CouponCardSkeleton } from './_components/CouponCard'

type Props = {
  activeCouponsPromise: GetCouponsReturnType
  inactiveCouponsPromise: GetCouponsReturnType
}

export default function CouponsPage({
  activeCouponsPromise,
  inactiveCouponsPromise,
}: Props) {
  const activeCoupons = use(activeCouponsPromise)
  const inactiveCoupons = use(inactiveCouponsPromise)

  return (
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
  )
}

export function CouponsPageSkeleton() {
  return (
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
  )
}
