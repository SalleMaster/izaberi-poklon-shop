import { Separator } from '@/components/ui/separator'
import ProductsSidebar from './_components/ProductsSidebar'
import ProductsHeader from './_components/ProductsHeader'
import { getProducts, getProductsCount } from '@/data/services/products'
import ProductsGrid, { ProductsGridSkeleton } from './_components/ProductsGrid'
import { Suspense } from 'react'
import CustomPagination from '@/components/custom/CustomPagination'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type OrderByType = { price: 'asc' | 'desc' } | { createdAt: 'desc' }

type ProductsPageProps = {
  searchParams: SearchParams
  isAdmin?: boolean
}

export default async function ProductsPage({
  searchParams,
  isAdmin = false,
}: ProductsPageProps) {
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

  const productsPromise = getProducts({
    kategorija,
    orderBy,
    skip,
    take,
    isAdmin,
    trending,
  })
  const productsCountPromise = getProductsCount({
    kategorija,
    isAdmin,
    trending,
  })

  return (
    // <div className='space-y-5 group'>
    <div className='space-y-5'>
      <ProductsHeader pageUrl={isAdmin ? '/admin/proizvodi' : '/pokloni'} />

      <Separator />

      <div className='md:grid gap-5 grid-cols-products'>
        <ProductsSidebar pageUrl={isAdmin ? '/admin/proizvodi' : '/pokloni'} />

        <Suspense fallback={<ProductsGridSkeleton />}>
          <div className='space-y-5'>
            <ProductsGrid productsPromise={productsPromise} />
            <CustomPagination
              countPromise={productsCountPromise}
              pageUrl={isAdmin ? '/admin/proizvodi' : '/pokloni'}
            />
          </div>
        </Suspense>
      </div>
    </div>
  )
}
