import RetryPaymentButton from '@/app/(shop)/payment/[orderId]/result/_components/RetryPaymentButton'
import { NotificationAlert } from '@/components/custom/NotificationAlert'

type Props = {
  orderId: string
}

export default function OrderDraftDetails({ orderId }: Props) {
  return (
    <div className='flex flex-col space-y-2.5'>
      <NotificationAlert
        title='Obaveštenje'
        description='Porudžbina je kreirana ali transakcija nije izvršena. Porudžbinu možete završiti klikom na dugme ispod gde ćete biti preusmereni na stranicu za plaćanje i tako dovršiti kreiranje porudžbine. Ukoliko se transakcija ne izvrši u roku od 48h, porudžbina će biti automatski otkazana.'
        variant='info'
      />
      <div className='ml-auto'>
        <RetryPaymentButton orderId={orderId} label='Plaćanje' />
      </div>
    </div>
  )
}
