'use client'

import { useEffect, useMemo, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Discount } from '@prisma/client'
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
import { discountSchema, DiscountValues } from './validation'
import {
  createDiscount,
  editDiscount,
  deleteDiscount,
} from '../_actions/actions'
import { Switch } from '@/components/ui/switch'

export function DiscountForm({ discount }: { discount?: Discount | null }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const defaultValues = useMemo(
    () => ({
      name: discount?.name || '',
      percentage: discount?.percentage || 0,
      active: discount ? discount.active : false,
    }),
    [discount]
  )

  const form = useForm<DiscountValues>({
    resolver: zodResolver(discountSchema),
    defaultValues,
  })

  const { reset } = form

  async function onSubmit(data: DiscountValues) {
    try {
      if (discount) {
        // Edit discount case
        const response = await editDiscount(
          {
            name: data.name,
            percentage: data.percentage,
            active: data.active,
          },
          discount.id
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
        // Create discount case
        const response = await createDiscount({
          name: data.name,
          percentage: data.percentage,
          active: data.active,
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
      await deleteDiscount(id)
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          error instanceof Error
            ? error.message
            : 'Došlo je do greške prilikom brisanja popusta. Molimo pokušajte ponovo.',
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
                <Input placeholder='Unesite naziv popusta' {...field} />
              </FormControl>
              <FormDescription>Naziv popusta</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='percentage'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Popust</FormLabel>
              <FormControl>
                <Input placeholder='Unesite poust' {...field} />
              </FormControl>
              <FormDescription>Popust u procentima (0 - 100)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='active'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mr-4'>Aktivna</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>Da li je popust aktivan</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex'>
          {discount?.id ? (
            <ConfirmationDialog
              confirmAction={() => onDelete(discount.id)}
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
