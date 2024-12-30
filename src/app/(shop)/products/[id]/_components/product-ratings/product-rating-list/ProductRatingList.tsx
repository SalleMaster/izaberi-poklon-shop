import { Rating } from '@prisma/client'
import { ArrowDown, ArrowUp, Clock, Star } from 'lucide-react'
import { format } from 'date-fns'
import { srLatn } from 'date-fns/locale'
import { Fragment, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

type Props = {
  ratings: Rating[]
}

export default function ProductRatingList({ ratings }: Props) {
  const [visibleCount, setVisibleCount] = useState(3)

  const showMore = () => {
    setVisibleCount((prevCount) => prevCount + 3)
  }

  const showLess = () => {
    setVisibleCount(3)
  }

  const ratingsToShow = ratings.slice(0, visibleCount)

  return (
    <>
      <p className='text-muted-foreground'>
        Recenzije proizvoda koje slede mogu da napišu isključivo korisnici koji
        su kupili ovaj proizvod na našoj internet prodavnici. Zahvaljujući
        utisku i oceni korisnika koji su kupili ovaj proizvod, svi posetioci
        našeg sajta sada imaju realan uvid u prednosti i mane proizvoda zasnovan
        na korisničkom iskustvu. Nadamo se da će Vam ova opcija biti od koristi
        pri odabiru pravog proizvoda za Vas.
      </p>
      <div className='space-y-5'>
        {ratingsToShow.map((rating) => (
          <Fragment key={rating.id}>
            <UserRating rating={rating} />
            <Separator className='w-full' />
          </Fragment>
        ))}
        {visibleCount < ratings.length && (
          <Button variant='secondary' className='w-full' onClick={showMore}>
            Prikaži više <ArrowDown className='w-4 h-4 ml-2' />
          </Button>
        )}
        {visibleCount >= ratings.length && ratings.length > 3 && (
          <Button variant='secondary' className='w-full' onClick={showLess}>
            Prikaži manje <ArrowUp className='w-4 h-4 ml-2' />
          </Button>
        )}
      </div>
    </>
  )
}

export function UserRating({ rating }: { rating: Rating }) {
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
      <div className='flex gap-2 justify-between text-muted-foreground flex-wrap'>
        <span>{rating.name}</span>
        <span className='flex items-center space-x-2'>
          <Clock className='w-4 h-4' />
          <span>{ratingCreatedAt}</span>
        </span>
      </div>
    </div>
  )
}
