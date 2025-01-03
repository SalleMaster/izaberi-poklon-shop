import { Separator } from '@/components/ui/separator'
import ProductsSidebar from './_components/ProductsSidebar'
import ProductsHeader from './_components/ProductsHeader'
import { getProducts, getProductsCount } from '@/data/services/products'
import ProductsGrid, { ProductsGridSkeleton } from './_components/ProductsGrid'
import { Suspense } from 'react'
import CustomPagination from '@/components/custom/CustomPagination'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type OrderByType = { price: 'asc' | 'desc' } | { createdAt: 'desc' }

export default async function ProductsPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const { kategorija, sortiranje, stranica, prikazi } = searchParams

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

  const page = stranica ? Number(stranica) : 1
  const pageSize = prikazi ? Number(prikazi) : 10
  const skip = (page - 1) * pageSize
  const take = pageSize

  const productsPromise = getProducts({ kategorija, orderBy, skip, take })
  const productsCountPromise = getProductsCount({ kategorija })

  return (
    <div className='space-y-5 group'>
      <ProductsHeader />

      <Separator />

      <div className='md:grid gap-5 grid-cols-products'>
        <ProductsSidebar />

        <Suspense fallback={<ProductsGridSkeleton />}>
          <div className='space-y-5'>
            <ProductsGrid productsPromise={productsPromise} />
            <CustomPagination
              countPromise={productsCountPromise}
              pageUrl='/pokloni'
            />
          </div>
        </Suspense>
      </div>
    </div>
  )
}
