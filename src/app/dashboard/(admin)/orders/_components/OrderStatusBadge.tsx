import { Badge } from '@/components/ui/badge'
import { orderStatusOptions } from '@/lib/consts'
import { OrderStatusType } from '@prisma/client'

type Props = {
  status: OrderStatusType
}

export function OrderStatusBadge({ status }: Props) {
  const badge = orderStatusOptions.find((option) => option.value === status)

  return (
    badge && (
      <Badge variant={badge.variant} className='mx-auto'>
        {badge.label}
      </Badge>
    )
  )
}
