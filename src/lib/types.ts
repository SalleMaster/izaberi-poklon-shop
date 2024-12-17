export const OrderSortingLabels = {
  Newest: 'Najnovijim',
  Oldest: 'Najstarijim',
} as const

export const OrderSortingValues = {
  Newest: 'najnovije',
  Oldest: 'najstarije',
} as const

export type OrderSortingLabel =
  (typeof OrderSortingLabels)[keyof typeof OrderSortingLabels]
export type OrderSortingValue =
  (typeof OrderSortingValues)[keyof typeof OrderSortingValues]

export type OrderSortingOptions = {
  label: OrderSortingLabel
  value: OrderSortingValue
}

export const OrderStatusLabels = {
  Pending: 'Primljene',
  Processing: 'U obradi',
  Shipped: 'Poslate',
  Delivered: 'Dostavljene',
  Canceled: 'Otkazane',
  All: 'Sve',
} as const

export type OrderStatusLabel =
  (typeof OrderStatusLabels)[keyof typeof OrderStatusLabels]

export const PaginationDisplayValues = {
  small: '10',
  medium: '30',
  large: '50',
  extraLarge: '100',
} as const

export type PaginationDisplayValue =
  (typeof PaginationDisplayValues)[keyof typeof PaginationDisplayValues]
