'use client'

import { useMemo, useState, useEffect, TransitionStartFunction } from 'react'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { DeliveryAddress } from '@/generated/prisma/client'
import { DeliveryAddressType } from '@/generated/prisma/enums'
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
import { ConfirmationDialog } from '@/components/custom/ConfirmationDialog'
import { Loader2, Save } from 'lucide-react'
import { deliveryAddressSchema, DeliveryAddressValues } from './validation'
import {
  createDeliveryAddress,
  editDeliveryAddress,
  deleteDeliveryAddress,
} from '../_actions/actions'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type DeliveryAddressFormProps = {
  deliveryAddress?: DeliveryAddress | null
  deliveryAddressType?: DeliveryAddressType
  startTransition: TransitionStartFunction
}

export function DeliveryAddressForm({
  deliveryAddress,
  deliveryAddressType,
  startTransition,
}: DeliveryAddressFormProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const defaultValues = useMemo(
    () => ({
      name: deliveryAddress?.name || '',
      address: deliveryAddress?.address || '',
      city: deliveryAddress?.city || '',
      zip: deliveryAddress?.zip || '',
      phone: deliveryAddress?.phone || '',
      email: deliveryAddress?.email || '',
      note: deliveryAddress?.note || '',
      type:
        deliveryAddress?.type ||
        deliveryAddressType ||
        DeliveryAddressType.delivery,
    }),
    [deliveryAddress],
  )

  const form = useForm<DeliveryAddressValues>({
    resolver: zodResolver(deliveryAddressSchema),
    defaultValues,
  })

  const { reset } = form

  async function onSubmit(data: DeliveryAddressValues) {
    try {
      if (deliveryAddress) {
        const response = await editDeliveryAddress(data, deliveryAddress.id)
        startTransition(() => {})
        if (response) {
          if (response.status === 'fail') {
            return toast.warning(response.message)
          }

          if (response.status === 'success') {
            toast.success(response.message)
          }
        }
      } else {
        const response = await createDeliveryAddress(data)
        startTransition(() => {})
        if (response) {
          if (response.status === 'fail') {
            return toast.warning(response.message)
          }

          if (response.status === 'success') {
            toast.success(response.message)
            // Reset form after submission
            form.reset(defaultValues)
          }
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

  const onDelete = async (id: string) => {
    setIsDeleting(true)
    try {
      const response = await deleteDeliveryAddress(id)
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
          : 'Došlo je do greške prilikom brisanja adrese. Molimo pokušajte ponovo.',
      )
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
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresa *</FormLabel>
              <FormControl>
                <Input placeholder='Unesite adresu' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='city'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mesto *</FormLabel>
              <FormControl>
                <Input placeholder='Unesite mesto' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='zip'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Poštanski broj *</FormLabel>
              <FormControl>
                <Input placeholder='Unesite poštanski broj' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='phone'
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
          name='email'
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

        <FormField
          control={form.control}
          name='note'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Napomena</FormLabel>
              <FormControl>
                <Textarea placeholder='Unesite napomenu' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!deliveryAddressType ? (
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sačuvaj kao:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className='flex space-x-2'
                  >
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value={DeliveryAddressType.delivery} />
                      </FormControl>
                      <FormLabel>Adresu isporuke</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value={DeliveryAddressType.billing} />
                      </FormControl>
                      <FormLabel>Adresu računa</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}

        <div className='flex pt-6'>
          {deliveryAddress?.id && !deliveryAddressType ? (
            <ConfirmationDialog
              confirmAction={() => onDelete(deliveryAddress.id)}
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
