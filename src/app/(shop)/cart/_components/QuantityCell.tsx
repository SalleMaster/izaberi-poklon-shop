'use client'

import { useMemo, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { cartItemSchema, CartItemValues } from './validation'
import { updateCartItemType } from '../../_actions/cart/actions'
import { Combobox } from '@/components/custom/Combobox'
import { Button } from '@/components/ui/button'
import { Plus, Minus } from 'lucide-react'

export function QuantityCell({
  id,
  quantity,
  updateCartItemHandler,
}: {
  id: string
  quantity: number
  updateCartItemHandler: ({ id, quantity }: updateCartItemType) => void
}) {
  const defaultValues = useMemo(
    () => ({
      id,
      quantity,
    }),
    [id, quantity]
  )

  const form = useForm<CartItemValues>({
    resolver: zodResolver(cartItemSchema),
    defaultValues,
  })

  const { reset } = form

  async function onSubmit(data: CartItemValues) {
    await updateCartItemHandler({
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
        <FormField
          control={form.control}
          name='quantity'
          render={() => (
            <FormItem className='flex space-y-0'>
              <FormControl>
                <Button
                  variant='ghost'
                  onClick={() => {
                    form.setValue(
                      'quantity',
                      Number(form.getValues('quantity')) - 1
                    )
                  }}
                >
                  <Minus className='h-4 w-4' />
                </Button>
              </FormControl>
              <FormControl>
                <div>
                  <Combobox
                    options={[
                      {
                        value: '1',
                        label: '1',
                      },
                      {
                        value: '2',
                        label: '2',
                      },
                      {
                        value: '3',
                        label: '3',
                      },
                      {
                        value: '4',
                        label: '4',
                      },
                      {
                        value: '5',
                        label: '5',
                      },
                      {
                        value: '6',
                        label: '6',
                      },
                      {
                        value: '7',
                        label: '7',
                      },
                      {
                        value: '8',
                        label: '8',
                      },
                      {
                        value: '9',
                        label: '9',
                      },
                      {
                        value: '10',
                        label: '10',
                      },
                    ]}
                    value={form.getValues('quantity').toString()}
                    setValue={(value) => {
                      form.setValue('quantity', Number(value))
                      form.handleSubmit(onSubmit)()
                    }}
                  />
                </div>
              </FormControl>
              <FormControl>
                <Button
                  variant='ghost'
                  onClick={() => {
                    form.setValue(
                      'quantity',
                      Number(form.getValues('quantity')) + 1
                    )
                  }}
                >
                  <Plus className='h-4 w-4' />
                </Button>
              </FormControl>
            </FormItem>
          )}
        />
        {/* <div className='flex'>
          {banner?.id ? (
            <ConfirmationDialog
              confirmAction={() => onDelete(banner.id)}
              isLoading={isDeleting}
              isDisabled={isDeleting || form.formState.isSubmitting}
            />
          ) : null}
          <Button
            type='submit'
            disabled={isDeleting || form.formState.isSubmitting}
            className='ml-auto'
          >
            {form.formState.isSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Save className='mr-2 h-4 w-4' />
            )}
            Sačuvaj
          </Button>
        </div> */}
      </form>
    </Form>
  )
}
