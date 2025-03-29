import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { format } from 'date-fns'
import { srLatn } from 'date-fns/locale'
import { Clock4, Star } from 'lucide-react'
import { TransitionStartFunction } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { RatingStatusBadge } from './RatingStatusBadge'
import { UserRating } from '@/app/(shop)/products/[id]/_components/product-ratings/product-rating-list/ProductRatingList'
import { RatingStatusForm } from './RatingStatusForm'
import { RatingWithRelations } from '@/data/services/ratings'
import { RatingProductInfo } from './RatingProductInfo'
import { RatingUserInfo } from './RatingUserInfo'

type RatingCardProps = {
  rating: RatingWithRelations
  startTransition: TransitionStartFunction
}

export function RatingCard({ rating, startTransition }: RatingCardProps) {
  const formattedCreatedAt = format(rating.createdAt, 'PPpp', {
    locale: srLatn,
  })

  return (
    <Card className='py-0'>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem value={rating.id} className='border-b-0'>
          <AccordionTrigger>
            <div className='w-full grid gap-3 sm:grid-cols-3'>
              <div className='flex items-center gap-4'>
                <p className='font-semibold'>{rating.score}</p>
                <Star />
              </div>
              <div className='flex items-center gap-4'>
                <Clock4 />
                <p className='font-semibold'>{formattedCreatedAt}</p>
              </div>
              <div className='flex mr-6'>
                <RatingStatusBadge status={rating.status} />
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className='space-y-4'>
            <div className='flex gap-4 border rounded-xl p-4'>
              <div className='flex items-center'>
                <RatingProductInfo product={rating.product} />
              </div>
              <div className='w-full'>
                <UserRating rating={rating} />
              </div>
            </div>
            <div className='border rounded-xl p-4'>
              <RatingUserInfo user={rating.user} />
            </div>
            <div className='border rounded-xl p-4'>
              <RatingStatusForm
                status={rating.status}
                id={rating.id}
                startTransition={startTransition}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export function RatingCardSkeleton() {
  return (
    <Card className='p-4'>
      <div className='w-full grid gap-3 sm:grid-cols-3 pr-4'>
        <div className='flex items-center gap-4'>
          <Skeleton className='h-4 w-2' />
          <Star />
        </div>
        <div className='flex items-center gap-4'>
          <Clock4 />
          <Skeleton className='h-4 w-3/4' />
        </div>
        <div className='flex items-center gap-4'>
          <Skeleton className='h-4 w-3/4' />
        </div>
      </div>
    </Card>
  )
}
