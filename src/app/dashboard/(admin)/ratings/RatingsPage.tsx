'use client'

import { use, useEffect, useTransition } from 'react'
import { cn } from '@/lib/utils'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { GetRatingsReturnType } from '@/data/services/ratings'
import { RatingCard, RatingCardSkeleton } from './_components/RatingCard'

type Props = {
  ratingsPromise: GetRatingsReturnType
}

export default function RatingsPage({ ratingsPromise }: Props) {
  const ratings = use(ratingsPromise)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [ratings])

  return (
    <div
      className={cn(
        'space-y-10',
        isPending && 'animate-pulse',
        'group-has-[[data-pending-ratings]]:animate-pulse',
        'group-has-[[data-pending-pagination]]:animate-pulse'
      )}
    >
      <div className='space-y-3'>
        {ratings.length ? (
          ratings.map((rating) => (
            <RatingCard
              key={rating.id}
              rating={rating}
              startTransition={startTransition}
            />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema porudžbina'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

export function RatingsPageSkeleton() {
  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <RatingCardSkeleton />
        <RatingCardSkeleton />
        <RatingCardSkeleton />
      </div>
    </div>
  )
}
