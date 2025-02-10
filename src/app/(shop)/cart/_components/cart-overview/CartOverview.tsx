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
import { freeShippingThreshold } from '@/lib/consts'

type Props = {
  onlinePrice?: number
  totalPrice?: number
  discount?: number
  deliveryFee?: number
  totalPriceWithDeliveryFee?: number
  disabled: boolean
  isSubmitting: boolean
  withDeliveryFee?: boolean
  next: () => void
}

export default function CartOverview({
  onlinePrice = 0,
  totalPrice = 0,
  discount = 0,
  deliveryFee = 0,
  totalPriceWithDeliveryFee = 0,
  disabled = true,
  withDeliveryFee = false,
  isSubmitting,
  next,
}: Props) {
  const formattedOnlinePrice = priceFormatter(onlinePrice)
  const formattedTotalPrice = priceFormatter(totalPrice)
  const formattedDiscount = priceFormatter(discount)
  const formattedDeliveryFee = priceFormatter(deliveryFee)
  const formattedTotalPriceWithDeliveryFee = priceFormatter(
    totalPriceWithDeliveryFee
  )
  const formattedFreeShippingThreshold = priceFormatter(freeShippingThreshold)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pregled narudžbine</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2.5'>
        <p className='flex justify-between'>
          <span>Cena korpe:</span> <span>{formattedOnlinePrice}</span>
        </p>
        <p className='flex justify-between'>
          <span>Popust:</span> <span>{formattedDiscount}</span>
        </p>
        {withDeliveryFee ? (
          <>
            <p className='flex justify-between'>
              <span>Poštarina:</span> <span>{formattedDeliveryFee}</span>
            </p>
            <p className='text-sm text-muted-foreground'>
              Poštarina je besplatna za porudžbine preko{' '}
              {formattedFreeShippingThreshold}
            </p>
            <Separator />
            <p className='flex justify-between'>
              <span className='text-l font-semibold'>Iznos kupovine:</span>{' '}
              <span className='text-xl md:text-3xl font-semibold'>
                {formattedTotalPriceWithDeliveryFee}
              </span>
            </p>
          </>
        ) : (
          <>
            <Separator />
            <p className='flex justify-between'>
              <span className='text-l font-semibold'>Iznos kupovine:</span>{' '}
              <span className='text-xl md:text-3xl font-semibold'>
                {formattedTotalPrice}
              </span>
            </p>
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button
          type='button'
          disabled={disabled || isSubmitting}
          className='w-full'
          onClick={next}
        >
          Nastavi
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
          <span>Cena korpe:</span> <Skeleton className='h-6 w-[40%]' />
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
