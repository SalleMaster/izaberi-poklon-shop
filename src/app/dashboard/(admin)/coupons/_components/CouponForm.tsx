'use client'

import { useMemo, useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Coupon, DiscountType } from '@prisma/client'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { ConfirmationDialog } from '@/components/custom/ConfirmationDialog'
import { Loader2, Save } from 'lucide-react'
import { couponSchema, CouponValues } from './validation'
import { createCoupon, editCoupon, deleteCoupon } from '../_actions/actions'
import { DatePicker } from '@/components/custom/DatePicker'

export function CouponForm({ coupon }: { coupon?: Coupon | null }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const defaultValues = useMemo(
    () => ({
      name: coupon?.name || '',
      code: coupon?.code || '',
      discountType: coupon?.discountType || DiscountType.percentage,
      discount: coupon?.discount || 0,
      cartValue: coupon?.cartValue || 0,
      available: coupon?.available || 0,
      used: coupon?.used || 0,
      active: coupon?.active || false,
      expiresAt: coupon?.expiresAt || new Date(),
    }),
    [coupon]
  )

  const form = useForm<CouponValues>({
    resolver: zodResolver(couponSchema),
    defaultValues,
  })

  const { reset } = form

  async function onSubmit(data: CouponValues) {
    try {
      if (coupon) {
        // Edit coupon case
        const response = await editCoupon(
          {
            ...data,
          },
          coupon.id
        )
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
      } else {
        // Create coupon case
        const response = await createCoupon({
          ...data,
        })
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

  const onDelete = async (id: string) => {
    setIsDeleting(true)
    try {
      const response = await deleteCoupon(id)
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
            : 'Došlo je do greške prilikom brisanja kupona. Molimo pokušajte ponovo.',
      })
    } finally {
      setIsDeleting(false)
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
              <FormLabel>Naziv</FormLabel>
              <FormControl>
                <Input placeholder='Unesite ime kupona' {...field} />
              </FormControl>
              <FormDescription>Naziv kupona</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kod</FormLabel>
              <FormControl>
                <Input placeholder='Unesite kod kupona' {...field} />
              </FormControl>
              <FormDescription>Kupon kod</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='discountType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tip</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className='flex space-x-2'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={DiscountType.percentage} />
                    </FormControl>
                    <FormLabel>Procenat</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={DiscountType.fixed} />
                    </FormControl>
                    <FormLabel>Fiksan</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>Tip kupona</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='discount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {form.getValues('discountType') === DiscountType.percentage
                  ? 'Procenat'
                  : 'Iznos'}
              </FormLabel>
              <FormControl>
                <Input placeholder='Unesite vrednost kupona' {...field} />
              </FormControl>
              <FormDescription>Vrednost kupona</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='cartValue'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vrednost korpe</FormLabel>
              <FormControl>
                <Input placeholder='Unesite vrednost korpe' {...field} />
              </FormControl>
              <FormDescription>Minimalna vrednost korpe</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='available'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dostupno</FormLabel>
              <FormControl>
                <Input placeholder='Unesite količinu kupona' {...field} />
              </FormControl>
              <FormDescription>Količina dostupnih kupona</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='used'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Iskorišćeno</FormLabel>
              <FormControl>
                <Input disabled={true} {...field} />
              </FormControl>
              <FormDescription>Količina iskorišćenih kupona</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='expiresAt'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Važi do</FormLabel>
              <DatePicker
                fieldValue={field.value}
                fieldOnChange={field.onChange}
              />
              <FormDescription>
                Do kog datuma se kupon može iskoristiti
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='active'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mr-4'>Aktivan</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>Da li je kupon aktivan</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex'>
          {coupon?.id ? (
            <ConfirmationDialog
              confirmAction={() => onDelete(coupon.id)}
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
        </div>
      </form>
    </Form>
  )
}
