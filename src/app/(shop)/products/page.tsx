import { Separator } from '@/components/ui/separator'
import ProductsSidebar from './_components/ProductsSidebar'
import ProductsHeader from './_components/ProductsHeader'
import { getProducts } from '@/data/services/products'
import ProductsGrid from './_components/ProductsGrid'
import { Suspense } from 'react'

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

  const productsPromise = getProducts({ kategorija, orderBy })

  return (
    <div className='space-y-5 group'>
      <ProductsHeader />

      <Separator />

      <div className='md:grid gap-5 grid-cols-products'>
        <ProductsSidebar />

        <Suspense fallback={<div>Loading...</div>}>
          <ProductsGrid productsPromise={productsPromise} />
        </Suspense>
      </div>
    </div>
  )
}
