'use client'

import { useMemo, useEffect, TransitionStartFunction } from 'react'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RatingStatusType } from '@/generated/prisma/enums'
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
import { ratingStatusSchema, RatingStatusValues } from './validation'
import { updateRatingStatus } from '../_actions/actions'
import { Combobox } from '@/components/custom/Combobox'
import { ratingStatusOptions } from '@/lib/consts'

type Props = {
  status: RatingStatusType
  id: string
  startTransition: TransitionStartFunction
}

export function RatingStatusForm({ status, id, startTransition }: Props) {
  const defaultValues = useMemo(
    () => ({
      status,
    }),
    [status],
  )

  const form = useForm<RatingStatusValues>({
    resolver: zodResolver(ratingStatusSchema),
    defaultValues,
  })

  const { reset } = form

  async function onSubmit(data: RatingStatusValues) {
    try {
      const response = await updateRatingStatus(data, id)
      startTransition(() => {})
      if (response) {
        if (response.status === 'fail') {
          return toast.warning(response.message)
        }

        if (response.status === 'success') {
          toast.success(response.message)
        }
      }
    } catch (error) {
      toast.warning(
        error instanceof Error
          ? error.message
          : 'Došlo je do greške. Molimo pokušajte ponovo.',
      )
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
                    ratingStatusOptions.map((status) => ({
                      value: status.value,
                      label: status.label,
                    })) || []
                  }
                  value={field.value}
                  setValue={(value) => field.onChange(value)}
                />
              </FormControl>
              <FormDescription>Izaberite status recenzije</FormDescription>
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
