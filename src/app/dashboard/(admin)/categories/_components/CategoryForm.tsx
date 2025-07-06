'use client'

import { useMemo, useState, useEffect } from 'react'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Category, Media } from '@prisma/client'
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
import { Loader2, Minus, Plus, Save } from 'lucide-react'
import {
  categorySchema,
  CategoryValues,
  editCategorySchema,
} from './validation'
import { uploadFile } from '@/lib/files'
import { createMedia } from '@/lib/actions'
import {
  createCategory,
  deleteCategory,
  editCategory,
} from '../_actions/actions'
import { imageFileTypes } from '@/lib/validation'
import { Combobox } from '@/components/custom/Combobox'
import { quantityOptions } from '@/lib/consts'

type CategoryWithImage = Category & {
  image: Media | null
}

export function CategoryForm({
  category,
}: {
  category?: CategoryWithImage | null
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [removedMedia, setRemovedMedia] = useState<Media[]>([])

  const defaultValues = useMemo(
    () => ({
      name: category?.name || '',
      active: category ? category?.active : false,
      special: category ? category?.special : false,
      // position: category ? category?.position : 0,
      position: 0,
      image: null,
    }),
    [category]
  )

  const form = useForm<CategoryValues>({
    resolver: zodResolver(category ? editCategorySchema : categorySchema),
    defaultValues,
  })

  const { reset } = form

  const imageRef = form.register('image')

  async function onSubmit(data: CategoryValues) {
    try {
      let mediaId = category?.image?.id

      // Upload new file if provided
      if (data.image && data.image.length > 0) {
        const { key, name, type, fileURL } = await uploadFile(
          data.image[0],
          imageFileTypes
        )
        const media = await createMedia(key, name, type, fileURL)
        mediaId = media.id
      }

      if (category) {
        // Edit category case
        const response = await editCategory(
          {
            name: data.name,
            active: data.active,
            special: data.special,
            position: data.position,
          },
          category.id,
          removedMedia,
          mediaId
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
        // Create category case
        const response = await createCategory(
          {
            name: data.name,
            active: data.active,
            special: data.special,
            position: data.position,
          },
          mediaId
        )
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
          : 'Došlo je do greške. Molimo pokušajte ponovo.'
      )
    }
  }

  const onDelete = async (id: string) => {
    setIsDeleting(true)
    try {
      const response = await deleteCategory(id)
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
          : 'Došlo je do greške prilikom brisanja kategorije. Molimo pokušajte ponovo.'
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-2.5'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Naziv</FormLabel>
              <FormControl>
                <Input placeholder='Unesite ime kategorije' {...field} />
              </FormControl>
              <FormDescription>Naziv kategorije</FormDescription>
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
              <FormDescription>Da li je kategorija aktivna</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='special'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mr-4'>Specijalna</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Specijalne kategorije će biti promovisane na raznim mestima u
                aplikaciji
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='position'
          render={() => (
            <>
              <FormLabel className='mr-4'>Pozicija</FormLabel>
              <FormItem className='flex space-y-0 border rounded-md shadow-xs mr-auto'>
                <FormControl>
                  <Button
                    type='button'
                    variant='ghost'
                    onClick={() => {
                      form.setValue(
                        'position',
                        Number(form.watch('position')) - 1
                      )
                      form.trigger('position')
                    }}
                    disabled={
                      form.watch('position').toString() ===
                      quantityOptions[0].value
                    }
                    size={'icon'}
                    aria-label='Decrease quantity'
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                </FormControl>
                <FormControl>
                  <div>
                    <Combobox
                      options={quantityOptions}
                      value={form.watch('position').toString()}
                      setValue={(value) => {
                        form.setValue('position', Number(value))
                        form.trigger('position')
                      }}
                      variant='ghost'
                      withChevron={false}
                    />
                  </div>
                </FormControl>
                <FormControl>
                  <Button
                    type='button'
                    variant='ghost'
                    onClick={() => {
                      form.setValue(
                        'position',
                        Number(form.watch('position')) + 1
                      )
                      form.trigger('position')
                    }}
                    disabled={
                      form.watch('position').toString() ===
                      quantityOptions[quantityOptions.length - 1].value
                    }
                    size={'icon'}
                    aria-label='Increase quantity'
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </FormControl>
              </FormItem>
              <FormMessage />
            </>
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
                  formFiles={form.watch('image')}
                  formSetValue={(values) =>
                    form.setValue('image', values, { shouldValidate: true })
                  }
                  existingFiles={category?.image ? [category.image] : []}
                  removedExistingFiles={removedMedia}
                  setRemovedExistingFile={(media) =>
                    setRemovedMedia((prev) => [...prev, media])
                  }
                  {...imageRef}
                />
              </FormControl>
              <FormDescription>Slika kategorije</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex'>
          {category?.id ? (
            <ConfirmationDialog
              confirmAction={() => onDelete(category.id)}
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
