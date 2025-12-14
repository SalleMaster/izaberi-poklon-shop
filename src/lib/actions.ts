'use server'

import prisma from '@/lib/db'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'
import { loggedInActionGuard } from './actionGuard'

const s3 = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const maxFileSize = 5 * 1024 * 1024 // 5 MB

export async function getSignedURL(
  name: string,
  type: string,
  size: number,
  checksum: string,
  allowedFileTypes: string[]
) {
  try {
    const { userId } = await loggedInActionGuard()

    if (type && !allowedFileTypes.includes(type)) {
      return {
        success: false,
        error: `Fajl tip nije podržan. Podržani tipovi: ${allowedFileTypes.join(', ')}`,
        data: { signedURL: '', key: '' },
      }
    }

    if (size > maxFileSize) {
      return {
        success: false,
        error: `Fajl premašuje dozvoljenu veličinu. Maksimum ${Math.round(maxFileSize / 1024 / 1024)}MB`,
        data: { signedURL: '', key: '' },
      }
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

    return {
      success: true,
      data: { signedURL, key },
    }
  } catch (error) {
    return {
      success: false,
      error: 'Greška prilikom generisanja URL-a za otpremanje fajla.',
      data: { signedURL: '', key: '' },
    }
  }
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

export async function deleteMedia(id: string) {
  await loggedInActionGuard()

  const media = await prisma.media.delete({ where: { id } })
  if (media) {
    await deleteMediaFromS3(media.key)
  }
}

export async function deleteMediaFromS3(key: string) {
  await loggedInActionGuard()

  const deleteParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME!,
    Key: key,
  }

  await s3.send(new DeleteObjectCommand(deleteParams))
}

export async function deleteMediasFromS3(keys: string[]) {
  await loggedInActionGuard()

  await Promise.all(
    keys.map(async (key) => {
      const deleteParams = {
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
      }

      await s3.send(new DeleteObjectCommand(deleteParams))
    })
  )
}
