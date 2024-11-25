'use client'

import { useMemo, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { Input } from '@/components/ui/input'
import { Loader2, Save } from 'lucide-react'
import { productDetailsSchema, ProductDetailsValues } from './validation'
import { addCartItem } from '@/app/(shop)/_actions/cart/actions'
import { ProductWithRelations } from '@/data/services/products'

type Props = {
  product: ProductWithRelations
}

export function ProductDetailsForm({ product }: Props) {
  const { toast } = useToast()

  console.log('ProductDetailsForm', product)

  const defaultValues = useMemo(() => {
    return {
      productId: product.id,
      quantity: 1,
    }
  }, [product])

  const form = useForm<ProductDetailsValues>({
    resolver: zodResolver(productDetailsSchema),
    defaultValues,
  })

  const { reset } = form

  async function onSubmit(data: ProductDetailsValues) {
    try {
      const response = await addCartItem({ ...data })
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
          name='productId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Id</FormLabel>
              <FormControl>
                <Input placeholder='Unesite product id' {...field} />
              </FormControl>
              <FormDescription>Product id</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='quantity'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kolicina</FormLabel>
              <FormControl>
                <Input placeholder='Unesite kolicinu' {...field} />
              </FormControl>
              <FormDescription>Kolicina proizvoda</FormDescription>
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
            Dodaj u korpu
          </Button>
        </div>
      </form>
    </Form>
  )
}
