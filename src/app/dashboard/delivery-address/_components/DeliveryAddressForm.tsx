'use client'

import { useMemo, useState, useEffect, TransitionStartFunction } from 'react'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { DeliveryAddress } from '@prisma/client'
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

type DeliveryAddressFormProps = {
  deliveryAddress?: DeliveryAddress | null
  startTransition: TransitionStartFunction
}

export function DeliveryAddressForm({
  deliveryAddress,
  startTransition,
}: DeliveryAddressFormProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const defaultValues = useMemo(
    () => ({
      name: deliveryAddress?.name || '',
      address: deliveryAddress?.address || '',
      city: deliveryAddress?.city || '',
      zip: deliveryAddress?.zip || '',
      phone: deliveryAddress?.phone || '',
      email: deliveryAddress?.email || '',
      note: deliveryAddress?.note || '',
    }),
    [deliveryAddress]
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
        const response = await createDeliveryAddress(data)
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
      const response = await deleteDeliveryAddress(id)
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
            : 'Došlo je do greške prilikom brisanja adrese. Molimo pokušajte ponovo.',
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

        <div className='flex'>
          {deliveryAddress?.id ? (
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
