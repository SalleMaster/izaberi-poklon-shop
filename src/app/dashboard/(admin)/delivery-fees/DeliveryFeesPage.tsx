import { NotificationAlert } from '@/components/custom/NotificationAlert'
import DeliveryFeeCard, {
  DeliveryFeeCardSkeleton,
} from './_components/DeliveryFeeCard'
import { GetDeliveryFeesReturnType } from '@/data/services/deliveryFees'
import { use } from 'react'

type Props = {
  deliveryFeesPromise: GetDeliveryFeesReturnType
}

export default function DeliveryFeesPage({ deliveryFeesPromise }: Props) {
  const deliveryFees = use(deliveryFeesPromise)

  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Nova</h2>
        <DeliveryFeeCard />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Kreirane</h2>
        {deliveryFees.length > 0 ? (
          deliveryFees.map((deliveryFee) => (
            <DeliveryFeeCard key={deliveryFee.id} deliveryFee={deliveryFee} />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema kreiranih cena poštarine.'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

export function DeliveryFeesPageSkeleton() {
  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Nova</h2>
        <DeliveryFeeCardSkeleton />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Kreirane</h2>
        <DeliveryFeeCardSkeleton />
        <DeliveryFeeCardSkeleton />
        <DeliveryFeeCardSkeleton />
      </div>
    </div>
  )
}
