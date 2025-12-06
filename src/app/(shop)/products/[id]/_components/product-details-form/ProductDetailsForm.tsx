'use client'

import { useMemo, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import {
  CheckCheck,
  Gift,
  Loader2,
  Minus,
  Plus,
  ShoppingCart,
} from 'lucide-react'
import { productDetailsSchema, ProductDetailsValues } from './validation'
import { addCartItem } from '@/app/(shop)/_actions/cart/actions'
import { ProductWithRelations } from '@/data/services/products'
import { FontType } from '@/generated/prisma'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  priceTableQuantityOptions,
  quantityOptions as singlePriceQuantityOptions,
} from '@/lib/consts'
import { Combobox } from '@/components/custom/Combobox'
import { FileUpload } from '@/components/custom/FileUpload'
import { uploadFile } from '@/lib/files'
import { imageFileTypes } from '@/lib/validation'
import { createMedia } from '@/lib/actions'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { priceFormatter } from '@/lib/format'
import Link from 'next/link'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { Alert, AlertDescription } from '@/components/ui/alert'

type Props = {
  product: ProductWithRelations
}

export function ProductDetailsForm({ product }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { defaultValues, quantityOptions } = useMemo(() => {
    const defaultValues = {
      productId: product.id,
      quantity:
        product.priceTable.length > 1
          ? Number(priceTableQuantityOptions[0].value)
          : 1,
      fontType: FontType.cyrillic,
      personalization: true,
      packageOptionSelected: false,
      textPersonalizations: [],
      imagePersonalizations: [],
    }

    const quantityOptions =
      product.priceTable.length > 1
        ? priceTableQuantityOptions
        : singlePriceQuantityOptions

    return { defaultValues, quantityOptions }
  }, [product])

  const form = useForm<ProductDetailsValues>({
    resolver: zodResolver(productDetailsSchema),
    defaultValues,
  })

  const { reset, control, register } = form

  const { fields: textFields, append: textAppend } = useFieldArray({
    control,
    name: 'textPersonalizations',
  })

  const { fields: imageFields, append: imageAppend } = useFieldArray({
    control,
    name: 'imagePersonalizations',
  })

  async function onSubmit(data: ProductDetailsValues) {
    try {
      const imageMedias: { fieldName: string; ids: string[] }[] = []
      // Upload images if provided
      if (data.imagePersonalizations && data.imagePersonalizations.length > 0) {
        for (const field of data.imagePersonalizations) {
          imageMedias.push({ fieldName: field.name, ids: [] })
          if (field.images) {
            const imagesArray = Array.from(field.images)
            const images = await Promise.all(
              imagesArray.map(async (image) => {
                const { key, name, type, fileURL } = await uploadFile(
                  image,
                  imageFileTypes
                )
                return createMedia(key, name, type, fileURL)
              })
            )
            imageMedias[imageMedias.length - 1].ids = images.map(
              (image) => image.id
            )
          }
        }
      }

      const response = await addCartItem(
        {
          personalization: data.personalization,
          productId: data.productId,
          quantity: data.quantity,
          fontType: data.fontType,
          textPersonalizations: data.textPersonalizations,
          packageOptionSelected: data.packageOptionSelected,
        },
        imageMedias
      )
      if (response) {
        if (response.status === 'fail') {
          return toast.warning(response.message)
        }

        if (response.status === 'success') {
          setIsModalOpen(true)
          // Reset form after submission
          form.reset(defaultValues)
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

  // Use useEffect to reset the form when the product prop changes
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const personalization = form.watch('personalization')

  // Use useEffect to generate personalization fields
  useEffect(() => {
    if (personalization) {
      product.textPersonalizationFields.forEach((field) =>
        textAppend(
          {
            name: field.name,
            placeholder: field.placeholder,
            value: '',
          },
          { shouldFocus: false }
        )
      )

      product.imagePersonalizationFields.forEach((field) =>
        imageAppend(
          {
            name: field.name,
            images: null,
            min: field.min,
            max: field.max,
          },
          { shouldFocus: false }
        )
      )
    } else {
      form.setValue('textPersonalizations', [])
      form.setValue('imagePersonalizations', [])
    }
  }, [form, product, textAppend, imageAppend, personalization])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
        <div className='flex flex-col space-y-2'>
          <FormLabel>Količina:</FormLabel>
          <FormField
            control={form.control}
            name='quantity'
            render={() => (
              <FormItem className='flex space-y-0 border rounded-md shadow-xs mr-auto'>
                <FormControl>
                  <Button
                    type='button'
                    variant='ghost'
                    onClick={() => {
                      form.setValue(
                        'quantity',
                        Number(form.watch('quantity')) - 1
                      )
                    }}
                    disabled={
                      form.watch('quantity').toString() ===
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
                      value={form.watch('quantity').toString()}
                      setValue={(value) => {
                        form.setValue('quantity', Number(value))
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
                        'quantity',
                        Number(form.watch('quantity')) + 1
                      )
                    }}
                    disabled={
                      form.watch('quantity').toString() ===
                      quantityOptions[quantityOptions.length - 1].value
                    }
                    size={'icon'}
                    aria-label='Increase quantity'
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {product.packageOption ? (
          <FormField
            name='packageOptionSelected'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='mr-4'>
                  Poklon pakovanje <Gift className='w-5 h-5' />
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  {product.packageOption?.description} <br />
                  Cena po komadu:{' '}
                  {priceFormatter(product.packageOption?.price || 0)} <br />
                  Standardno pakovanje je uključeno u cenu
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}

        <FormField
          control={form.control}
          name='fontType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pismo:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className='flex space-x-2'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={FontType.cyrillic} />
                    </FormControl>
                    <FormLabel>Ćirilica</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={FontType.latin} />
                    </FormControl>
                    <FormLabel>Latinica</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                Pismo koje će se koristiti za izradu
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {product.textPersonalizationFields.length > 0 ||
        product.imagePersonalizationFields.length > 0 ? (
          <FormField
            name='personalization'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='mr-4'>
                  {field.value
                    ? 'Želim da personalizujem poklon'
                    : 'Želim poklon bez personalizacije'}
                </FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  {field.value
                    ? 'Unosite tekst i slike za personalizaciju'
                    : 'Poklon će biti izrađen bez personalizacije'}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}

        {personalization
          ? textFields.map((field, index) => (
              <div key={field.id} className='flex flex-col space-y-2'>
                <FormField
                  control={control}
                  name={`textPersonalizations.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {form.watch('textPersonalizations')?.[index]?.name}:
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={
                            form.watch('textPersonalizations')?.[index]
                              ?.placeholder
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))
          : null}

        {personalization
          ? imageFields.map((field, index) => (
              <div key={field.id} className='flex flex-col space-y-2'>
                <FormField
                  control={form.control}
                  name={`imagePersonalizations.${index}.images`}
                  render={() => (
                    <FormItem>
                      <FormLabel>
                        {form.watch('imagePersonalizations')?.[index]?.name}:
                      </FormLabel>
                      <FormControl>
                        <FileUpload
                          type='file'
                          multiple
                          formFiles={
                            form.watch('imagePersonalizations')?.[index]?.images
                          }
                          formSetValue={(values) => {
                            form.setValue(
                              `imagePersonalizations.${index}.images`,
                              values,
                              { shouldValidate: true }
                            )
                          }}
                          existingFiles={[]}
                          removedExistingFiles={[]}
                          setRemovedExistingFile={() => {}}
                          {...register(`imagePersonalizations.${index}.images`)}
                        />
                      </FormControl>
                      <FormDescription>
                        {form.watch('imagePersonalizations')?.[index]?.min === 0
                          ? 'Slike za ovo polje su opcione'
                          : `Minimalan broj slika za ovo polje: ${form.watch('imagePersonalizations')?.[index]?.min}`}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))
          : null}

        <div className='flex'>
          {
            <Button
              type='submit'
              disabled={form.formState.isSubmitting}
              className='ml-auto'
            >
              {form.formState.isSubmitting ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <ShoppingCart className='mr-2 h-4 w-4' />
              )}
              Dodaj u korpu
            </Button>
          }
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='text-center'>
                <CheckCheck
                  size={70}
                  className='bg-emerald-100 text-emerald-800 rounded-full p-3 mx-auto mb-4'
                />
                Proizvod je dodat u korpu
              </DialogTitle>
              <DialogDescription className='text-center'>
                Odaberite sledeću akciju
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className='flex gap-4 sm:justify-between'>
              <DialogClose className={buttonVariants({ variant: 'outline' })}>
                Nastavi kupovinu
              </DialogClose>
              <Link
                href='/korpa'
                className={buttonVariants({ variant: 'default' })}
                onClick={() => setIsModalOpen(false)}
              >
                Idi u korpu
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  )
}
