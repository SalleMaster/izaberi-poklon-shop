import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { CircleArrowRight, Loader2 } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { priceFormatter } from '@/lib/format'

type Props = {
  onlinePrice?: number
  totalPrice?: number
  discount?: number
  disabled: boolean
  isSubmitting: boolean
  next: () => void
}

export default function CartOverview({
  onlinePrice = 0,
  totalPrice = 0,
  discount = 0,
  disabled = true,
  isSubmitting,
  next,
}: Props) {
  const formattedOnlinePrice = priceFormatter(onlinePrice)
  const formattedTotalPrice = priceFormatter(totalPrice)
  const formattedDiscount = priceFormatter(discount)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pregled narudžbine</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2.5'>
        <p className='flex justify-between'>
          <span>Cena za online plaćanje:</span>{' '}
          <span>{formattedOnlinePrice}</span>
        </p>
        <p className='flex justify-between'>
          <span>Popust:</span> <span>{formattedDiscount}</span>
        </p>
        <Separator />
        <p className='flex justify-between'>
          <span className='text-l font-semibold'>Iznos kupovine:</span>{' '}
          <span className='text-xl md:text-3xl font-semibold'>
            {formattedTotalPrice}
          </span>
        </p>
      </CardContent>
      <CardFooter>
        <Button
          type='button'
          disabled={disabled || isSubmitting}
          // className='ml-auto'
          className='w-full'
          onClick={next}
        >
          Nastavite
          {isSubmitting ? (
            <Loader2 className='ml-2 h-4 w-4 animate-spin' />
          ) : (
            <CircleArrowRight className='ml-2 w-4 h-4' />
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

export function CartOverviewSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pregled narudžbine</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2.5'>
        <div className='flex justify-between'>
          <span>Cena za online plaćanje:</span>{' '}
          <Skeleton className='h-6 w-[40%]' />
        </div>
        <div className='flex justify-between'>
          <span>Popust:</span> <Skeleton className='h-6 w-[40%]' />
        </div>
        <Separator />
        <div className='flex justify-between'>
          <span className='font-semibold'>Iznos kupovine:</span>{' '}
          <Skeleton className='h-7 md:h-9 w-[60%]' />
        </div>
      </CardContent>
      <CardFooter>
        <Button className='ml-auto' disabled>
          <div className='flex'>
            Dalje <CircleArrowRight className='w-4 h-4 ml-2 my-auto' />
          </div>
        </Button>
      </CardFooter>
    </Card>
  )
}
