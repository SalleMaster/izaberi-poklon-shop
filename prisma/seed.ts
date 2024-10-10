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
    key: 'sample-pdf.pdf',
    name: 'Sample pdf',
    type: 'application/pdf',
    url: 'https://izaberi-poklon-shop-development-bucket-salle.s3.eu-north-1.amazonaws.com/sample-pdf.pdf',
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
      create: initialMedias[3],
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

async function main() {
  console.log('Start seeding ...')
  for (const category of initialCategories) {
    const newCategory = await prisma.category.create({
      data: category,
    })
    console.log(`Created post with id: ${newCategory.id}`)
  }
  for (const deliveryService of initialDeliveryServices) {
    const newDeliveryService = await prisma.deliveryService.create({
      data: deliveryService,
    })
    console.log(`Created delivery service with id: ${newDeliveryService.id}`)
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
