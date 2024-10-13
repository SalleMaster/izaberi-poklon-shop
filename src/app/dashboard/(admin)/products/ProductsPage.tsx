import { Button } from '@/components/ui/button'
import prisma from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { coverImage: true },
  })

  return (
    <div className='space-y-10'>
      <h2 className='text-xl font-bold'>Proizvodi</h2>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {products.map((product) => (
          <div
            key={product.id}
            className='flex flex-col bg-white p-4 rounded-md shadow-md'
          >
            {product.coverImage && (
              <Image
                src={product.coverImage.url}
                alt={product.coverImage.name}
                width={300}
                height={300}
                priority
                className='w-full'
              />
            )}

            <h3 className='text-lg font-bold'>{product.name}</h3>
            <p className='text-gray-500'>{product.description}</p>
            <Button className='ml-auto' asChild>
              <Link href={`/admin/proizvodi/${product.id}/edit`}>Edit</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
