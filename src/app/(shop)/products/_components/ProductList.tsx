import CustomPagination from '@/components/custom/CustomPagination'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import ProductCard, {
  ProductCardSkeleton,
} from '@/components/custom/ProductCard'
import { getProducts, getProductsCount } from '@/data/services/products'

type OrderByType = { price: 'asc' | 'desc' } | { createdAt: 'desc' }

export default async function ProductsList({
  searchParams,
  isAdminDashboard = false,
}: Pick<PageProps<'/products' | '/dashboard/products'>, 'searchParams'> & {
  isAdminDashboard?: boolean
}) {
  const searchParameters = await searchParams
  const { kategorija, sortiranje, stranica, prikazi, aktuelno } =
    searchParameters

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

  let trending

  switch (aktuelno) {
    case 'da':
      trending = true
      break
    case 'ne':
      trending = false
      break
    default:
      trending = false
  }

  const page = stranica ? Number(stranica) : 1
  const pageSize = prikazi ? Number(prikazi) : 10
  const skip = (page - 1) * pageSize
  const take = pageSize

  const products = await getProducts({
    kategorija,
    orderBy,
    skip,
    take,
    isAdmin: isAdminDashboard,
    trending,
  })

  const productsCount = await getProductsCount({
    kategorija,
    isAdmin: isAdminDashboard,
    trending,
  })

  return (
    <div className='space-y-5'>
      <div className='group-has-data-pending-products:animate-pulse group-has-data-pending-pagination:animate-pulse'>
        {products.length > 0 ? (
          <div className='grid gap-2 grid-cols-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
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

      <CustomPagination count={productsCount} />
    </div>
  )
}

export function ProductsListSkeleton() {
  return (
    <div className='grid gap-2 grid-cols-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
      {Array.from({ length: 12 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}
