import prisma from '@/lib/db'
import Image from 'next/image'

type Params = {
  slug: string
}

export default async function Post({ params }: { params: Params }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: { media: true },
  })

  const mediaUrl = post?.media?.url
  console.log(post)
  return (
    <div className='container mx-auto mt-10'>
      <h1 className='mb-8'>{post?.title}</h1>

      {mediaUrl ? (
        <Image src={mediaUrl} width={200} height={200} alt='Post image' />
      ) : null}

      <p>{post?.content}</p>
    </div>
  )
}
