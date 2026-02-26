'use client'

import { useState, useEffect, useMemo } from 'react'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import {
  Product,
  Category,
  Discount,
  ImagePersonalizationField,
  TextPersonalizationField,
  Media,
  DeliveryType,
  PriceRange,
  DeliveryFee,
  PackageOption,
} from '@/generated/prisma'
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
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FileUpload } from '@/components/custom/FileUpload'
import { ConfirmationDialog } from '@/components/custom/ConfirmationDialog'
import { Loader2, Save, Plus, Minus } from 'lucide-react'
import { productSchema, ProductValues, editProductSchema } from './validation'
import { uploadFile } from '@/lib/files'
import { createMedia } from '@/lib/actions'
import { imageFileTypes } from '@/lib/validation'
import { createProduct, deleteProduct, editProduct } from '../_actions/actions'
import { MultiCombobox } from '@/components/custom/MultiCombobox'
import { Combobox } from '@/components/custom/Combobox'
import { priceFormatter } from '@/lib/format'
import { useRouter } from 'next/navigation'

type ProductWithRelations = Product & {
  categories: Category[]
  discount: Discount | null
  coverImage: Media | null
  images: Media[] | null
  imagePersonalizationFields: ImagePersonalizationField[] | []
  textPersonalizationFields: TextPersonalizationField[] | []
  priceTable: PriceRange[]
  packageOption: PackageOption | null
}

const initialPrice = [{ from: 1, to: 5000, price: 0, deliveryFeeId: '' }]

const initialPriceTable = [
  { from: 10, to: 50, price: 0, deliveryFeeId: '' },
  { from: 51, to: 100, price: 0, deliveryFeeId: '' },
  { from: 101, to: 300, price: 0, deliveryFeeId: '' },
  { from: 301, to: 5000, price: 0, deliveryFeeId: '' },
]

export function ProductForm({
  product,
  categories,
  discounts,
  deliveryFees,
  packageOptions,
}: {
  product?: ProductWithRelations | null
  categories: Category[]
  discounts: Discount[]
  deliveryFees: DeliveryFee[]
  packageOptions: PackageOption[]
}) {
  const [isSinglePrice, setIsSinglePrice] = useState(
    product ? product.priceTable.length === 1 : true,
  )
  const [isDeleting, setIsDeleting] = useState(false)
  const [removedMedia, setRemovedMedia] = useState<Media[]>([])
  const [removedTextFields, setRemovedTextFields] = useState<string[]>([])
  const [removedImageFields, setRemovedImageFields] = useState<string[]>([])

  const router = useRouter()

  const defaultValues = useMemo(
    () => ({
      name: product?.name || '',
      categories: product?.categories.map((category) => category.id) || [],
      code: product?.code || '',
      priceTable:
        product?.priceTable ??
        (isSinglePrice ? initialPrice : initialPriceTable),
      discount: product?.discount?.id || '',
      material: product?.material || '',
      dimensions: product?.dimensions || '',
      personalization: product?.personalization || '',
      description: product?.description || '',
      delivery: product?.delivery || DeliveryType.fast,
      inStock: product ? product.inStock : true,
      trending: product ? product.trending : false,
      packageOption: product?.packageOption?.id || '',
      imagePersonalizationFields:
        product?.imagePersonalizationFields?.map((field) => ({
          ...field,
          originalId: field.id,
        })) || [],
      textPersonalizationFields:
        product?.textPersonalizationFields?.map((field) => ({
          ...field,
          originalId: field.id,
        })) || [],
      coverImage: null,
      images: null,
    }),
    [product],
  )

  const form = useForm<ProductValues>({
    resolver: zodResolver(product ? editProductSchema : productSchema),
    defaultValues,
  })

  const { control, reset } = form

  const deliveryFeeOptions =
    deliveryFees?.map((deliveryFee) => ({
      value: deliveryFee.id,
      label: `${deliveryFee.name} (${priceFormatter(deliveryFee.fee)})`,
    })) || []

  const {
    fields: textFields,
    append: textAppend,
    remove: textRemove,
  } = useFieldArray({ control, name: 'textPersonalizationFields' })

  const {
    fields: imageFields,
    append: imageAppend,
    remove: imageRemove,
  } = useFieldArray({ control, name: 'imagePersonalizationFields' })

  const { fields: priceRangeFields } = useFieldArray({
    control,
    name: 'priceTable',
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
          imageFileTypes,
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
              imageFileTypes,
            )
            return createMedia(key, name, type, fileURL)
          }),
        )
        imagesMediaIds = images.map((image) => image.id)
      }

      if (product) {
        // Edit product case
        const response = await editProduct(
          {
            name: data.name,
            categories: data.categories,
            code: data.code,
            priceTable: data.priceTable,
            discount: data.discount,
            material: data.material,
            dimensions: data.dimensions,
            personalization: data.personalization,
            description: data.description,
            delivery: data.delivery,
            inStock: data.inStock,
            trending: data.trending,
            packageOption: data.packageOption,
            textPersonalizationFields: data.textPersonalizationFields,
            imagePersonalizationFields: data.imagePersonalizationFields,
          },
          product.id,
          removedMedia,
          removedTextFields,
          removedImageFields,
          coverImageMediaId,
          imagesMediaIds,
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
        // Create product case
        const response = await createProduct(
          {
            name: data.name,
            categories: data.categories,
            code: data.code,
            priceTable: data.priceTable,
            discount: data.discount,
            material: data.material,
            dimensions: data.dimensions,
            personalization: data.personalization,
            description: data.description,
            delivery: data.delivery,
            inStock: data.inStock,
            trending: data.trending,
            packageOption: data.packageOption,
            textPersonalizationFields: data.textPersonalizationFields,
            imagePersonalizationFields: data.imagePersonalizationFields,
          },
          coverImageMediaId,
          imagesMediaIds,
        )

        if (response) {
          if (response.status === 'fail') {
            return toast.warning(response.message)
          }

          if (response.status === 'success') {
            toast.success(response.message)
            // Reset form after submission
            form.reset(defaultValues)
            setIsSinglePrice(true)
          }
        }
      }
    } catch (error) {
      toast.warning(
        error instanceof Error
          ? error.message
          : 'Došlo je do greške. Molimo pokušajte ponovo.',
      )
    }
  }

  const onDelete = async (id: string) => {
    setIsDeleting(true)
    try {
      const response = await deleteProduct(id)
      if (response) {
        if (response.status === 'fail') {
          return toast.warning(response.message)
        }

        if (response.status === 'success') {
          toast.success(response.message)
          router.push('/dashboard/products')
        }
      }
    } catch (error) {
      toast.warning(
        error instanceof Error
          ? error.message
          : 'Došlo je do greške prilikom brisanja proizvoda. Molimo pokušajte ponovo.',
      )
    } finally {
      setIsDeleting(false)
    }
  }

  // Use useEffect to reset the form when the product prop changes
  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  useEffect(() => {
    if (isSinglePrice) {
      form.setValue(
        'priceTable',
        product?.priceTable && product.priceTable.length === 1
          ? product.priceTable
          : initialPrice,
      )
    } else {
      form.setValue(
        'priceTable',
        product?.priceTable && product.priceTable.length > 1
          ? product.priceTable
          : initialPriceTable,
      )
    }
  }, [isSinglePrice])

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
                  options={
                    categories?.map((category) => ({
                      value: category.id,
                      label: category.name,
                    })) || []
                  }
                  value={form.watch('categories')}
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
          name='isSinglePrice'
          render={() => (
            <FormItem>
              <FormLabel className='mr-4'>
                {isSinglePrice ? 'Jedna cena' : 'Tabela cena'}
              </FormLabel>
              <FormControl>
                <Switch
                  checked={isSinglePrice}
                  onCheckedChange={setIsSinglePrice}
                />
              </FormControl>
              <FormDescription>
                Jedna cena za sve količine ili tabela cena za različite količine
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {priceRangeFields.map((field, index) => (
          <div key={field.id} className='grid grid-cols-2 gap-4'>
            <FormField
              control={control}
              name={`priceTable.${index}.price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {isSinglePrice
                      ? 'Cena'
                      : priceRangeFields[index].to === 5000
                        ? `${priceRangeFields[index].from}+`
                        : `Od ${priceRangeFields[index].from} do ${priceRangeFields[index].to}`}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Unesite cenu'
                      type='number'
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Cena po komadu.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`priceTable.${index}.deliveryFeeId`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Poštarina</FormLabel>
                  <FormControl>
                    <Combobox
                      options={deliveryFeeOptions}
                      value={field.value}
                      setValue={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormDescription>Izaberite poštarinu.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        <FormField
          control={form.control}
          name='discount'
          render={() => (
            <FormItem>
              <FormLabel>Popust</FormLabel>
              <FormControl>
                <Combobox
                  options={
                    discounts?.map((discount) => ({
                      value: discount.id,
                      label: discount.name,
                    })) || []
                  }
                  value={form.watch('discount')}
                  setValue={(value) => form.setValue('discount', value)}
                />
              </FormControl>
              <FormDescription>
                Popust koji će se primeniti na cenu proizvoda
              </FormDescription>
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
                <Textarea placeholder='Unesite opis proizvoda' {...field} />
              </FormControl>
              <FormDescription>Opis proizvoda</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='delivery'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Isporuka</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className='flex space-x-2'
                >
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={DeliveryType.fast} />
                    </FormControl>
                    <FormLabel>3-5 dana</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value={DeliveryType.slow} />
                    </FormControl>
                    <FormLabel>5-10 dana</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>Vreme isporuke za ovaj proizvod</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='inStock'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mr-4'>Dostupan</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Da li je proizvod dostupan za poručivanje
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='trending'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='mr-4'>Aktuelan</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>Da li je proizvod aktuelan</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='packageOption'
          render={() => (
            <FormItem>
              <FormLabel>Specijalno pakovanje</FormLabel>
              <FormControl>
                <Combobox
                  options={
                    packageOptions?.map((packageOption) => ({
                      value: packageOption.id,
                      label: packageOption.name,
                    })) || []
                  }
                  value={form.watch('packageOption')}
                  setValue={(value) => form.setValue('packageOption', value)}
                />
              </FormControl>
              <FormDescription>Opciono specijalno pakovanje</FormDescription>
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
                  formFiles={form.watch('coverImage')}
                  formSetValue={(values) =>
                    form.setValue('coverImage', values, {
                      shouldValidate: true,
                    })
                  }
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
                  formFiles={form.watch('images')}
                  formSetValue={(values) =>
                    form.setValue('images', values, { shouldValidate: true })
                  }
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
        {textFields.map((field, index) => (
          <div key={field.id} className='flex flex-col space-y-2'>
            <FormField
              control={control}
              name={`textPersonalizationFields.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tekstualna personalizacija: Naziv</FormLabel>
                  <FormControl>
                    <Input placeholder='Unesite naziv polja' {...field} />
                  </FormControl>
                  <FormDescription>Naziv polja.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`textPersonalizationFields.${index}.placeholder`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tekstualna personalizacija: Tekst</FormLabel>
                  <FormControl>
                    <Input placeholder='Unesite primer teksta' {...field} />
                  </FormControl>
                  <FormDescription>Primer teksta.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='button'
              onClick={() => {
                if (field.originalId) {
                  setRemovedTextFields((prev) => [...prev, field.originalId])
                }
                textRemove(index)
              }}
              className='ml-auto'
              variant='secondary'
            >
              <Minus className='mr-2 h-4 w-4' /> Ukloni
            </Button>
          </div>
        ))}
        <div className='flex'>
          <Button
            type='button'
            onClick={() =>
              textAppend({ name: '', placeholder: '', originalId: '' })
            }
            variant={'secondary'}
          >
            <Plus className='mr-2 h-4 w-4' /> Dodaj tekstualnu personalizaciju
          </Button>
        </div>

        {imageFields.map((field, index) => (
          <div key={field.id} className='flex flex-col space-y-2'>
            <FormField
              control={control}
              name={`imagePersonalizationFields.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slikovna personalizacija: Naziv</FormLabel>
                  <FormControl>
                    <Input placeholder='Unesite naziv polja' {...field} />
                  </FormControl>
                  <FormDescription>Naziv polja</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`imagePersonalizationFields.${index}.min`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Slikovna personalizacija: Količina slika
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Unesite količinu slika'
                      type='number'
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Minimalni broj slika za upload
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`imagePersonalizationFields.${index}.max`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slikovna personalizacija: Limit slika</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Unesite limit slika'
                      type='number'
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Maksimalni broj slika za upload
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='button'
              onClick={() => {
                if (field.originalId) {
                  setRemovedImageFields((prev) => [...prev, field.originalId])
                }
                imageRemove(index)
              }}
              className='ml-auto'
              variant='secondary'
            >
              <Minus className='mr-2 h-4 w-4' /> Ukloni
            </Button>
          </div>
        ))}
        <div className='flex'>
          <Button
            type='button'
            onClick={() =>
              imageAppend({ name: '', min: 0, max: 1, originalId: '' })
            }
            variant={'secondary'}
          >
            <Plus className='mr-2 h-4 w-4' /> Dodaj slikovnu personalizaciju
          </Button>
        </div>

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
