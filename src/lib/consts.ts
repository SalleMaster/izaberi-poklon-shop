import { OrderStatusType, RatingStatusType } from '@prisma/client'
import { generateQuantityOptions } from './product-utils'
import { BadgeVariant } from '@/components/ui/badge'

export const fallbackImageLightURL = '/img/placeholder-image-light.png'
export const fallbackImageURL = '/img/placeholder-image.png'

export const quantityOptions = generateQuantityOptions({ min: 1, max: 500 })
export const priceTableQuantityOptions = generateQuantityOptions({
  min: 10,
  max: 500,
})

export const orderSteps = [
  {
    id: 'order-step-1',
    name: 'Korpa',
    fields: [],
  },
  {
    id: 'order-step-2',
    name: 'Način i adresa isporuke',
    fields: [
      'deliveryType',
      'selectedDeliveryAddressId',
      'pickupName',
      'pickupPhone',
      'pickupEmail',
    ],
  },
  {
    id: 'order-step-3',
    name: 'Plaćanje i adresa računa',
    fields: [
      'paymentType',
      'selectedBillingAddressId',
      'selectedDeliveryServiceId',
    ],
  },
  {
    id: 'order-step-4',
    name: 'Pregled porudžbine',
    fields: [],
  },
]

type OrderStatusOptionsType = {
  value: OrderStatusType
  label: string
  variant: BadgeVariant
}[]
export const orderStatusOptions: OrderStatusOptionsType = [
  {
    value: OrderStatusType.pending,
    label: 'Primljena',
    variant: 'info',
  },
  {
    value: OrderStatusType.processing,
    label: 'U obradi',
    variant: 'warning',
  },
  {
    value: OrderStatusType.shipped,
    label: 'Poslata',
    variant: 'success',
  },
  {
    value: OrderStatusType.delivered,
    label: 'Dostavljena',
    variant: 'success',
  },
  {
    value: OrderStatusType.canceled,
    label: 'Otkazana',
    variant: 'danger',
  },
]

type RatingStatusOptionsType = {
  value: RatingStatusType
  label: string
  variant: BadgeVariant
}[]

export const ratingStatusOptions: RatingStatusOptionsType = [
  {
    value: RatingStatusType.pending,
    label: 'Kreirana',
    variant: 'info',
  },
  {
    value: RatingStatusType.approved,
    label: 'Odobrena',
    variant: 'success',
  },
  {
    value: RatingStatusType.rejected,
    label: 'Odbijena',
    variant: 'danger',
  },
]

export const shopInfo = {
  name: 'Red Dot',
  description:
    'RED DOT PR MIlanović Zoran zanatska radnja za izradu personalizovanih poklona i reklamnog materijala',
  address: 'Pavla Vujisića 12, 34300 Aranđelovac',
  pib: '111521702',
  phone: '061 2251 225',
}
