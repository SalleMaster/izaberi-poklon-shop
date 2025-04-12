export const SortingLabels = {
  Newest: 'Najnovijim',
  Oldest: 'Najstarijim',
} as const

export const SortingValues = {
  Newest: 'najnovije',
  Oldest: 'najstarije',
} as const

export const OrderStatusLabels = {
  Draft: 'Nedovršene',
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

export const ResponseStatus = {
  success: 'success',
  fail: 'fail',
} as const

export type ResponseStatusType =
  (typeof ResponseStatus)[keyof typeof ResponseStatus]

export const UserRoleLabels = {
  Admin: 'Admin',
  Korisnik: 'Korisnik',
  All: 'Sve',
} as const

export type UserRoleLabel = (typeof UserRoleLabels)[keyof typeof UserRoleLabels]
