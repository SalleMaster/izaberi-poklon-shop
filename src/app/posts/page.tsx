import { createPost } from '@/actions/actions'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/db'
import Link from 'next/link'

export default async function Posts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, slug: true },
  })

  const postsCount = prisma.post.count()

  // Example to get the post from a specific user
  // const user = await prisma.user.findUnique({ where: { email: 'some@email.com' }, include: { posts: true } })
  return (
    <div className='container mx-auto mt-10'>
      <h1 className='mb-8'>Posts ({postsCount})</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id} className='mb-4'>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <form action={createPost} className='flex flex-col w-2/4 gap-4'>
        <p>Add a product</p>
        <input
          type='text'
          name='title'
          placeholder='Title'
          className='px-2 py-1 rounded-sm border-2 border-gray-300'
        />
        <textarea
          name='content'
          rows={5}
          placeholder='Content'
          className='px-2 py-1 rounded-sm border-2 border-gray-300'
        />
        <Button type='submit'>Create a post</Button>
      </form>
    </div>
  )
}
