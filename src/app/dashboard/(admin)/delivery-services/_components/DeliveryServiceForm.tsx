'use client'

import { useState } from 'react'
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

  const form = useForm<DeliveryServiceValues>({
    resolver: zodResolver(deliveryServiceSchema),
    defaultValues: {
      name: deliveryService?.name || '',
      link: deliveryService?.link || '',
      active: deliveryService?.active || false,
    },
  })

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
        await editDeliveryService(
          {
            name: data.name,
            link: data.link,
            active: data.active,
          },
          deliveryService.id,
          removedMedia,
          mediaId
        )
        toast({ description: 'Kurirska služba sačuvana.' })
        // Reset only pdf field after submission to avoid having duplicate image badges
        form.resetField('pdf')
      } else {
        // Create delivery service case
        await createDeliveryService(
          {
            name: data.name,
            link: data.link,
            active: data.active,
          },
          mediaId
        )
        toast({ description: 'Kurirska služba kreirana.' })
        // Reset form after submission
        form.reset()
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
      await deleteDeliveryService(id)
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
