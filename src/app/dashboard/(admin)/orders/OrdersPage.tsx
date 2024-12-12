'use client'

import { use, useTransition } from 'react'
import {
  GetAllOrdersReturnType,
  OrderCartItemWithRelations,
  OrderCartWithRelations,
} from '@/data/services/order'
import {
  FontType,
  Order,
  OrderDeliveryType,
  OrderPaymentType,
} from '@prisma/client'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Clock4, Euro } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { format } from 'date-fns'
import { srLatn } from 'date-fns/locale'
import Link from 'next/link'
import Image from 'next/image'
import { fallbackImageURL } from '@/lib/consts'
import { priceFormatter } from '@/lib/format'
import { Separator } from '@/components/ui/separator'

type Props = {
  ordersPromise: GetAllOrdersReturnType
}

export default function OrdersPage({ ordersPromise }: Props) {
  const orders = use(ordersPromise)
  const [isPending] = useTransition()

  return (
    <div className={cn('space-y-10', isPending && 'animate-pulse')}>
      <h2 className='text-xl font-bold'>Porudžbine</h2>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Sve porudžbine</h2>
        {orders.length ? (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema porudžbina'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

type OrderCardProps = {
  order: Order
}

function OrderCard({ order }: OrderCardProps) {
  const orderFormattedTotalPrice = priceFormatter(order.orderTotalPrice)
  const orderFormattedOnlinePrice = priceFormatter(order.orderOnlinePrice)
  const orderFormattedDiscount = priceFormatter(order.orderDiscount)
  const orderFormattedDeliveryFee = priceFormatter(order.orderDeliveryFee)
  const orderFormattedCreatedAt = format(order.createdAt, 'PPpp', {
    locale: srLatn,
  })
  return (
    <Card>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem value={order.id} className='border-b-0'>
          <AccordionTrigger>
            <div className='w-full grid gap-3 sm:grid-cols-2'>
              <div className='flex items-center gap-4'>
                <Clock4 />
                <p className='font-semibold'>{orderFormattedCreatedAt}</p>
              </div>
              <div className='flex items-center gap-4'>
                <Euro />
                <p className='font-semibold'>{orderFormattedTotalPrice}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CartDetails
              order={order}
              cart={order.cart as unknown as OrderCartWithRelations}
              orderFormattedTotalPrice={orderFormattedTotalPrice}
              orderFormattedOnlinePrice={orderFormattedOnlinePrice}
              orderFormattedDiscount={orderFormattedDiscount}
              orderFormattedDeliveryFee={orderFormattedDeliveryFee}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

type CartDetailsProps = {
  order: Order
  cart: OrderCartWithRelations
  orderFormattedTotalPrice: string
  orderFormattedOnlinePrice: string
  orderFormattedDiscount: string
  orderFormattedDeliveryFee: string
}

function CartDetails({
  order,
  cart,
  orderFormattedTotalPrice,
  orderFormattedOnlinePrice,
  orderFormattedDiscount,
  orderFormattedDeliveryFee,
}: CartDetailsProps) {
  return (
    <div className='space-y-4'>
      <div className='border rounded-xl p-4 space-y-2.5'>
        {cart.items.map((cartItem) => (
          <div key={cartItem.id} className='group space-y-4'>
            <CartItem cartItem={cartItem} />
            <Separator className='group-last-of-type:hidden' />
          </div>
        ))}
      </div>
      <OrderSummary
        order={order}
        orderFormattedTotalPrice={orderFormattedTotalPrice}
        orderFormattedOnlinePrice={orderFormattedOnlinePrice}
        orderFormattedDiscount={orderFormattedDiscount}
        orderFormattedDeliveryFee={orderFormattedDeliveryFee}
      />
    </div>
  )
}

type CartItemProps = {
  cartItem: OrderCartItemWithRelations
}

function CartItem({ cartItem }: CartItemProps) {
  let fontTypeText
  switch (cartItem.fontType) {
    case FontType.cyrillic:
      fontTypeText = 'Ćirilica'
      break
    case FontType.latin:
      fontTypeText = 'Latinica'
      break
    default:
      fontTypeText = 'Nepoznato pismo, proveriti sa kupcem'
  }

  const formattedSinglePrice = priceFormatter(
    cartItem.price / cartItem.quantity
  )
  const formattedTotalPrice = priceFormatter(cartItem.price)

  return (
    <div className='space-y-2.5'>
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
          <p className='text-muted-foreground'>Cena: {formattedSinglePrice}</p>
        </div>
        <p className='font-semibold ml-auto'>{formattedTotalPrice}</p>
      </div>
      <div className='grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
        <div>
          <p className='font-semibold'>
            Šifra:{' '}
            <span className='font-medium text-muted-foreground'>
              {cartItem.product.code}
            </span>
          </p>
        </div>
        <div>
          <p className='font-semibold'>
            Pismo:{' '}
            <span className='font-medium text-muted-foreground'>
              {fontTypeText}
            </span>
          </p>
        </div>
      </div>
      {cartItem.textPersonalizations.length > 0 ? (
        <div className='grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
          {cartItem.textPersonalizations.map((personalization) => (
            <div key={personalization.id}>
              <p className='font-semibold'>
                {personalization.name}:{' '}
                <span className='font-medium text-muted-foreground'>
                  {personalization.value}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : null}
      {cartItem.imagePersonalizations.length > 0 ? (
        <div className='grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 lg:gap-4'>
          {cartItem.imagePersonalizations.map((personalization) => (
            <div key={personalization.id}>
              <p className='font-semibold'>
                {personalization.name}:{' '}
                <span className='font-medium text-muted-foreground'>
                  {personalization.images
                    ?.map((image) => image.name)
                    .join(', ')}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

type OrderSummaryProps = {
  order: Order
  orderFormattedTotalPrice: string
  orderFormattedOnlinePrice: string
  orderFormattedDiscount: string
  orderFormattedDeliveryFee: string
}

function OrderSummary({
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
              <p className='text-muted-foreground'>
                Izaberi poklon shop adresa za preuzimanje
              </p>
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
          <p className='font-semibold'>Cena za online plaćanje</p>
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

export function OrdersPageSkeleton() {
  return <p>Orders skeleton</p>
}
