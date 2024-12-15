import { Button } from '@/components/ui/button'
import { OrderCartItemWithRelations } from '@/data/services/order'
import { fallbackImageURL } from '@/lib/consts'
import { priceFormatter } from '@/lib/format'
import { FontType } from '@prisma/client'
import { SquareArrowOutUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type OrderCartItemProps = {
  cartItem: OrderCartItemWithRelations
}

export function OrderCartItem({ cartItem }: OrderCartItemProps) {
  let fontTypeText
  switch (cartItem.fontType) {
    case FontType.cyrillic:
      fontTypeText = 'Ćirilica'
      break
    case FontType.latin:
      fontTypeText = 'Latinica'
      break
    default:
      fontTypeText = 'Nepoznato pismo, proveriti sa kupcem'
  }

  const formattedSinglePrice = priceFormatter(
    cartItem.price / cartItem.quantity
  )
  const formattedTotalPrice = priceFormatter(cartItem.price)

  return (
    <div className='space-y-2.5'>
      <div className='flex gap-4 items-center'>
        <Link
          href={`pokloni/${cartItem.product.id}`}
          className='flex gap-4 items-center'
        >
          <Image
            src={cartItem.product.coverImage?.url || fallbackImageURL}
            alt={cartItem.product.name}
            width={100}
            height={100}
          />
        </Link>
        <div>
          <p className='font-semibold'>{cartItem.product.name}</p>
          <p className='text-muted-foreground'>Količina: {cartItem.quantity}</p>
          <p className='text-muted-foreground'>Cena: {formattedSinglePrice}</p>
        </div>
        <p className='font-semibold ml-auto'>{formattedTotalPrice}</p>
      </div>
      <div className='grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
        <div>
          <p className='font-semibold'>
            Šifra:{' '}
            <span className='font-medium text-muted-foreground'>
              {cartItem.product.code}
            </span>
          </p>
        </div>
        <div>
          <p className='font-semibold'>
            Pismo:{' '}
            <span className='font-medium text-muted-foreground'>
              {fontTypeText}
            </span>
          </p>
        </div>
      </div>
      {cartItem.textPersonalizations.length > 0 ? (
        <div className='grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
          {cartItem.textPersonalizations.map((personalization) => (
            <div key={personalization.id}>
              <p className='font-semibold'>
                {personalization.name}:{' '}
                <span className='font-medium text-muted-foreground'>
                  {personalization.value}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : null}
      {cartItem.imagePersonalizations.length > 0 ? (
        <div className='grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
          {cartItem.imagePersonalizations.map((personalization) => (
            <div key={personalization.id}>
              <p className='font-semibold'>
                {personalization.name}:{' '}
                <span className='space-x-2 space-y-2'>
                  {personalization.images?.map((image) => (
                    <Button
                      variant='secondary'
                      size='sm'
                      key={image.id}
                      asChild
                    >
                      <Link href={image.url} target='_blank'>
                        {image.name}
                        <SquareArrowOutUpRight className='ml-2 w-4 h-4' />
                      </Link>
                    </Button>
                  ))}
                </span>
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
