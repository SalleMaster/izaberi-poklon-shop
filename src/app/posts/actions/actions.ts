'use server'

import prisma from '@/lib/db'
import { CreatePostValues, createPostSchema } from '@/lib/validation'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export async function createPost(values: CreatePostValues) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    throw Error('Unauthorized')
  }

  const { title, content, published } = createPostSchema.parse(values)

  const newSlug = title.replace(/\s+/g, '-').toLowerCase()

  await prisma.post.create({
    data: {
      title,
      slug: newSlug,
      content,
      published,
    },
  })

  revalidatePath('/')
  redirect(`/posts/${newSlug}/edit`)
}

export async function editPost(values: CreatePostValues, slug: string) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    throw Error('Unauthorized')
  }

  const { title, content, published } = createPostSchema.parse(values)
  const newSlug = title.replace(/\s+/g, '-').toLowerCase()

  await prisma.post.update({
    where: { slug },
    data: {
      title,
      slug: newSlug,
      content,
      published,
    },
  })

  revalidatePath('/posts')
  redirect(`/posts/${newSlug}/edit`)
}

export async function deletePost(slug: string) {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    throw Error('Unauthorized')
  }

  await prisma.post.delete({ where: { slug } })

  revalidatePath('/posts')
  redirect('/posts')
}
