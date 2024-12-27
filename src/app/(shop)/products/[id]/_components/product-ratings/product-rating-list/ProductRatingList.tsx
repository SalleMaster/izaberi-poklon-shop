import { Rating } from '@prisma/client'
import { Clock, Star } from 'lucide-react'
import { format } from 'date-fns'
import { srLatn } from 'date-fns/locale'
import { Fragment } from 'react'
import { Separator } from '@/components/ui/separator'

type Props = {
  ratings: Rating[]
}

export default function ProductRatingList({ ratings }: Props) {
  console.log(ratings)

  return (
    <div className='space-y-5'>
      {ratings.map((rating) => (
        <Fragment key={rating.id}>
          <UserRating rating={rating} />
          <Separator className='w-full' />
        </Fragment>
      ))}
    </div>
  )
}

function UserRating({ rating }: { rating: Rating }) {
  const ratingCreatedAt = format(rating.createdAt, 'dd. MMMM yyyy.', {
    locale: srLatn,
  })
  return (
    <div className='space-y-2'>
      <div className='flex space-x-2'>
        {[1, 2, 3, 4, 5].map((score) => {
          const isFilled = score <= rating.score
          return (
            <Star
              key={score}
              fill={isFilled ? 'primary' : 'none'}
              className='w-4'
            />
          )
        })}
      </div>
      <p>{rating.comment}</p>
      <div className='flex justify-between text-muted-foreground'>
        <span>{rating.name}</span>
        <span className='flex items-center space-x-2'>
          <Clock className='w-4 h-4' />
          <span>{ratingCreatedAt}</span>
        </span>
      </div>
    </div>
  )
}
