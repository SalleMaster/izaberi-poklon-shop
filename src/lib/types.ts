export const SortingLabels = {
  Newest: 'Najnovijim',
  Oldest: 'Najstarijim',
} as const

export const SortingValues = {
  Newest: 'najnovije',
  Oldest: 'najstarije',
} as const

// export type OrderSortingLabel =
//   (typeof SortingLabels)[keyof typeof SortingLabels]
// export type OrderSortingValue =
//   (typeof SortingValues)[keyof typeof SortingValues]

// export type OrderSortingOptions = {
//   label: OrderSortingLabel
//   value: OrderSortingValue
// }

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

export const RatingStatusLabels = {
  Pending: 'Kreirane',
  Approved: 'Odobrene',
  Rejected: 'Odbijene',
  All: 'Sve',
} as const

export type RatingStatusLabel =
  (typeof RatingStatusLabels)[keyof typeof RatingStatusLabels]
