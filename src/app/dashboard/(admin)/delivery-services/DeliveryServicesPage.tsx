import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { GetDeliveryServicesReturnType } from '@/data/services/delivery-services'
import { use } from 'react'
import DeliveryServiceCard, {
  DeliveryServiceCardSkeleton,
} from './_components/DeliveryServiceCard'

type Props = {
  activeDeliveryServicesPromise: GetDeliveryServicesReturnType
  inactiveDeliveryServicesPromise: GetDeliveryServicesReturnType
}

export default function DeliveryServicesPage({
  activeDeliveryServicesPromise,
  inactiveDeliveryServicesPromise,
}: Props) {
  const activeDeliveryServices = use(activeDeliveryServicesPromise)
  const inactiveDeliveryServices = use(inactiveDeliveryServicesPromise)

  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Nova</h2>
        <DeliveryServiceCard />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Aktivne</h2>
        {activeDeliveryServices.length > 0 ? (
          activeDeliveryServices.map((deliveryService) => (
            <DeliveryServiceCard
              key={deliveryService.id}
              deliveryService={deliveryService}
            />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema aktivnih kurirskih službi'
            variant='info'
          />
        )}
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Neaktivne</h2>
        {inactiveDeliveryServices.length > 0 ? (
          inactiveDeliveryServices.map((deliveryService) => (
            <DeliveryServiceCard
              key={deliveryService.id}
              deliveryService={deliveryService}
            />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema neaktivnih kurirskih službi'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

export function DeliveryServicesPageSkeleton() {
  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Nova</h2>
        <DeliveryServiceCardSkeleton />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Aktivne</h2>
        <DeliveryServiceCardSkeleton />
        <DeliveryServiceCardSkeleton />
        <DeliveryServiceCardSkeleton />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Neaktivne</h2>
        <DeliveryServiceCardSkeleton />
        <DeliveryServiceCardSkeleton />
      </div>
    </div>
  )
}
