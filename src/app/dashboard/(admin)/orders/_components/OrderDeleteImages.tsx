'use client'

import { useMemo, useEffect, TransitionStartFunction } from 'react'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { orderDeleteImagesSchema, OrderDeleteImagesValues } from './validation'
import { deleteOrderImages } from '../_actions/actions'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { ConfirmationDialog } from '@/components/custom/ConfirmationDialog'

type Props = {
  id: string
  keys: string[]
  startTransition: TransitionStartFunction
}

export function OrderDeleteImagesForm({ id, keys, startTransition }: Props) {
  const { toast } = useToast()

  const defaultValues = useMemo(
    () => ({
      id,
      keys,
    }),
    [id, keys]
  )

  const form = useForm<OrderDeleteImagesValues>({
    resolver: zodResolver(orderDeleteImagesSchema),
    defaultValues,
  })

  const { reset } = form

  async function onSubmit(data: OrderDeleteImagesValues) {
    try {
      const response = await deleteOrderImages(data)
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
        <NotificationAlert
          title='Obaveštenje'
          description='Oslobodite memoriju na serveru tako što ćete izbrisati slike koje je
          kupac uploadovao prilikom porudžbine ukoliko Vam više nisu
          potrebne za izradu poklona.'
          variant='info'
        />

        <div className='flex'>
          <ConfirmationDialog
            confirmAction={() => form.handleSubmit(onSubmit)()}
            isLoading={form.formState.isSubmitting}
            isDisabled={form.formState.isSubmitting}
            alertTrigger='Izbrisi slike'
          />
        </div>
      </form>
    </Form>
  )
}
