import { OrderStatusType } from '@prisma/client'
import { generateQuantityOptions } from './product-utils'
import { BadgeVariant } from '@/components/ui/badge'

export const fallbackImageURL = `${process.env.AWS_BUCKET_URL}/fallback-image.png`

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
