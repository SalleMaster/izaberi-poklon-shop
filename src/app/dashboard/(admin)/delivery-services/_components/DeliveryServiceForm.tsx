'use client'

import { useState, useMemo, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { DeliveryService, Media } from '@prisma/client'
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
import { Switch } from '@/components/ui/switch'
import { FileUpload } from '@/components/custom/FileUpload'
import { ConfirmationDialog } from '@/components/custom/ConfirmationDialog'
import { Loader2, Save } from 'lucide-react'
import { deliveryServiceSchema, DeliveryServiceValues } from './validation'
import { uploadFile } from '@/lib/files'
import { createMedia } from '@/lib/actions'
import {
  createDeliveryService,
  editDeliveryService,
  deleteDeliveryService,
} from '../_actions/actions'
import { pdfFileTypes } from '@/lib/validation'

type DeliveryServiceWithPdf = DeliveryService & {
  pdf: Media | null
}

export function DeliveryServiceForm({
  deliveryService,
}: {
  deliveryService?: DeliveryServiceWithPdf | null
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [removedMedia, setRemovedMedia] = useState<Media[]>([])
  const { toast } = useToast()

  const defaultValues = useMemo(
    () => ({
      name: deliveryService?.name || '',
      link: deliveryService?.link || '',
      active: deliveryService ? deliveryService.active : false,
      predefinedPrices: deliveryService
        ? deliveryService.predefinedPrices
        : false,
      pdf: null,
    }),
    [deliveryService]
  )

  const form = useForm<DeliveryServiceValues>({
    resolver: zodResolver(deliveryServiceSchema),
    defaultValues,
  })

  const { reset } = form

  const pdfRef = form.register('pdf')

  async function onSubmit(data: DeliveryServiceValues) {
    try {
      let mediaId = deliveryService?.pdf?.id

      // Upload new file if provided
      if (data.pdf && data.pdf.length > 0) {
        const { key, name, type, fileURL } = await uploadFile(
          data.pdf[0],
          pdfFileTypes
        )
        const media = await createMedia(key, name, type, fileURL)
        mediaId = media.id
      }

      if (deliveryService) {
        // Edit delivery service case
        const response = await editDeliveryService(
          data,
          deliveryService.id,
          removedMedia,
          mediaId
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
        // Create delivery service case
        const response = await createDeliveryService(data, mediaId)

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
      const response = await deleteDeliveryService(id)
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
            : 'Došlo je do greške prilikom brisanja kurirske službe. Molimo pokušajte ponovo.',
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
                <Input placeholder='Unesite ime kurirske službe' {...field} />
              </FormControl>
              <FormDescription>Naziv kurirske službe</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='link'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder='Unesite link kurirske službe' {...field} />
              </FormControl>
              <FormDescription>
                Zvanični link sa cenama kurirske službe
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
              <FormLabel className='mr-4'>Aktivna</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Da li je kurirska služba aktivna
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='predefinedPrices'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mr-4'>Koristi predefinisane cene</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Ukoliko je ova služba selektovana koristiće se cena za
                naplaćivanje poštarine koju ste uneli prilikom kreiranja
                proizvoda.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='pdf'
          render={() => (
            <FormItem>
              <FormLabel>PDF</FormLabel>
              <FormControl>
                <FileUpload
                  type='file'
                  formFiles={form.getValues('pdf')}
                  formSetValue={(values) => form.setValue('pdf', values)}
                  existingFiles={
                    deliveryService?.pdf ? [deliveryService.pdf] : []
                  }
                  removedExistingFiles={removedMedia}
                  setRemovedExistingFile={(media) =>
                    setRemovedMedia((prev) => [...prev, media])
                  }
                  {...pdfRef}
                />
              </FormControl>
              <FormDescription>PDF sa cenama kurirske službe</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex'>
          {deliveryService?.id ? (
            <ConfirmationDialog
              confirmAction={() => onDelete(deliveryService.id)}
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
