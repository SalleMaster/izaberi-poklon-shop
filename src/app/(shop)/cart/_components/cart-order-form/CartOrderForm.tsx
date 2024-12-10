'use client'

import { UseFormReturn } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CartOrderValues } from './validation'
import {
  DeliveryAddress,
  DeliveryService,
  OrderDeliveryType,
  OrderPaymentType,
} from '@prisma/client'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Combobox } from '@/components/custom/Combobox'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { priceFormatter } from '@/lib/format'
import Link from 'next/link'

type Props = {
  userAddresses: DeliveryAddress[]
  deliveryServices: DeliveryService[]
  selectedDeliveryService?: DeliveryService
  deliveryFee?: number
  form: UseFormReturn<CartOrderValues>
  currentStep: number
  onSubmit: (data: CartOrderValues) => void
}

export function CartOrderForm({
  userAddresses,
  deliveryServices,
  selectedDeliveryService,
  deliveryFee = 0,
  form,
  currentStep,
  onSubmit,
}: Props) {
  const formattedDeliveryFee = priceFormatter(deliveryFee)
  const deliveryServicePricesLink = selectedDeliveryService ? (
    <span className='text-primary underline'>
      <Link href={selectedDeliveryService.link} target='_blank'>
        cenovniku
      </Link>
    </span>
  ) : (
    'cenovniku'
  )

  const selectedDeliveryServiceDescription =
    selectedDeliveryService?.predefinedPrices &&
    form.watch('paymentType') === OrderPaymentType.card ? (
      `Cena poštarine za selektovanu službu iznosi: ${formattedDeliveryFee}`
    ) : (
      <span>
        Cena poštarine biće naplaćena prilikom preuzimanja paketa po zvaničnom{' '}
        {deliveryServicePricesLink} kurirske službe.
      </span>
    )

  const deliveryServiceDescription = form.watch('selectedDeliveryServiceId')
    ? selectedDeliveryServiceDescription
    : 'Kurirska služba koja će koristiti za isporuku.'
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
        {currentStep === 1 ? (
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl font-semibold'>
                Način i adresa isporuke
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2.5'>
                <div className='mb-6'>
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
                                <RadioGroupItem
                                  value={OrderDeliveryType.delivery}
                                />
                              </FormControl>
                              <FormLabel>Na kućnu adresu</FormLabel>
                            </FormItem>
                            <FormItem className='flex items-center space-x-3 space-y-0'>
                              <FormControl>
                                <RadioGroupItem
                                  value={OrderDeliveryType.pickup}
                                />
                              </FormControl>
                              <FormLabel>Lično preuzimanje</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {form.watch('deliveryType') === OrderDeliveryType.delivery ? (
                  <>
                    <p className='font-semibold'>Adresa isporuke</p>
                    <Separator />
                    <FormField
                      control={form.control}
                      name='selectedDeliveryAddressId'
                      render={() => (
                        <FormItem>
                          <FormLabel>
                            Izaberite adresu isporuke iz Vaše liste sačuvanih
                            adresa:
                          </FormLabel>
                          <FormControl>
                            <Combobox
                              options={
                                userAddresses?.map((address) => ({
                                  value: address.id,
                                  label: address.address,
                                })) || []
                              }
                              value={form.watch('selectedDeliveryAddressId')}
                              setValue={(value) => {
                                form.setValue(
                                  'selectedDeliveryAddressId',
                                  value
                                )
                              }}
                            />
                          </FormControl>
                          <FormDescription>
                            Adresa za isporuku će biti automatski popunjena
                            sapodacima izabrane adrese.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                ) : null}

                {form.watch('deliveryType') === OrderDeliveryType.pickup ? (
                  <>
                    <p className='font-semibold'>Podaci kupca</p>
                    <Separator />
                    <div className='space-y-2.5'>
                      <FormField
                        control={form.control}
                        name='pickupName'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ime i prezime *</FormLabel>
                            <FormControl>
                              <Input
                                placeholder='Unesite ime i prezime'
                                {...field}
                              />
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
                              <Input
                                placeholder='Unesite broj telefona'
                                {...field}
                              />
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
                  </>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ) : null}

        {currentStep === 2 ? (
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl font-semibold'>
                Plaćanje i adresa računa
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2.5'>
              <div className='mb-6'>
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
                              <RadioGroupItem
                                value={OrderPaymentType.onDelivery}
                              />
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
              </div>

              {form.watch('deliveryType') === OrderDeliveryType.delivery ? (
                <FormField
                  control={form.control}
                  name='selectedDeliveryServiceId'
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        Izaberite kurirsku službu za dostavu:
                      </FormLabel>
                      <FormControl>
                        <Combobox
                          options={
                            deliveryServices?.map((service) => ({
                              value: service.id,
                              label: service.name,
                            })) || []
                          }
                          value={form.watch('selectedDeliveryServiceId')}
                          setValue={(value) =>
                            form.setValue('selectedDeliveryServiceId', value)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        {deliveryServiceDescription}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}

              {form.watch('deliveryType') === OrderDeliveryType.delivery ? (
                <>
                  <p className='font-semibold'>Adresa računa</p>
                  <Separator />
                  <FormField
                    control={form.control}
                    name='selectedBillingAddressId'
                    render={() => (
                      <FormItem>
                        <FormLabel>
                          Izaberite adresu računa iz Vaše liste sačuvanih
                          adresa:
                        </FormLabel>
                        <FormControl>
                          <Combobox
                            options={
                              userAddresses?.map((address) => ({
                                value: address.id,
                                label: address.address,
                              })) || []
                            }
                            value={form.watch('selectedBillingAddressId')}
                            setValue={(value) =>
                              form.setValue('selectedBillingAddressId', value)
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Adresa za račun će biti automatski popunjena sa
                          podacima izabrane adrese.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : null}
            </CardContent>
          </Card>
        ) : null}
      </form>
    </Form>
  )
}
