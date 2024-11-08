import prisma from '@/lib/db'
import ProductCard from '@/components/custom/ProductCard'

type PageProps = {
  params: { id: string }
}

export default async function ProductDetailsPage({
  params: { id },
}: PageProps) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      discount: true,
      coverImage: true,
      priceTable: {
        orderBy: { price: 'asc' },
      },
    },
  })

  return (
    <div className='space-y-10'>
      <h2 className='text-xl font-bold'>Product details</h2>
      {product ? <ProductCard product={product} /> : null}
    </div>
  )
}
