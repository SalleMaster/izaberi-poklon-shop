import prisma from '@/lib/db'
import { PostForm } from '../../_components/PostForm'

type Params = {
  slug: string
}

export default async function EditPost({ params }: { params: Params }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } })
  return (
    <div className='container mx-auto mt-10'>
      <h1 className='mb-8'>Edit post</h1>

      <PostForm post={post} />
    </div>
  )
}
