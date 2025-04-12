'use client'

import { use, useTransition } from 'react'
import { cn } from '@/lib/utils'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { UserCard, UserCardOpenSkeleton } from '../_components/UserCard'
import { GetUserReturnType } from '@/data/services/user'

type Props = {
  promise: GetUserReturnType
}

export default function UserPage({ promise }: Props) {
  const user = use(promise)
  const [isPending, startTransition] = useTransition()

  return (
    <div className={cn('space-y-10', isPending && 'animate-pulse')}>
      <div className='space-y-3'>
        {user ? (
          <UserCard
            user={user}
            isSingleCard={true}
            startTransition={startTransition}
          />
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Korisnik nije pronađen.'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

export function UserPageSkeleton() {
  return (
    <div className='space-y-10'>
      <UserCardOpenSkeleton />
    </div>
  )
}
