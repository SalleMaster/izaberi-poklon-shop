import { Button } from '@/components/ui/button'
import prisma from '@/lib/db'
import Link from 'next/link'
import { Post } from '@prisma/client'

export default async function Posts() {
  const publishedPosts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, slug: true },
  })

  const unpublishedPosts = await prisma.post.findMany({
    where: { published: false },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, slug: true },
  })

  const postsCount = prisma.post.count()

  // Example to get the post from a specific user
  // const user = await prisma.user.findUnique({ where: { email: 'some@email.com' }, include: { posts: true } })
  return (
    <div className='container mx-auto mt-10'>
      <h1 className='text-3xl font-semibold mb-8'>Posts ({postsCount})</h1>

      <h1 className='text-xl font-semibold mb-8'>
        Published posts ({publishedPosts.length})
      </h1>

      <ul>
        {publishedPosts.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </ul>

      <h1 className='text-xl font-semibold mb-8'>
        Unpublished posts ({unpublishedPosts.length})
      </h1>

      <ul>
        {unpublishedPosts.map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
      </ul>
    </div>
  )
}

type PostItemProps = Pick<Post, 'id' | 'slug' | 'title'>

function PostItem(post: PostItemProps) {
  return (
    <li className='flex justify-between w-2/4 mb-4'>
      <Link href={`/posts/${post.slug}`}>{post.title}</Link>
      <Button asChild>
        <Link href={`/posts/${post.slug}/edit`}>Edit</Link>
      </Button>
    </li>
  )
}
