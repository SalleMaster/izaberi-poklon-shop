'use server'

import prisma from '@/lib/db'
import { CreatePostValues, createPostSchema } from '@/lib/validation'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'
import { MediaDeprecated } from '@prisma/client'

const s3 = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const allowedFileTypes = ['image/jpeg', 'image/png']

const maxFileSize = 1 * 1024 * 1024 // 1 MB

// const generateFileName = (bytes = 32) =>
//   crypto.randomBytes(bytes).toString('hex')

// comment out the import and use this for edge functions
// const generateFileName = (bytes = 32) => {
//   const array = new Uint8Array(bytes)
//   crypto.getRandomValues(array)
//   return [...array].map((b) => b.toString(16).padStart(2, "0")).join("")
// }

type CreatePostWithoutImageFile = Omit<CreatePostValues, 'image'>
const createPostSchemaWithoutImage = createPostSchema.omit({
  image: true,
})

export async function createPost(
  values: CreatePostWithoutImageFile,
  mediaId?: string
) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    throw Error('Unauthorized')
  }

  const { title, content, published } =
    createPostSchemaWithoutImage.parse(values)

  const slug = title.replace(/\s+/g, '-').toLowerCase()

  await prisma.post.create({
    data: {
      title,
      slug,
      content,
      published,
      ...(mediaId && {
        media: {
          connect: {
            id: mediaId,
          },
        },
      }),
    },
  })

  revalidatePath('/')
  redirect(`/posts/${slug}/edit`)
}

export async function editPost(
  values: CreatePostWithoutImageFile,
  slug: string,
  removedMedia: MediaDeprecated[],
  mediaId?: string
) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    throw Error('Unauthorized')
  }

  const { title, content, published } =
    createPostSchemaWithoutImage.parse(values)
  const newSlug = title.replace(/\s+/g, '-').toLowerCase()

  await prisma.post.update({
    where: { slug },
    data: {
      title,
      slug: newSlug,
      content,
      published,
      ...(mediaId && {
        media: {
          connect: {
            id: mediaId,
          },
        },
      }),
    },
  })

  if (removedMedia.length > 0) {
    removedMedia.forEach(
      async (media) => await deleteMedia(media.id, media.key)
    )
  }

  revalidatePath('/posts')
  redirect(`/posts/${newSlug}/edit`)
}

export async function deletePost(slug: string) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    throw Error('Unauthorized')
  }

  const deletedPost = await prisma.post.delete({
    where: { slug },
    include: {
      media: true,
    },
  })

  const mediaKey = deletedPost.media?.key

  if (mediaKey) {
    await deleteMediaFromS3(mediaKey)
  }

  revalidatePath('/posts')
  redirect('/posts')
}

export async function getSignedURL(
  name: string,
  type: string,
  size: number,
  checksum: string
) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    throw Error('Unauthorized')
  }

  if (type && !allowedFileTypes.includes(type)) {
    throw Error('Invalid file type')
  }

  if (size > maxFileSize) {
    throw Error('File size too large')
  }

  // const fileName = generateFileName()
  const key = `${crypto.randomUUID()}-${name}`

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
    ContentType: type,
    ContentLength: size,
    ChecksumSHA256: checksum,
    Metadata: { userId: userId },
  })

  const signedURL = await getSignedUrl(s3, putObjectCommand, {
    expiresIn: 60, // 60 seconds
  })

  return { signedURL, key }
}

export async function createMedia(
  key: string,
  name: string,
  type: string,
  url: string
) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    throw Error('Unauthorized')
  }

  const media = await prisma.media.create({
    data: {
      key,
      name,
      type,
      url,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })

  return media
}

export async function deleteMedia(id: string, key: string) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    throw Error('Unauthorized')
  }

  await prisma.media.delete({ where: { id } })
  await deleteMediaFromS3(key)
}

export async function deleteMediaFromS3(key: string) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    throw Error('Unauthorized')
  }

  const deleteParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
  }

  await s3.send(new DeleteObjectCommand(deleteParams))
}
