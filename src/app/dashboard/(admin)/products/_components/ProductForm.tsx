'use client'

import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Product, Category, Media } from '@prisma/client'
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
import { FileUpload } from '@/components/custom/FileUpload'
import { ConfirmationDialog } from '@/components/custom/ConfirmationDialog'
import { Loader2, Save } from 'lucide-react'
import { productSchema, ProductValues, editProductSchema } from './validation'
import { uploadFile } from '@/lib/files'
import { createMedia } from '@/lib/actions'
import { createProduct, deleteProduct, editProduct } from '../_actions/actions'
import { imageFileTypes } from '@/lib/validation'
import { MultiCombobox } from '@/components/custom/MultiCombobox'

type ProductWithRelations = Product & {
  categories: Category[]
  coverImage: Media | null
  images: Media[] | null
}

export function ProductForm({
  product,
  categories,
}: {
  product?: ProductWithRelations | null
  categories: Category[]
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [removedMedia, setRemovedMedia] = useState<Media[]>([])
  const { toast } = useToast()

  const form = useForm<ProductValues>({
    resolver: zodResolver(product ? editProductSchema : productSchema),
    defaultValues: {
      name: product?.name || '',
      categories: product?.categories.map((category) => category.id) || [],
      code: product?.code || '',
      material: product?.material || '',
      dimensions: product?.dimensions || '',
      personalization: product?.personalization || '',
      description: product?.description || '',
    },
  })

  const coverImageRef = form.register('coverImage')
  const imagesRef = form.register('images')

  async function onSubmit(data: ProductValues) {
    try {
      let coverImageMediaId = product?.coverImage?.id
      let imagesMediaIds = product?.images?.map((image) => image.id)

      // Upload new cover image if provided
      if (data.coverImage && data.coverImage.length > 0) {
        const { key, name, type, fileURL } = await uploadFile(
          data.coverImage[0],
          imageFileTypes
        )
        const media = await createMedia(key, name, type, fileURL)
        coverImageMediaId = media.id
      }

      // Upload new images if provided
      if (data.images && data.images.length > 0) {
        const imagesArray = Array.from(data.images)
        const images = await Promise.all(
          imagesArray.map(async (image) => {
            const { key, name, type, fileURL } = await uploadFile(
              image,
              imageFileTypes
            )
            return createMedia(key, name, type, fileURL)
          })
        )
        imagesMediaIds = images.map((image) => image.id)
      }

      if (product) {
        // Edit product case
        await editProduct(
          {
            name: data.name,
            categories: data.categories,
            code: data.code,
            material: data.material,
            dimensions: data.dimensions,
            personalization: data.personalization,
            description: data.description,
          },
          product.id,
          removedMedia,
          coverImageMediaId,
          imagesMediaIds
        )
        toast({ description: 'Proizvod sačuvan.' })
        // Reset only image field after submission to avoid having duplicate image badges
        form.resetField('coverImage')
        form.resetField('images')
      } else {
        // Create product case
        await createProduct(
          {
            name: data.name,
            categories: data.categories,
            code: data.code,
            material: data.material,
            dimensions: data.dimensions,
            personalization: data.personalization,
            description: data.description,
          },
          coverImageMediaId,
          imagesMediaIds
        )
        toast({ description: 'Proizvod kreiran.' })
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
      await deleteProduct(id)
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          error instanceof Error
            ? error.message
            : 'Došlo je do greške prilikom brisanja proizvoda. Molimo pokušajte ponovo.',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  console.log('ProductForm', 'categories: ', form.getValues('categories'))

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
                <Input placeholder='Unesite ime proizvoda' {...field} />
              </FormControl>
              <FormDescription>Naziv proizvoda</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='categories'
          render={() => (
            <FormItem>
              <FormLabel>Kategorije</FormLabel>
              <FormControl>
                <MultiCombobox
                  options={categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))}
                  value={form.getValues('categories')}
                  setValue={(value) => form.setValue('categories', value)}
                />
              </FormControl>
              <FormDescription>
                Kategorije kojima proizvod pripada
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Šifra</FormLabel>
              <FormControl>
                <Input placeholder='Unesite šifru proizvoda' {...field} />
              </FormControl>
              <FormDescription>Šifra proizvoda</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='material'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Materijal</FormLabel>
              <FormControl>
                <Input placeholder='Unesite materijal proizvoda' {...field} />
              </FormControl>
              <FormDescription>Materijal proizvoda</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dimensions'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dimenzije</FormLabel>
              <FormControl>
                <Input placeholder='Unesite dimenzije proizvoda' {...field} />
              </FormControl>
              <FormDescription>Dimenzije proizvoda</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='personalization'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personalizacija</FormLabel>
              <FormControl>
                <Input
                  placeholder='Unesite personalizacija proizvoda'
                  {...field}
                />
              </FormControl>
              <FormDescription>Vrsta personalizacije proizvoda</FormDescription>
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
                {/* <Input
                  placeholder='Unesite opis proizvoda'
                  {...field}
                /> */}
                <Textarea
                  placeholder='Unesite opis proizvoda'
                  // className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>Opis proizvoda</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='coverImage'
          render={() => (
            <FormItem>
              <FormLabel>Glavna slika</FormLabel>
              <FormControl>
                <FileUpload
                  type='file'
                  formFiles={form.getValues('coverImage')}
                  formSetValue={(values) => form.setValue('coverImage', values)}
                  existingFiles={
                    product?.coverImage ? [product.coverImage] : []
                  }
                  removedExistingFiles={removedMedia}
                  setRemovedExistingFile={(media) =>
                    setRemovedMedia((prev) => [...prev, media])
                  }
                  {...coverImageRef}
                />
              </FormControl>
              <FormDescription>Glavna slika proizvoda</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='images'
          render={() => (
            <FormItem>
              <FormLabel>Dodatne slike</FormLabel>
              <FormControl>
                <FileUpload
                  type='file'
                  multiple
                  formFiles={form.getValues('images')}
                  formSetValue={(values) => form.setValue('images', values)}
                  existingFiles={product?.images ? product.images : []}
                  removedExistingFiles={removedMedia}
                  setRemovedExistingFile={(media) =>
                    setRemovedMedia((prev) => [...prev, media])
                  }
                  {...imagesRef}
                />
              </FormControl>
              <FormDescription>Dodatne slike proizvoda</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex'>
          {product?.id ? (
            <ConfirmationDialog
              confirmAction={() => onDelete(product.id)}
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
