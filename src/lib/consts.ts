import { generateQuantityOptions } from './product-utils'

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
