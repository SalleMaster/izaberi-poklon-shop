'use client'

import { useMemo, useEffect, TransitionStartFunction } from 'react'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2, Save, Star } from 'lucide-react'
import { productRatingSchema, ProductRatingValues } from './validation'
import { createProductRating } from '../../_actions/actions'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type ProductRatingFormProps = {
  name: string
  productId: string
  startTransition: TransitionStartFunction
}

export function ProductRatingForm({
  name,
  productId,
  startTransition,
}: ProductRatingFormProps) {
  const { toast } = useToast()

  const defaultValues = useMemo(
    () => ({
      name,
      score: 5,
      comment: '',
    }),
    [name]
  )

  const form = useForm<ProductRatingValues>({
    resolver: zodResolver(productRatingSchema),
    defaultValues,
  })

  const { reset } = form

  async function onSubmit(data: ProductRatingValues) {
    try {
      const response = await createProductRating(data, productId)
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
          // Reset form after submission
          form.reset(defaultValues)
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ime *</FormLabel>
              <FormControl>
                <Input placeholder='Unesite ime i prezime' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='comment'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Komentar *</FormLabel>
              <FormControl>
                <Textarea placeholder='Unesite komentar' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='score'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Ocena</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={String(field.value)}
                  className='flex flex-col space-y-1'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='5' />
                    </FormControl>
                    <FormLabel className='flex gap-2'>
                      <Star fill='primary' className='w-4 h-4' />
                      <Star fill='primary' className='w-4 h-4' />
                      <Star fill='primary' className='w-4 h-4' />
                      <Star fill='primary' className='w-4 h-4' />
                      <Star fill='primary' className='w-4 h-4' />
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='4' />
                    </FormControl>
                    <FormLabel className='flex gap-2'>
                      <Star fill='primary' className='w-4 h-4' />
                      <Star fill='primary' className='w-4 h-4' />
                      <Star fill='primary' className='w-4 h-4' />
                      <Star fill='primary' className='w-4 h-4' />
                      <Star className='w-4 h-4' />
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='3' />
                    </FormControl>
                    <FormLabel className='flex gap-2'>
                      <Star fill='primary' className='w-4 h-4' />
                      <Star fill='primary' className='w-4 h-4' />
                      <Star fill='primary' className='w-4 h-4' />
                      <Star className='w-4 h-4' />
                      <Star className='w-4 h-4' />
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='2' />
                    </FormControl>
                    <FormLabel className='flex gap-2'>
                      <Star fill='primary' className='w-4 h-4' />
                      <Star fill='primary' className='w-4 h-4' />
                      <Star className='w-4 h-4' />
                      <Star className='w-4 h-4' />
                      <Star className='w-4 h-4' />
                    </FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='1' />
                    </FormControl>
                    <FormLabel className='flex gap-2'>
                      <Star fill='primary' className='w-4 h-4' />
                      <Star className='w-4 h-4' />
                      <Star className='w-4 h-4' />
                      <Star className='w-4 h-4' />
                      <Star className='w-4 h-4' />
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex pt-6'>
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
