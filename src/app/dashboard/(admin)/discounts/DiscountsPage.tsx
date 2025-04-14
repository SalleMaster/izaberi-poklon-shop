import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { GetDiscountsReturnType } from '@/data/services/discounts'
import { use } from 'react'
import DiscountCard, { DiscountCardSkeleton } from './_components/DiscountCard'

type Props = {
  activeDiscountsPromise: GetDiscountsReturnType
  inactiveDiscountsPromise: GetDiscountsReturnType
}

export default function DiscountsPage({
  activeDiscountsPromise,
  inactiveDiscountsPromise,
}: Props) {
  const activeDiscounts = use(activeDiscountsPromise)
  const inactiveDiscounts = use(inactiveDiscountsPromise)

  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Novi</h2>
        <DiscountCard />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Aktivni</h2>
        {activeDiscounts.length > 0 ? (
          activeDiscounts.map((discount) => (
            <DiscountCard key={discount.id} discount={discount} />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema aktivnih popusta'
            variant='info'
          />
        )}
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Neaktivni</h2>
        {inactiveDiscounts.length > 0 ? (
          inactiveDiscounts.map((discount) => (
            <DiscountCard key={discount.id} discount={discount} />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema neaktivnih popusta'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

export function DiscountsPageSkeleton() {
  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Novi</h2>
        <DiscountCardSkeleton />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Aktivni</h2>
        <DiscountCardSkeleton />
        <DiscountCardSkeleton />
        <DiscountCardSkeleton />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Neaktivni</h2>
        <DiscountCardSkeleton />
        <DiscountCardSkeleton />
        <DiscountCardSkeleton />
      </div>
    </div>
  )
}
