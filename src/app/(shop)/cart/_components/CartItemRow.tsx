'use client'

import { useMemo, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { cartItemSchema, CartItemValues } from './validation'
import {
  removeCartItemType,
  updateCartItemType,
} from '../../_actions/cart/actions'
import { Combobox, SelectOptionType } from '@/components/custom/Combobox'
import { Button } from '@/components/ui/button'
import { Plus, Minus, X } from 'lucide-react'
import Link from 'next/link'
import { fallbackImageURL } from '@/lib/consts'
import Image from 'next/image'
import { priceFormatter } from '@/lib/format'
import { CartItemWithRelations } from '@/data/services/cart'

type Props = {
  cartItem: CartItemWithRelations
  updateCartItemHandler: ({ id, quantity }: updateCartItemType) => void
  removeCartItemHandler: ({ id }: removeCartItemType) => void
  quantityOptions: SelectOptionType[]
}

export function CartItemRow({
  cartItem,
  updateCartItemHandler,
  removeCartItemHandler,
  quantityOptions,
}: Props) {
  const defaultValues = useMemo(
    () => ({
      id: cartItem.id,
      quantity: cartItem.quantity,
    }),
    [cartItem]
  )

  const form = useForm<CartItemValues>({
    resolver: zodResolver(cartItemSchema),
    defaultValues,
  })

  const { reset } = form

  function onSubmit(data: CartItemValues) {
    updateCartItemHandler({
      id: data.id,
      quantity: data.quantity,
    })
  }

  // Use useEffect to reset the form when the product prop changes
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full flex gap-4 content-between items-center my-2.5'
      >
        <Link
          href={`pokloni/${cartItem.product.id}`}
          className='flex gap-4 items-center'
        >
          <Image
            src={cartItem.product.coverImage?.url || fallbackImageURL}
            alt='Poklon'
            width={100}
            height={100}
          />
        </Link>

        <div className='flex flex-col sm:flex-row gap-2 flex-grow'>
          <Link
            href={`pokloni/${cartItem.product.id}`}
            className='flex gap-4 items-center'
          >
            {cartItem.product.name}
          </Link>

          <div className='flex gap-4 items-center'>
            <FormField
              control={form.control}
              name='quantity'
              render={() => (
                <FormItem className='flex space-y-0 border rounded-md shadow-sm sm:mr-auto'>
                  <FormControl>
                    <Button
                      type='button'
                      variant='ghost'
                      onClick={() => {
                        form.setValue(
                          'quantity',
                          Number(form.getValues('quantity')) - 1
                        )
                        form.handleSubmit(onSubmit)()
                      }}
                      disabled={
                        form.getValues('quantity').toString() ===
                        quantityOptions[0].value
                      }
                      size={'icon'}
                    >
                      <Minus className='h-4 w-4' />
                    </Button>
                  </FormControl>
                  <FormControl>
                    <div>
                      <Combobox
                        options={quantityOptions}
                        value={form.getValues('quantity').toString()}
                        setValue={(value) => {
                          form.setValue('quantity', Number(value))
                          form.handleSubmit(onSubmit)()
                        }}
                        variant='ghost'
                        withChevron={false}
                      />
                    </div>
                  </FormControl>
                  <FormControl>
                    <Button
                      type='button'
                      variant='ghost'
                      onClick={() => {
                        form.setValue(
                          'quantity',
                          Number(form.getValues('quantity')) + 1
                        )
                        form.handleSubmit(onSubmit)()
                      }}
                      disabled={
                        form.getValues('quantity').toString() ===
                        quantityOptions[quantityOptions.length - 1].value
                      }
                      size={'icon'}
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  </FormControl>
                </FormItem>
              )}
            />
            <p className='font-semibold'>{priceFormatter(cartItem.price)}</p>
          </div>
        </div>

        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'
          aria-label='Ukloni proizvod iz korpe'
          onClick={() => removeCartItemHandler({ id: cartItem.id })}
        >
          <X className='h-4 w-4' />
        </Button>
      </form>
    </Form>
  )
}
