import { Separator } from '@/components/ui/separator'
import { DeliveryType } from '@/generated/prisma/enums'
import { MessageCircleQuestion, Truck } from 'lucide-react'

type Props = {
  delivery: DeliveryType
  material: string
  dimensions: string
  personalization: string
  description: string
}

export default function ProductDetailsInfo({
  delivery,
  material,
  dimensions,
  personalization,
  description,
}: Props) {
  let deliveryText = ''

  switch (delivery) {
    case DeliveryType.fast:
      deliveryText = '3-5 dana'
      break
    case DeliveryType.slow:
      deliveryText = '5-10 dana'
      break
    default:
      deliveryText = '5-10 dana'
  }

  return (
    <div className='space-y-5'>
      <p className='flex gap-2'>
        <Truck />
        Očekivano vreme isporuke: {deliveryText}
      </p>
      <p className='flex gap-2'>
        <MessageCircleQuestion />
        <span>
          Ukoliko vam je potrebna pomoć oko odabira poklona{' '}
          <a href='tel:+3816212312123' className='underline'>
            pozovite ili pišite
          </a>{' '}
          našem online agentu
        </span>
      </p>
      <div>
        <p className='font-semibold mb-1.5'>Detalji:</p>
        <div>
          <div>
            <p className='flex justify-between text-muted-foreground'>
              <span>Vrsta materijala:</span>
              <span>{material}</span>
            </p>
            <Separator className='my-1' />
          </div>
          <div>
            <p className='flex justify-between text-muted-foreground'>
              <span>Dimenzije:</span>
              <span>{dimensions}</span>
            </p>
            <Separator className='my-1' />
          </div>
          <div>
            <p className='flex justify-between text-muted-foreground'>
              <span>Vrsta personalizacije:</span>
              <span>{personalization}</span>
            </p>
            <Separator className='my-1' />
          </div>
        </div>
      </div>
      <div>
        <p className='font-semibold mb-1.5'>Opis:</p>
        <p className='text-muted-foreground whitespace-pre-line'>
          {description}
        </p>
      </div>
    </div>
  )
}
