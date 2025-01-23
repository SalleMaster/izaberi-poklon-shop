'use client'

import { useMemo, useEffect, TransitionStartFunction } from 'react'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { OrderStatusType } from '@prisma/client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Loader2, Save } from 'lucide-react'
import { orderStatusSchema, OrderStatusValues } from './validation'
import { updateOrderStatus } from '../_actions/actions'
import { Combobox } from '@/components/custom/Combobox'
import { orderStatusOptions } from '@/lib/consts'
import { Input } from '@/components/ui/input'

type Props = {
  status: OrderStatusType
  shippingNumber: string
  id: string
  startTransition: TransitionStartFunction
}

export function OrderStatusForm({
  status,
  shippingNumber,
  id,
  startTransition,
}: Props) {
  const { toast } = useToast()

  const defaultValues = useMemo(
    () => ({
      status,
      shippingNumber,
    }),
    [status, shippingNumber]
  )

  const form = useForm<OrderStatusValues>({
    resolver: zodResolver(orderStatusSchema),
    defaultValues,
  })

  const { reset } = form

  async function onSubmit(data: OrderStatusValues) {
    try {
      const response = await updateOrderStatus(data, id)
      startTransition(() => {})
      if (response) {
        if (response.status === 'fail') {
          return toast({
            variant: 'destructive',
            description: response.message,
          })
        }

        if (response.status === 'success') {
          toast({ description: response.message })
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          error instanceof Error
            ? error.message
            : 'Došlo je do greške. Molimo pokušajte ponovo.',
      })
    }
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
          name={'status'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Combobox
                  options={
                    orderStatusOptions.map((status) => ({
                      value: status.value,
                      label: status.label,
                    })) || []
                  }
                  value={field.value}
                  setValue={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormDescription>Izaberite status porudžbine</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='shippingNumber'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Broj pošiljke</FormLabel>
              <FormControl>
                <Input
                  placeholder='Unesite broj pošiljke'
                  {...field}
                  disabled={
                    form.watch('status') === OrderStatusType.pending ||
                    form.watch('status') === OrderStatusType.canceled ||
                    form.watch('status') === OrderStatusType.processing
                  }
                />
              </FormControl>
              <FormDescription>Broj pošiljke za praćenje</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex'>
          <Button
            type='submit'
            disabled={form.formState.isSubmitting}
            className='ml-auto'
          >
            {form.formState.isSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Save className='mr-2 h-4 w-4' />
            )}
            Sačuvaj
          </Button>
        </div>
      </form>
    </Form>
  )
}
