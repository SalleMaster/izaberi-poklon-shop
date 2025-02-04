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
      'termsAccepted',
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
  shortDescription: 'Red Dot PR Milanović Zoran',
  description:
    'Red Dot PR Milanović Zoran zanatska radnja za izradu personalizovanih poklona i reklamnog materijala',
  address: 'Pavla Vujisića 12, 34300 Aranđelovac, Srbija',
  pib: '111521702',
  bankAccountNumber: '325-9500700034631-92',
  idNumber: '65473488',
  phone: '061 2251 225',
  email: 'red@dot.com',
  pickupAddress: 'Pavla Vujisića 12, 34300 Aranđelovac',
  facebook: 'https://www.facebook.com',
  instagram: 'https://www.instagram.com',
  tikTok: 'https://www.tiktok.com',
} as const

export const orderQuitForm = {
  label: 'Obrazac za odustanak',
  fileName: 'Obrazac za odustanak.pdf',
  url: `${process.env.AWS_BUCKET_URL}/obrazac-za-odustanak.pdf`,
} as const

export const onlinePurchaseContract = {
  label: 'Ugovor o kupovini na daljinu - Red Dot',
  fileName: 'Ugovor o kupovini na daljinu - Red Dot.pdf',
  url: `${process.env.AWS_BUCKET_URL}/ugovor-o-kupovini-na-daljinu-red-dot.pdf`,
} as const
