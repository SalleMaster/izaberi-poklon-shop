import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { getDiscounts } from '@/data/services/discounts'
import DiscountCard, { DiscountCardSkeleton } from './_components/DiscountCard'
import { Separator } from '@/components/ui/separator'

export default async function DiscountsPage() {
  const activeDiscounts = await getDiscounts({ active: true })
  const inactiveDiscounts = await getDiscounts({ active: false })

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Popusti</h2>

      <Separator />
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
    </div>
  )
}

export function DiscountsPageSkeleton() {
  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Popusti</h2>

      <Separator />
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
    </div>
  )
}
