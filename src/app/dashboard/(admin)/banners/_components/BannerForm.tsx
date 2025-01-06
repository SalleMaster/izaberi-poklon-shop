'use client'

import { useMemo, useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Banner, Media } from '@prisma/client'
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
import { bannerSchema, BannerValues, editBannerSchema } from './validation'
import { uploadFile } from '@/lib/files'
import { createMedia } from '@/lib/actions'
import { createBanner, editBanner, deleteBanner } from '../_actions/actions'
import { imageFileTypes } from '@/lib/validation'
import { createEmptyFileList } from '@/lib/formUtils'

type BannerWithImage = Banner & {
  image: Media | null
}

export function BannerForm({ banner }: { banner?: BannerWithImage | null }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [removedMedia, setRemovedMedia] = useState<Media[]>([])
  const { toast } = useToast()

  const defaultValues = useMemo(
    () => ({
      name: banner?.name || '',
      link: banner?.link || '',
      image: createEmptyFileList(),
      active: banner ? banner?.active : false,
    }),
    [banner]
  )

  const form = useForm<BannerValues>({
    resolver: zodResolver(banner ? editBannerSchema : bannerSchema),
    defaultValues,
  })

  const { reset } = form

  const imageRef = form.register('image')

  async function onSubmit(data: BannerValues) {
    try {
      let mediaId = banner?.image?.id

      // Upload new file if provided
      if (data.image && data.image.length > 0) {
        const { key, name, type, fileURL } = await uploadFile(
          data.image[0],
          imageFileTypes
        )
        const media = await createMedia(key, name, type, fileURL)
        mediaId = media.id
      }

      if (banner) {
        // Edit banner case
        const response = await editBanner(
          {
            name: data.name,
            link: data.link,
            active: data.active,
          },
          banner.id,
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
        // Create banner case
        const response = await createBanner(
          {
            name: data.name,
            link: data.link,
            active: data.active,
          },
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
      const response = await deleteBanner(id)
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
            : 'Došlo je do greške prilikom brisanja kategorije. Molimo pokušajte ponovo.',
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
                <Input placeholder='Unesite ime banera' {...field} />
              </FormControl>
              <FormDescription>Naziv banera</FormDescription>
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
                <Input placeholder='Unesite link banera' {...field} />
              </FormControl>
              <FormDescription>Link banera</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='active'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mr-4'>Aktivan</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>Da li je baner aktivan</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='image'
          render={() => (
            <FormItem>
              <FormLabel>Slika</FormLabel>
              <FormControl>
                <FileUpload
                  type='file'
                  formFiles={form.getValues('image')}
                  formSetValue={(values) => form.setValue('image', values)}
                  existingFiles={banner?.image ? [banner.image] : []}
                  removedExistingFiles={removedMedia}
                  setRemovedExistingFile={(media) =>
                    setRemovedMedia((prev) => [...prev, media])
                  }
                  {...imageRef}
                />
              </FormControl>
              <FormDescription>Slika banera</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex'>
          {banner?.id ? (
            <ConfirmationDialog
              confirmAction={() => onDelete(banner.id)}
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
