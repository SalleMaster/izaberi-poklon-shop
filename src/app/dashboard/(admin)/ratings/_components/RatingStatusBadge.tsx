import { Badge } from '@/components/ui/badge'
import { ratingStatusOptions } from '@/lib/consts'
import { RatingStatusType } from '@/generated/prisma'

type Props = {
  status: RatingStatusType
}

export function RatingStatusBadge({ status }: Props) {
  const badge = ratingStatusOptions.find((option) => option.value === status)

  return (
    badge && (
      <Badge variant={badge.variant} className='mr-auto'>
        {badge.label}
      </Badge>
    )
  )
}
