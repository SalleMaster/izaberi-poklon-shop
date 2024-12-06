'use client'

import { useMemo, useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldName, useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Loader2, Gem, Divide } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from '@/hooks/use-toast'
import { cartOrderSchema, CartOrderValues } from './validation'
import {
  DeliveryAddress,
  OrderDeliveryType,
  OrderPaymentType,
} from '@prisma/client'
import { cartCreateOrder } from '@/app/(shop)/_actions/order/actions'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Combobox } from '@/components/custom/Combobox'
import { Input } from '@/components/ui/input'

const steps = [
  {
    id: 'step-1',
    name: 'Korpa',
  },
  {
    id: 'step-2',
    name: 'Način i adresa isporuke',
    fields: [
      'deliveryType',
      'selectedDeliveryAddressId',
      'pickupName',
      'pickupPhone',
      'pickupEmail',
    ],
  },
  {
    id: 'step-3',
    name: '2Plaćanje i adresa računa',
    fields: ['paymentType'],
  },
  {
    id: 'step-4',
    name: 'Pregled porudžbine',
  },
]

type Props = {
  disabled: boolean
  userAddresses: DeliveryAddress[]
}

export function CartOrderForm({ disabled, userAddresses }: Props) {
  const [currentStep, setCurrentStep] = useState(0)

  const defaultValues = useMemo(
    () => ({
      deliveryType: OrderDeliveryType.delivery,
      paymentType: OrderPaymentType.card,
      selectedDeliveryAddressId: userAddresses[0]?.id,
      selectedBillingAddressId: '',
      pickupName: '',
      pickupPhone: '',
      pickupEmail: '',
    }),
    [disabled]
  )

  const form = useForm<CartOrderValues>({
    resolver: zodResolver(cartOrderSchema),
    defaultValues,
  })

  const { reset, trigger } = form

  const next = async () => {
    const fields = steps[currentStep].fields
    const output = await trigger(fields as FieldName<CartOrderValues>[], {
      shouldFocus: true,
    })

    if (!output) {
      return
    }

    if (currentStep < steps.length - 1) {
      if (currentStep === steps.length - 2) {
        return form.handleSubmit(onSubmit)()
      }
      setCurrentStep((prev) => prev + 1)
    }
  }

  async function onSubmit(data: CartOrderValues) {
    try {
      const response = await cartCreateOrder(data)
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
        {currentStep}
        {currentStep === 1 ? (
          <div>
            <FormField
              control={form.control}
              name='deliveryType'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Odaberite način isporuke:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className='flex space-x-2'
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value={OrderDeliveryType.delivery} />
                        </FormControl>
                        <FormLabel>Na kućnu adresu</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value={OrderDeliveryType.pickup} />
                        </FormControl>
                        <FormLabel>Lično preuzimanje</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('deliveryType') === OrderDeliveryType.delivery ? (
              <FormField
                control={form.control}
                name='selectedDeliveryAddressId'
                render={() => (
                  <FormItem>
                    <FormLabel>
                      Izaberite adresu isporuke iz vaše liste sačuvanih adresa:
                    </FormLabel>
                    <FormControl>
                      <Combobox
                        options={
                          userAddresses?.map((address) => ({
                            value: address.id,
                            label: address.address,
                          })) || []
                        }
                        value={form.getValues('selectedDeliveryAddressId')}
                        setValue={(value) =>
                          form.setValue('selectedDeliveryAddressId', value)
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Adresa za isporuku će biti automatski popunjena sa
                      podacima izabrane adrese.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            {form.watch('deliveryType') === OrderDeliveryType.pickup ? (
              <div>
                <FormField
                  control={form.control}
                  name='pickupName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ime i prezime *</FormLabel>
                      <FormControl>
                        <Input placeholder='Unesite ime i prezime' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='pickupPhone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Broj telefona *</FormLabel>
                      <FormControl>
                        <Input placeholder='Unesite broj telefona' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='pickupEmail'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder='Unesite email' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : null}
          </div>
        ) : null}

        {currentStep === 2 ? (
          <FormField
            control={form.control}
            name='paymentType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Odaberite način plaćanja:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className='flex space-x-2'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value={OrderPaymentType.onDelivery} />
                      </FormControl>
                      <FormLabel>Plaćanje prilikom preuzimanja</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value={OrderPaymentType.card} />
                      </FormControl>
                      <FormLabel>Plaćanje platnom karticom</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}

        <div className='flex'>
          {/* <Button
            type='submit'
            disabled={disabled || form.formState.isSubmitting}
            className='ml-auto'
          >
            {form.formState.isSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Gem className='mr-2 h-4 w-4' />
            )}
            Poruči
          </Button> */}
          <Button
            type='button'
            disabled={disabled || form.formState.isSubmitting}
            className='ml-auto'
            onClick={next}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Gem className='mr-2 h-4 w-4' />
            )}
            Poruči
          </Button>
        </div>
      </form>
    </Form>
  )
}

// export function CartOrderFormSkeleton() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Promo kupon</CardTitle>
//         <Skeleton className='h-5  w-[60%]' />
//       </CardHeader>
//       <CardContent className='space-y-2.5'>
//         <div className='space-y-2'>
//           <Skeleton className='h-6  w-[30%]' />
//           <Skeleton className='h-9  w-[100%]' />
//           <Skeleton className='h-5  w-[70%]' />
//         </div>
//         <div className='flex'>
//           <Button className='ml-auto' disabled>
//             <Gem className='mr-2 h-4 w-4' />
//             Primeni
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
