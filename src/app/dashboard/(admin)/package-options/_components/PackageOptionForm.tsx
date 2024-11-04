'use client'

import { useEffect, useMemo, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { PackageOption } from '@prisma/client'
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
import { Textarea } from '@/components/ui/textarea'
import { ConfirmationDialog } from '@/components/custom/ConfirmationDialog'
import { Loader2, Save } from 'lucide-react'
import { packageOptionSchema, PackageOptionValues } from './validation'
import {
  createPackageOption,
  editPackageOption,
  deletePackageOption,
} from '../_actions/actions'

type PackageOptionFormProps = {
  packageOption?: PackageOption | null
}

export function PackageOptionForm({ packageOption }: PackageOptionFormProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()

  const defaultValues = useMemo(
    () => ({
      name: packageOption?.name || '',
      description: packageOption?.description || '',
      price: packageOption?.price || 0,
    }),
    [packageOption]
  )

  const form = useForm<PackageOptionValues>({
    resolver: zodResolver(packageOptionSchema),
    defaultValues,
  })

  const { reset } = form

  async function onSubmit(data: PackageOptionValues) {
    try {
      if (packageOption) {
        // Edit package option case
        const response = await editPackageOption(
          {
            name: data.name,
            description: data.description,
            price: data.price,
          },
          packageOption.id
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
        // Create package option case
        const response = await createPackageOption({
          name: data.name,
          description: data.description,
          price: data.price,
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
      const response = await deletePackageOption(id)
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
            : 'Došlo je do greške prilikom brisanja. Molimo pokušajte ponovo.',
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
                <Input placeholder='Unesite naziv' {...field} />
              </FormControl>
              <FormDescription>Naziv poklon pakovanja</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis</FormLabel>
              <FormControl>
                <Textarea placeholder='Unesite opis' {...field} />
              </FormControl>
              <FormDescription>Opis poklon pakovanja</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cena</FormLabel>
              <FormControl>
                <Input placeholder='Unesite cenu' {...field} />
              </FormControl>
              <FormDescription>Cena poklon pakovanja</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex'>
          {packageOption?.id ? (
            <ConfirmationDialog
              confirmAction={() => onDelete(packageOption.id)}
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
