'use client'

import { use, useEffect, useTransition } from 'react'
import { cn } from '@/lib/utils'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { GetUsersReturnType } from '@/data/services/user'
import { UserCard, UserCardSkeleton } from './_components/UserCard'

type Props = {
  usersPromise: GetUsersReturnType
}

export default function UsersPage({ usersPromise }: Props) {
  const users = use(usersPromise)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [users])

  return (
    <div
      className={cn(
        'space-y-10',
        isPending && 'animate-pulse',
        'group-has-data-pending-orders:animate-pulse',
        'group-has-data-pending-pagination:animate-pulse'
      )}
    >
      <div className='space-y-3'>
        {users.length ? (
          users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              startTransition={startTransition}
            />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema korisnika'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

export function UsersPageSkeleton() {
  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
      </div>
    </div>
  )
}
