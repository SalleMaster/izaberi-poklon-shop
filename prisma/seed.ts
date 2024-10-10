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

async function main() {
  console.log('Start seeding ...')
  for (const category of initialCategories) {
    const newCategory = await prisma.category.create({
      data: category,
    })
    console.log(`Created post with id: ${newCategory.id}`)
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
