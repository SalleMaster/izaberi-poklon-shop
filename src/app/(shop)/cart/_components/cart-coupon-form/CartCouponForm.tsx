'use client'

import { useMemo, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { cartCouponSchema, CartCouponValues } from './validation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Gem } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  disabled: boolean
  appliedCoupon?: string
  applyCouponHandler: ({ coupon }: CartCouponValues) => void
}

export function CartCouponForm({
  disabled,
  appliedCoupon,
  applyCouponHandler,
}: Props) {
  const defaultValues = useMemo(
    () => ({
      coupon: '',
    }),
    [disabled]
  )

  const form = useForm<CartCouponValues>({
    resolver: zodResolver(cartCouponSchema),
    defaultValues,
  })

  const { reset } = form

  function onSubmit(data: CartCouponValues) {
    applyCouponHandler(data)
  }

  // Use useEffect to reset the form when the product prop changes
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Promo kupon</CardTitle>
        <CardDescription>
          {appliedCoupon
            ? `Primenjeni kupon kod: ${appliedCoupon}`
            : 'Nije primenjen kupon kod'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
            <FormField
              control={form.control}
              name='coupon'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kupon:</FormLabel>
                  <FormControl>
                    <Input placeholder='Unesite kupon kod' {...field} />
                  </FormControl>
                  <FormDescription>
                    Kupon kod koji će se primeniti na unupan iznos korpe
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex'>
              <Button type='submit' disabled={disabled} className='ml-auto'>
                {form.formState.isSubmitting ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  <Gem className='mr-2 h-4 w-4' />
                )}
                Primeni
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export function CartCouponFormSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Promo kupon</CardTitle>
        <Skeleton className='h-5  w-[60%]' />
      </CardHeader>
      <CardContent className='space-y-2.5'>
        <div className='space-y-2'>
          <Skeleton className='h-6  w-[30%]' />
          <Skeleton className='h-9  w-[100%]' />
          <Skeleton className='h-5  w-[70%]' />
        </div>
        <div className='flex'>
          <Button className='ml-auto' disabled>
            <Gem className='mr-2 h-4 w-4' />
            Primeni
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
