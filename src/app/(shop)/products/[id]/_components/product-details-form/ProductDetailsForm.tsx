'use client'

import { useMemo, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
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
import { Loader2, Minus, Plus, Save } from 'lucide-react'
import { productDetailsSchema, ProductDetailsValues } from './validation'
import { addCartItem } from '@/app/(shop)/_actions/cart/actions'
import { ProductWithRelations } from '@/data/services/products'
import { FontType } from '@prisma/client'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  priceTableQuantityOptions,
  quantityOptions as singlePriceQuantityOptions,
} from '@/lib/consts'
import { Combobox } from '@/components/custom/Combobox'
import { Input } from '@/components/ui/input'
import { createEmptyFileList } from '@/lib/formUtils'
import { FileUpload } from '@/components/custom/FileUpload'
import { uploadFile } from '@/lib/files'
import { imageFileTypes } from '@/lib/validation'
import { createMedia } from '@/lib/actions'

type Props = {
  product: ProductWithRelations
}

export function ProductDetailsForm({ product }: Props) {
  const { toast } = useToast()

  console.log('ProductDetailsForm', product)

  const { defaultValues, quantityOptions } = useMemo(() => {
    const defaultValues = {
      productId: product.id,
      quantity:
        product.priceTable.length > 1
          ? Number(priceTableQuantityOptions[0].value)
          : 1,
      fontType: FontType.cyrillic,
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

      const response = await addCartItem({ ...data }, imageMedias)
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

  // Use useEffect to generate personalization fields
  useEffect(() => {
    product.textPersonalizationFields.forEach((field) =>
      textAppend({
        name: field.name,
        placeholder: field.placeholder,
        value: '',
      })
    )

    product.imagePersonalizationFields.forEach((field) =>
      imageAppend({
        name: field.name,
        images: createEmptyFileList(),
        min: field.min,
      })
    )
  }, [product, textAppend, imageAppend])

  console.log(form.getValues('imagePersonalizations'))

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2.5'>
        <div className='flex flex-col space-y-2'>
          <FormLabel>Količina</FormLabel>
          <FormField
            control={form.control}
            name='quantity'
            render={() => (
              <FormItem className='flex space-y-0 border rounded-md shadow-sm sm:mr-auto'>
                <FormControl>
                  <Button
                    type='button'
                    variant='ghost'
                    onClick={() => {
                      form.setValue(
                        'quantity',
                        Number(form.getValues('quantity')) - 1
                      )
                    }}
                    disabled={
                      form.getValues('quantity').toString() ===
                      quantityOptions[0].value
                    }
                    size={'icon'}
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                </FormControl>
                <FormControl>
                  <div>
                    <Combobox
                      options={quantityOptions}
                      value={form.getValues('quantity').toString()}
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
                        Number(form.getValues('quantity')) + 1
                      )
                    }}
                    disabled={
                      form.getValues('quantity').toString() ===
                      quantityOptions[quantityOptions.length - 1].value
                    }
                    size={'icon'}
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='fontType'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pismo</FormLabel>
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

        {textFields.map((field, index) => (
          <div key={field.id} className='flex flex-col space-y-2'>
            <FormField
              control={control}
              name={`textPersonalizations.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {form.getValues('textPersonalizations')?.[index]?.name}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        form.getValues('textPersonalizations')?.[index]
                          ?.placeholder
                      }
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>Personalizacija.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        {imageFields.map((field, index) => (
          <div key={field.id} className='flex flex-col space-y-2'>
            <FormField
              control={form.control}
              name={`imagePersonalizations.${index}.images`}
              render={() => (
                <FormItem>
                  <FormLabel>
                    {form.getValues('imagePersonalizations')?.[index]?.name}
                  </FormLabel>
                  <FormControl>
                    <FileUpload
                      type='file'
                      multiple
                      formFiles={
                        form.getValues('imagePersonalizations')?.[index]?.images
                      }
                      formSetValue={(values) => {
                        console.log(values)
                        form.setValue(
                          `imagePersonalizations.${index}.images`,
                          values
                        )
                      }}
                      existingFiles={[]}
                      removedExistingFiles={[]}
                      setRemovedExistingFile={() => {}}
                      {...register(`imagePersonalizations.${index}.images`)}
                    />
                  </FormControl>
                  {/* <FormDescription>Dodatne slike proizvoda</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        <div className='flex'>
          <Button
            type='submit'
            disabled={form.formState.isSubmitting}
            className='ml-auto'
          >
            {form.formState.isSubmitting ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Save className='mr-2 h-4 w-4' />
            )}
            Dodaj u korpu
          </Button>
        </div>
      </form>
    </Form>
  )
}
