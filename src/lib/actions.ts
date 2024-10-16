'use server'

import prisma from '@/lib/db'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'
import { adminActionGuard, loggedInActionGuard } from './actionGuard'

const s3 = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const maxFileSize = 1 * 1024 * 1024 // 1 MB

export async function getSignedURL(
  name: string,
  type: string,
  size: number,
  checksum: string,
  allowedFileTypes: string[]
) {
  const { userId } = await loggedInActionGuard()

  if (type && !allowedFileTypes.includes(type)) {
    throw Error('Invalid file type')
  }

  if (size > maxFileSize) {
    throw Error('File size too large')
  }

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
  const { userId } = await loggedInActionGuard()

  const media = await prisma.media.create({
    data: {
      key,
      name,
      type,
      url,
      ...(userId && {
        user: {
          connect: {
            id: userId,
          },
        },
      }),
    },
  })

  return media
}

export async function deleteMedia(id: string, key: string) {
  await adminActionGuard()

  await prisma.media.delete({ where: { id } })
  await deleteMediaFromS3(key)
}

export async function deleteMediaFromS3(key: string) {
  await adminActionGuard()

  const deleteParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
  }

  await s3.send(new DeleteObjectCommand(deleteParams))
}
