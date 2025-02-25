'use client'

import { useMemo, useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Media } from '@prisma/client'
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
import { BannerWithImageType } from '@/data/services/banners'

export function BannerForm({
  banner,
}: {
  banner?: BannerWithImageType | null
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [removedDesktopMedia, setRemovedDesktopMedia] = useState<Media[]>([])
  const [removedMobileMedia, setRemovedMobileMedia] = useState<Media[]>([])
  const { toast } = useToast()

  const defaultValues = useMemo(
    () => ({
      name: banner?.name || '',
      link: banner?.link || '',
      desktopImage: createEmptyFileList(),
      mobileImage: createEmptyFileList(),
      active: banner ? banner?.active : false,
    }),
    [banner]
  )

  const form = useForm<BannerValues>({
    resolver: zodResolver(banner ? editBannerSchema : bannerSchema),
    defaultValues,
  })

  const { reset } = form

  const desktopImageRef = form.register('desktopImage')
  const mobileImageRef = form.register('mobileImage')

  async function onSubmit(data: BannerValues) {
    try {
      let desktopMediaId = banner?.desktopImage?.id
      let mobileMediaId = banner?.mobileImage?.id

      // Upload new desktop file if provided
      if (data.desktopImage && data.desktopImage.length > 0) {
        const { key, name, type, fileURL } = await uploadFile(
          data.desktopImage[0],
          imageFileTypes
        )
        const media = await createMedia(key, name, type, fileURL)
        desktopMediaId = media.id
      }

      // Upload new mobile file if provided
      if (data.mobileImage && data.mobileImage.length > 0) {
        const { key, name, type, fileURL } = await uploadFile(
          data.mobileImage[0],
          imageFileTypes
        )
        const media = await createMedia(key, name, type, fileURL)
        mobileMediaId = media.id
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
          removedDesktopMedia,
          removedMobileMedia,
          desktopMediaId,
          mobileMediaId
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
          desktopMediaId,
          mobileMediaId
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
          name='desktopImage'
          render={() => (
            <FormItem>
              <FormLabel>Veća slika</FormLabel>
              <FormControl>
                <FileUpload
                  type='file'
                  formFiles={form.getValues('desktopImage')}
                  formSetValue={(values) =>
                    form.setValue('desktopImage', values)
                  }
                  existingFiles={
                    banner?.desktopImage ? [banner.desktopImage] : []
                  }
                  removedExistingFiles={removedDesktopMedia}
                  setRemovedExistingFile={(media) =>
                    setRemovedDesktopMedia((prev) => [...prev, media])
                  }
                  {...desktopImageRef}
                />
              </FormControl>
              <FormDescription>
                Slika banera koja će se koristiti na većim ekranima
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='mobileImage'
          render={() => (
            <FormItem>
              <FormLabel>Manja slika</FormLabel>
              <FormControl>
                <FileUpload
                  type='file'
                  formFiles={form.getValues('mobileImage')}
                  formSetValue={(values) =>
                    form.setValue('mobileImage', values)
                  }
                  existingFiles={
                    banner?.mobileImage ? [banner.mobileImage] : []
                  }
                  removedExistingFiles={removedMobileMedia}
                  setRemovedExistingFile={(media) =>
                    setRemovedMobileMedia((prev) => [...prev, media])
                  }
                  {...mobileImageRef}
                />
              </FormControl>
              <FormDescription>
                Slika banera koja će se koristiti na manjim ekranima
              </FormDescription>
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
