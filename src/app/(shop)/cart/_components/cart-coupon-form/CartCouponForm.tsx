'use client'

import { useMemo, useEffect, TransitionStartFunction } from 'react'
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
import { cartApplyCoupon } from '@/app/(shop)/_actions/cart/actions'
import { toast } from '@/hooks/use-toast'

type Props = {
  disabled: boolean
  appliedCoupon?: string
  startTransition: TransitionStartFunction
  setCurrentStep: (step: number) => void
}

export function CartCouponForm({
  disabled,
  appliedCoupon,
  startTransition,
  setCurrentStep,
}: Props) {
  const defaultValues = useMemo(
    () => ({
      coupon: '',
    }),
    []
  )

  const form = useForm<CartCouponValues>({
    resolver: zodResolver(cartCouponSchema),
    defaultValues,
  })

  const { reset } = form

  async function onSubmit(data: CartCouponValues) {
    try {
      const response = await cartApplyCoupon(data)
      if (response) {
        if (response.status === 'fail') {
          return toast({
            variant: 'destructive',
            description: response.message,
          })
        }
        if (response.status === 'success') {
          startTransition(() => setCurrentStep(0))
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
              <Button
                type='submit'
                disabled={disabled || form.formState.isSubmitting}
                className='ml-auto'
              >
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
