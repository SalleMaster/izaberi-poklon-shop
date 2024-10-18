import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const initialMedias: Prisma.MediaCreateInput[] = [
  {
    key: 'sample-image-1.png',
    name: 'Sample image 1',
    type: 'image/png',
    url: 'https://izaberi-poklon-shop-development-bucket-salle.s3.eu-north-1.amazonaws.com/sample-image-1.png',
  },
  {
    key: 'sample-image-2.png',
    name: 'Sample image 2',
    type: 'image/png',
    url: 'https://izaberi-poklon-shop-development-bucket-salle.s3.eu-north-1.amazonaws.com/sample-image-2.png',
  },
  {
    key: 'sample-image-3.png',
    name: 'Sample image 3',
    type: 'image/png',
    url: 'https://izaberi-poklon-shop-development-bucket-salle.s3.eu-north-1.amazonaws.com/sample-image-3.png',
  },
  {
    key: 'product-sample-1.png',
    name: 'Product sample 1',
    type: 'image/png',
    url: 'https://izaberi-poklon-shop-development-bucket-salle.s3.eu-north-1.amazonaws.com/product-sample-1.png',
  },
  {
    key: 'product-sample-2.png',
    name: 'Product sample 2',
    type: 'image/png',
    url: 'https://izaberi-poklon-shop-development-bucket-salle.s3.eu-north-1.amazonaws.com/product-sample-2.png',
  },
  {
    key: 'product-sample-3.png',
    name: 'Product sample 3',
    type: 'image/png',
    url: 'https://izaberi-poklon-shop-development-bucket-salle.s3.eu-north-1.amazonaws.com/product-sample-3.png',
  },
  {
    key: 'sample-pdf.pdf',
    name: 'Sample pdf',
    type: 'application/pdf',
    url: 'https://izaberi-poklon-shop-development-bucket-salle.s3.eu-north-1.amazonaws.com/sample-pdf.pdf',
  },
]

const initialImagePersonalizationFields: Prisma.ImagePersonalizationFieldCreateInput[] =
  [
    {
      name: 'Image Personalization Field 1',
      min: 1,
    },
    {
      name: 'Image Personalization Field 2',
      min: 2,
    },
    {
      name: 'Image Personalization Field 3',
      min: 3,
    },
  ]

const initialTextPersonalizationFields: Prisma.TextPersonalizationFieldCreateInput[] =
  [
    {
      name: 'Text Personalization Field 1',
      placeholder: 'Text Personalization Field 1 placeholder',
    },
    {
      name: 'Text Personalization Field 2',
      placeholder: 'Text Personalization Field 2 placeholder',
    },
    {
      name: 'Text Personalization Field 3',
      placeholder: 'Text Personalization Field 3 placeholder',
    },
  ]

const initialCategories: Prisma.CategoryCreateInput[] = [
  {
    id: 'category-id-1',
    name: 'Category 1',
    slug: 'category-1',
    active: false,
    image: {
      create: initialMedias[0],
    },
  },
  {
    id: 'category-id-2',
    name: 'Category 2',
    slug: 'category-2',
    active: true,
    image: {
      create: initialMedias[1],
    },
  },
  {
    id: 'category-id-3',
    name: 'Category 3',
    slug: 'category-3',
    active: true,
    image: {
      create: initialMedias[2],
    },
  },
]

const initialDeliveryServices: Prisma.DeliveryServiceCreateInput[] = [
  {
    id: 'delivery-service-id-1',
    name: 'Delivery Service 1',
    link: 'https://example.com',
    active: false,
    pdf: {
      create: initialMedias[6],
    },
  },
  {
    id: 'delivery-service-id-2',
    name: 'Delivery Service 2',
    link: 'https://example.com',
    active: true,
  },
  {
    id: 'delivery-service-id-3',
    name: 'Delivery Service 3',
    link: 'https://example.com',
    active: true,
  },
]

const initialDiscounts: Prisma.DiscountCreateInput[] = [
  {
    id: 'discount-id-1',
    name: 'Discount 1',
    percentage: 15,
    active: true,
  },
  {
    id: 'discount-id-2',
    name: 'Discount 2',
    percentage: 20,
    active: false,
  },
  {
    id: 'discount-id-3',
    name: 'Discount 3',
    percentage: 25,
    active: true,
  },
]

const initialProducts: Prisma.ProductCreateInput[] = [
  {
    id: 'product-id-1',
    name: 'Product 1',
    categories: {
      connect: [{ id: 'category-id-1' }],
    },
    code: '0001',
    price: 1000,
    discount: {
      connect: { id: 'discount-id-1' },
    },
    material: 'Material 1',
    dimensions: 'Dimensions 1',
    personalization: 'Personalization 1',
    description: 'Product 1 description',
    delivery: '3-5 dana',
    inStock: true,
    coverImage: {
      create: initialMedias[3],
    },
    images: {
      create: [initialMedias[4], initialMedias[5]],
    },
    imagePersonalizationFields: {
      create: initialImagePersonalizationFields,
    },
    textPersonalizationFields: {
      create: initialTextPersonalizationFields,
    },
  },
]

async function main() {
  console.log('Start seeding ...')
  for (const category of initialCategories) {
    const newCategory = await prisma.category.create({
      data: category,
    })
    console.log(`Created category with id: ${newCategory.id}`)
  }
  for (const deliveryService of initialDeliveryServices) {
    const newDeliveryService = await prisma.deliveryService.create({
      data: deliveryService,
    })
    console.log(`Created delivery service with id: ${newDeliveryService.id}`)
  }
  for (const discount of initialDiscounts) {
    const newDiscount = await prisma.discount.create({
      data: discount,
    })
    console.log(`Created discount with id: ${newDiscount.id}`)
  }
  for (const product of initialProducts) {
    const newProduct = await prisma.product.create({
      data: product,
    })
    console.log(`Created product with id: ${newProduct.id}`)
  }
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
