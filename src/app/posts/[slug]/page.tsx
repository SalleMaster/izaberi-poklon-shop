import prisma from '@/lib/db'

type Params = {
  slug: string
}

export default async function Post({ params }: { params: Params }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } })
  return (
    <div className='container mx-auto mt-10'>
      <h1 className='mb-8'>{post?.title}</h1>

      <p>{post?.content}</p>
    </div>
  )
}
