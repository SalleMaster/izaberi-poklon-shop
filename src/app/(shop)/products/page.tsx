import { NotificationAlert } from '@/components/custom/NotificationAlert'
import ProductCard from '@/components/custom/ProductCard'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/db'
import ProductsSidebar from './_components/ProductsSidebar'
import ProductsHeader from './_components/ProductsHeader'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type OrderByType = { price: 'asc' | 'desc' } | { createdAt: 'desc' }

export default async function ProductsPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const { kategorija, sortiranje } = searchParams

  let orderBy: OrderByType

  switch (sortiranje) {
    case 'najvisa-cena':
      orderBy = { price: 'desc' }
      break
    case 'najniza-cena':
      orderBy = { price: 'asc' }
      break
    case 'najnoviji':
      orderBy = { createdAt: 'desc' }
      break
    default:
      orderBy = { createdAt: 'desc' }
  }

  const products = await prisma.product.findMany({
    where: {
      ...(kategorija
        ? {
            categories: {
              some: {
                slug: Array.isArray(kategorija)
                  ? { in: kategorija }
                  : kategorija,
                active: true,
              },
            },
          }
        : {
            categories: {
              some: {
                active: true,
              },
            },
          }),
    },
    orderBy,
    include: {
      coverImage: true,
      discount: true,
      priceTable: {
        orderBy: { price: 'asc' },
      },
    },
  })

  return (
    <div className='space-y-5'>
      <ProductsHeader />

      <Separator />

      <div className='md:grid gap-5 grid-cols-products'>
        <ProductsSidebar />

        <div className='group-has-[[data-pending-products]]:animate-pulse'>
          {products.length > 0 ? (
            <div className='grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <NotificationAlert
              title='Obaveštenje'
              description='Trenutno nema proizvoda po zadatom kriterijumu.'
              variant='info'
              className='mb-auto'
            />
          )}
        </div>
      </div>
    </div>
  )
}
