import { Separator } from '@/components/ui/separator'
import { shopInfo } from '@/lib/consts'
import { Order, OrderDeliveryType, OrderPaymentType } from '@/generated/prisma'

type OrderSummaryProps = {
  order: Order
  orderFormattedTotalPrice: string
  orderFormattedOnlinePrice: string
  orderFormattedDiscount: string
  orderFormattedDeliveryFee: string
}

export function OrderSummary({
  order,
  orderFormattedTotalPrice,
  orderFormattedOnlinePrice,
  orderFormattedDiscount,
  orderFormattedDeliveryFee,
}: OrderSummaryProps) {
  let paymentTypeText
  switch (order.paymentType) {
    case OrderPaymentType.card:
      paymentTypeText = 'Plaćanje platnom karticom'
      break
    case OrderPaymentType.onDelivery:
      paymentTypeText = 'Plaćanje prilikom preuzimanja'
      break
    default:
      paymentTypeText = 'Nepoznat način plaćanja'
  }

  let deliveryTypeText
  switch (order.deliveryType) {
    case OrderDeliveryType.delivery:
      deliveryTypeText = 'Na kućnu adresu'
      break
    case OrderDeliveryType.pickup:
      deliveryTypeText = 'Lično preuzimanje'
      break
    default:
      deliveryTypeText = 'Nepoznat način isporuke'
  }

  const sameBillingAddress =
    order.deliveryType === OrderDeliveryType.delivery &&
    order.billingAddress === order.deliveryAddress &&
    order.billingCity === order.deliveryCity &&
    order.billingZip === order.deliveryZip &&
    order.billingPhone === order.deliveryPhone &&
    order.billingEmail === order.deliveryEmail

  return (
    <div className='border rounded-xl p-4 space-y-2.5'>
      <div className='grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
        <div>
          <p className='font-semibold'>Način plaćanja</p>
          <p className='text-muted-foreground'>{paymentTypeText}</p>
        </div>
        <div>
          <p className='font-semibold'>Način isporuke</p>
          <p className='text-muted-foreground'>{deliveryTypeText}</p>
        </div>
        {order.deliveryType === OrderDeliveryType.delivery ? (
          <>
            <div>
              <p className='font-semibold'>Kurirska služba</p>
              <p className='text-muted-foreground'>
                {order.deliveryServiceName}
              </p>
            </div>
            <>
              <div>
                <p className='font-semibold'>Adresa isporuke</p>
                <p className='text-muted-foreground'>{order.deliveryName}</p>
                <p className='text-muted-foreground'>{order.deliveryAddress}</p>
                <p className='text-muted-foreground'>
                  {order.deliveryZip} {order.deliveryCity}
                </p>
                <p className='text-muted-foreground'>{order.deliveryPhone}</p>
                <p className='text-muted-foreground'>{order.deliveryEmail}</p>
                {order.deliveryNote ? (
                  <p className='text-muted-foreground'>
                    Napomena: {order.deliveryNote}
                  </p>
                ) : null}
              </div>

              <div>
                <p className='font-semibold'>Adresa računa</p>
                {sameBillingAddress ? (
                  <p className='text-muted-foreground'>
                    Adresa računa je identična adresi dostave.
                  </p>
                ) : (
                  <>
                    <p className='text-muted-foreground'>{order.billingName}</p>
                    <p className='text-muted-foreground'>
                      {order.billingAddress}
                    </p>
                    <p className='text-muted-foreground'>
                      {order.billingZip} {order.billingCity}
                    </p>
                    <p className='text-muted-foreground'>
                      {order.billingPhone}
                    </p>
                    <p className='text-muted-foreground'>
                      {order.billingEmail}
                    </p>
                    {order.billingNote ? (
                      <p className='text-muted-foreground'>
                        Napomena: {order.billingNote}
                      </p>
                    ) : null}
                  </>
                )}
              </div>
            </>
          </>
        ) : null}

        {order.deliveryType === OrderDeliveryType.pickup ? (
          <>
            <div>
              <p className='font-semibold'>Adresa isporuke</p>
              <p className='text-muted-foreground'>{shopInfo.pickupAddress}</p>
            </div>
            <div>
              <p className='font-semibold'>
                Podaci korisnika koji zaključuje kupovinu
              </p>
              <p className='text-muted-foreground'>{order.pickupName}</p>
              <p className='text-muted-foreground'>{order.pickupPhone}</p>
              <p className='text-muted-foreground'>{order.pickupEmail}</p>
            </div>
          </>
        ) : null}
      </div>

      <Separator />

      <div className='grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
        <div>
          <p className='font-semibold'>Cena korpe</p>
          <p className='text-muted-foreground'>{orderFormattedOnlinePrice}</p>
        </div>
        <div>
          <p className='font-semibold'>Popust</p>
          <p className='text-muted-foreground'>{orderFormattedDiscount}</p>
        </div>
        <div>
          <p className='font-semibold'>Poštarina</p>
          <p className='text-muted-foreground'>{orderFormattedDeliveryFee}</p>
        </div>
        <div>
          <p className='font-semibold'>Iznos kupovine</p>
          <p className='text-muted-foreground'>{orderFormattedTotalPrice}</p>
        </div>
      </div>
    </div>
  )
}
