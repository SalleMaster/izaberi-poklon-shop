import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CartItemWithRelations, CartWithRelations } from '@/data/services/cart'
import { fallbackImageURL } from '@/lib/consts'
import { priceFormatter } from '@/lib/format'
import {
  DeliveryAddress,
  OrderDeliveryType,
  OrderPaymentType,
} from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  optimisticCart: CartWithRelations | null
  deliveryType: OrderDeliveryType
  paymentType: OrderPaymentType
  pickupName?: string
  pickupPhone?: string
  pickupEmail?: string
  selectedDeliveryAddressId?: string
  selectedBillingAddressId?: string
  userAddresses: DeliveryAddress[]
}

export default function CartOrderSummary({
  optimisticCart,
  deliveryType,
  paymentType,
  pickupName = '',
  pickupPhone = '',
  pickupEmail = '',
  selectedDeliveryAddressId,
  selectedBillingAddressId,
  userAddresses,
}: Props) {
  let paymentTypeText
  switch (paymentType) {
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
  switch (deliveryType) {
    case OrderDeliveryType.delivery:
      deliveryTypeText = 'Na kućnu adresu'
      break
    case OrderDeliveryType.pickup:
      deliveryTypeText = 'Lično preuzimanje'
      break
    default:
      deliveryTypeText = 'Nepoznat način isporuke'
  }

  const selectedDeliveryAddress = userAddresses.find(
    (address) => address.id === selectedDeliveryAddressId
  )
  const selectedBillingAddress = userAddresses.find(
    (address) => address.id === selectedBillingAddressId
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl font-semibold'>
          Informacije o isporuci
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className='space-y-2.5'>
        <div>
          <p className='font-semibold'>Način plaćanja</p>
          <p className='text-muted-foreground'>{paymentTypeText}</p>
        </div>
        <div>
          <p className='font-semibold'>Način isporuke</p>
          <p className='text-muted-foreground'>{deliveryTypeText}</p>
        </div>
        {deliveryType === OrderDeliveryType.delivery &&
        selectedDeliveryAddress ? (
          <>
            <div>
              <p className='font-semibold'>Adresa isporuke</p>
              <p className='text-muted-foreground'>
                {selectedDeliveryAddress.name}
              </p>
              <p className='text-muted-foreground'>
                {selectedDeliveryAddress.address}
              </p>
              <p className='text-muted-foreground'>
                {selectedDeliveryAddress.zip} {selectedDeliveryAddress.city}
              </p>
              <p className='text-muted-foreground'>
                {selectedDeliveryAddress.phone}
              </p>
              <p className='text-muted-foreground'>
                {selectedDeliveryAddress.email}
              </p>
              {selectedDeliveryAddress.note ? (
                <p className='text-muted-foreground'>
                  Napomena: {selectedDeliveryAddress.note}
                </p>
              ) : null}
            </div>

            <div>
              <p className='font-semibold'>Adresa računa</p>
              {selectedBillingAddressId === selectedDeliveryAddressId ||
              selectedBillingAddressId === '' ? (
                <p className='text-muted-foreground'>
                  Adresa računa je identična adresi dostave.
                </p>
              ) : (
                <>
                  <p className='text-muted-foreground'>
                    {selectedBillingAddress?.name}
                  </p>
                  <p className='text-muted-foreground'>
                    {selectedBillingAddress?.address}
                  </p>
                  <p className='text-muted-foreground'>
                    {selectedBillingAddress?.zip} {selectedBillingAddress?.city}
                  </p>
                  <p className='text-muted-foreground'>
                    {selectedBillingAddress?.phone}
                  </p>
                  <p className='text-muted-foreground'>
                    {selectedBillingAddress?.email}
                  </p>
                  {selectedBillingAddress?.note && (
                    <p className='text-muted-foreground'>
                      Napomena: {selectedBillingAddress.note}
                    </p>
                  )}
                </>
              )}
            </div>
          </>
        ) : null}

        {deliveryType === OrderDeliveryType.pickup ? (
          <>
            <div>
              <p className='font-semibold'>Adresa isporuke</p>
              <p className='text-muted-foreground'>
                Izaberi poklon shop adresa za preuzimanje
              </p>
            </div>
            <div>
              <p className='font-semibold'>
                Podaci korisnika koji zaključuje kupovinu
              </p>
              <p className='text-muted-foreground'>{pickupName}</p>
              <p className='text-muted-foreground'>{pickupPhone}</p>
              <p className='text-muted-foreground'>{pickupEmail}</p>
            </div>
          </>
        ) : null}
      </CardContent>
      <CardHeader>
        <CardTitle className='text-2xl font-semibold'>Sadržaj korpe</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className='space-y-2.5'>
        {optimisticCart?.items.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </CardContent>
    </Card>
  )
}

type CartItemProps = {
  cartItem: CartItemWithRelations
}

function CartItem({ cartItem }: CartItemProps) {
  return (
    <div className='flex gap-4 items-center'>
      <Link
        href={`pokloni/${cartItem.product.id}`}
        className='flex gap-4 items-center'
      >
        <Image
          src={cartItem.product.coverImage?.url || fallbackImageURL}
          alt={cartItem.product.name}
          width={100}
          height={100}
        />
      </Link>
      <div>
        <p className='font-semibold'>{cartItem.product.name}</p>
        <p className='text-muted-foreground'>Količina: {cartItem.quantity}</p>
        <p className='text-muted-foreground'>
          Cena: {priceFormatter(cartItem.price / cartItem.quantity)}
        </p>
      </div>
      <p className='font-semibold ml-auto'>{priceFormatter(cartItem.price)}</p>
    </div>
  )
}
