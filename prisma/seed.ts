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

const initialPosts: Prisma.PostCreateInput[] = [
  {
    id: 'post-id-1',
    title: 'Post 1',
    slug: 'post-1',
    content: 'This is the content of post 1',
    published: false,
    media: {
      create: initialMedias[0],
    },
  },
  {
    id: 'post-id-2',
    title: 'Post 2',
    slug: 'post-2',
    content: 'This is the content of post 2',
    published: true,
    media: {
      create: initialMedias[1],
    },
  },
  {
    id: 'post-id-3',
    title: 'Post 3',
    slug: 'post-3',
    content: 'This is the content of post 3',
    published: true,
    media: {
      create: initialMedias[2],
    },
  },
]

async function main() {
  console.log('Start seeding ...')
  for (const post of initialPosts) {
    const newPost = await prisma.post.create({
      data: post,
    })
    console.log(`Created post with id: ${newPost.id}`)
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
