import { NotificationAlert } from '@/components/custom/NotificationAlert'
import ProductCard from '@/components/custom/ProductCard'
import prisma from '@/lib/db'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { coverImage: true, discount: true },
  })

  return (
    <div className='space-y-10'>
      <h2 className='text-xl font-bold'>Proizvodi</h2>

      {products.length > 0 ? (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <NotificationAlert
          title='Obaveštenje'
          description='Trenutno nema proizvoda'
          variant='info'
        />
      )}
    </div>
  )
}
