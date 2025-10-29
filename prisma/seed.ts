import { Prisma, PrismaClient } from '@/generated/prisma'
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
    special: false,
    image: {
      create: initialMedias[1],
    },
  },
  {
    id: 'category-id-3',
    name: 'Category 3',
    slug: 'category-3',
    active: true,
    special: false,
    image: {
      create: initialMedias[2],
    },
  },
  {
    id: 'category-id-4',
    name: 'Category 4',
    slug: 'category-4',
    active: true,
    special: false,
  },
  {
    id: 'category-id-5',
    name: 'Category 5',
    slug: 'category-5',
    active: true,
    special: false,
  },
  {
    id: 'category-id-6',
    name: 'Category 6',
    slug: 'category-6',
    active: true,
    special: false,
  },
  {
    id: 'category-id-7',
    name: 'Category 7',
    slug: 'category-7',
    active: true,
    special: false,
  },
  {
    id: 'category-id-8',
    name: 'Category 8',
    slug: 'category-8',
    active: true,
    special: false,
  },
  {
    id: 'category-id-9',
    name: 'Category 9',
    slug: 'category-9',
    active: true,
    special: false,
  },
  {
    id: 'category-id-10',
    name: 'Category 10',
    slug: 'category-10',
    active: true,
    special: false,
  },
  {
    id: 'category-id-11',
    name: 'Category 11',
    slug: 'category-11',
    active: true,
    special: false,
  },
  {
    id: 'category-id-12',
    name: 'Category 12',
    slug: 'category-12',
    active: true,
    special: false,
  },
  {
    id: 'category-id-13',
    name: 'New Year',
    slug: 'category-13',
    active: true,
    special: true,
  },
  {
    id: 'category-id-14',
    name: 'Christmas',
    slug: 'category-14',
    active: true,
    special: true,
  },
  {
    id: 'category-id-15',
    name: '8th of March',
    slug: 'category-15',
    active: true,
    special: true,
  },
  {
    id: 'category-id-16',
    name: "Valentine's Day",
    slug: 'category-16',
    active: true,
    special: true,
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
    predefinedPrices: true,
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

const initialDeliveryFees: Prisma.DeliveryFeeCreateInput[] = [
  {
    name: 'od 0 do 0,5 kg',
    fee: 350,
  },
  {
    name: 'od 0,5 do 2 kg',
    fee: 480,
  },
  {
    name: 'od 2 do 5 kg',
    fee: 700,
  },
  {
    name: 'od 5 do 10 kg',
    fee: 880,
  },
  {
    name: 'od 10 do 15 kg',
    fee: 1170,
  },
]

const initialPackageOptions: Prisma.PackageOptionCreateInput[] = [
  {
    name: 'Picture frame',
    description: 'Lux picture frame package option',
    price: 300,
  },
  {
    name: 'Magnet set',
    description: 'Lux magnet set package option',
    price: 400,
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
  for (const deliveryFee of initialDeliveryFees) {
    const newDeliveryFee = await prisma.deliveryFee.create({
      data: deliveryFee,
    })
    console.log(`Created delivery fee with id: ${newDeliveryFee.id}`)
  }
  for (const packageOption of initialPackageOptions) {
    const newPackageOption = await prisma.packageOption.create({
      data: packageOption,
    })
    console.log(`Created package option with id: ${newPackageOption.id}`)
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
