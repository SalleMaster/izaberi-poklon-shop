import { Badge } from '@/components/ui/badge'
import { userRoleOptions } from '@/lib/consts'
import { UserRoleType } from '@/generated/prisma/enums'

type Props = {
  role: UserRoleType
}

export function UserRoleBadge({ role }: Props) {
  const badge = userRoleOptions.find((option) => option.value === role)

  return (
    badge && (
      <Badge variant={badge.variant} className='mr-auto'>
        {badge.label}
      </Badge>
    )
  )
}
