import { Card } from '@/components/ui/card'
import { Rating } from '@prisma/client'
import { Star } from 'lucide-react'

type Props = {
  ratings: Rating[]
}

export default function ProductRatingOverview({ ratings }: Props) {
  const averageRating = ratings.length
    ? parseFloat(
        (
          ratings.reduce((acc, rating) => acc + rating.score, 0) /
          ratings.length
        ).toFixed(1)
      )
    : 0

  const {
    numberOfRatings: numberOfFiveStarRatings,
    percentage: percentageOfFiveStarRatings,
  } = getRatingInfo(5)

  const {
    numberOfRatings: numberOfFourStarRatings,
    percentage: percentageOfFourStarRatings,
  } = getRatingInfo(4)

  const {
    numberOfRatings: numberOfThreeStarRatings,
    percentage: percentageOfThreeStarRatings,
  } = getRatingInfo(3)

  const {
    numberOfRatings: numberOfTwoStarRatings,
    percentage: percentageOfTwoStarRatings,
  } = getRatingInfo(2)

  const {
    numberOfRatings: numberOfOneStarRatings,
    percentage: percentageOfOneStarRatings,
  } = getRatingInfo(1)

  function getRatingInfo(score: number) {
    const numberOfRatings = ratings.filter(
      (rating) => rating.score === score
    ).length
    const percentage = (numberOfRatings / ratings.length) * 100
    return { numberOfRatings, percentage }
  }

  return (
    <div>
      <h4 className='text-xl font-semibold mb-4'>Recenzije</h4>
      <Card className='flex items-center space-x-4 p-6'>
        <div className='flex flex-col items-center'>
          <div className='flex items-center space-x-2'>
            <span className='text-5xl font-semibold'>{averageRating}</span>
            <Star fill='primary' />
          </div>
          <p className='text-muted-foreground text-sm text-center'>
            Ukupna ocena proizvoda
          </p>
        </div>
        <div className='w-full'>
          <ReviewScore
            score={5}
            percentage={percentageOfFiveStarRatings}
            numberOfStars={numberOfFiveStarRatings}
          />
          <ReviewScore
            score={4}
            percentage={percentageOfFourStarRatings}
            numberOfStars={numberOfFourStarRatings}
          />
          <ReviewScore
            score={3}
            percentage={percentageOfThreeStarRatings}
            numberOfStars={numberOfThreeStarRatings}
          />
          <ReviewScore
            score={2}
            percentage={percentageOfTwoStarRatings}
            numberOfStars={numberOfTwoStarRatings}
          />
          <ReviewScore
            score={1}
            percentage={percentageOfOneStarRatings}
            numberOfStars={numberOfOneStarRatings}
          />
        </div>
      </Card>
    </div>
  )
}

function ReviewScore({
  score,
  percentage,
  numberOfStars,
}: {
  score: number
  percentage: number
  numberOfStars: number
}) {
  return (
    <div className='flex items-center space-x-2'>
      <b>{score}</b>
      <Star className='w-4 h-4' />
      <span className='w-full h-1 bg-muted rounded-sm relative'>
        <span
          className='absolute top-0 left-0 h-1 bg-muted-foreground'
          style={{ width: percentage + '%' }}
        ></span>
      </span>
      <span className='text-muted-foreground'>{numberOfStars}</span>
    </div>
  )
}
