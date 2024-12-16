export const OrderSortingLabels = {
  Najnovijim: 'Najnovijim',
  Najstarijim: 'Najstarijim',
} as const

export const OrderSortingValues = {
  Najnovije: 'najnovije',
  Najstarije: 'najstarije',
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
  Primljene: 'Primljene',
  UObradi: 'U obradi',
  Poslate: 'Poslate',
  Dostavljene: 'Dostavljene',
  Otkazane: 'Otkazane',
  Sve: 'Sve',
} as const

export type OrderStatusLabel =
  (typeof OrderStatusLabels)[keyof typeof OrderStatusLabels]
