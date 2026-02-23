'use client'

import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { DeliveryFee } from '@/generated/prisma/client'
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
import { ConfirmationDialog } from '@/components/custom/ConfirmationDialog'
import { Loader2, Save } from 'lucide-react'
import { deliveryFeeSchema, DeliveryFeeValues } from './validation'
import {
  createDeliveryFee,
  editDeliveryFee,
  deleteDeliveryFee,
} from '../_actions/actions'

type DeliveryFeeFormProps = {
  deliveryFee?: DeliveryFee | null
}

export function DeliveryFeeForm({ deliveryFee }: DeliveryFeeFormProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const defaultValues = useMemo(
    () => ({
      name: deliveryFee?.name || '',
      fee: deliveryFee?.fee || 0,
    }),
    [deliveryFee],
  )

  const form = useForm<DeliveryFeeValues>({
    resolver: zodResolver(deliveryFeeSchema),
    defaultValues,
  })

  const { reset } = form

  async function onSubmit(data: DeliveryFeeValues) {
    try {
      if (deliveryFee) {
        // Edit delivery fee case
        const response = await editDeliveryFee(
          {
            name: data.name,
            fee: data.fee,
          },
          deliveryFee.id,
        )

        if (response) {
          if (response.status === 'fail') {
            return toast.warning(response.message)
          }

          if (response.status === 'success') {
            toast.success(response.message)
          }
        }
      } else {
        // Create delivery fee case
        const response = await createDeliveryFee({
          name: data.name,
          fee: data.fee,
        })

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
      const response = await deleteDeliveryFee(id)
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
          : 'Došlo je do greške prilikom brisanja. Molimo pokušajte ponovo.',
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
              <FormLabel>Naziv</FormLabel>
              <FormControl>
                <Input placeholder='Unesite naziv' {...field} />
              </FormControl>
              <FormDescription>Naziv cene poštarine</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='fee'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cena</FormLabel>
              <FormControl>
                <Input placeholder='Unesite cenu' {...field} />
              </FormControl>
              <FormDescription>Cena poštarine</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex'>
          {deliveryFee?.id ? (
            <ConfirmationDialog
              confirmAction={() => onDelete(deliveryFee.id)}
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
