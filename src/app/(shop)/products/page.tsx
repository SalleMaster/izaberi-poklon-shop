import { Suspense } from 'react'
import { Metadata } from 'next'

import ProductsList, { ProductsListSkeleton } from './_components/ProductList'
import CategoryFilters from './_components/CategoryFilters'
import ProductsHeader from './_components/ProductsHeader'

export const metadata: Metadata = {
  title: 'Pokloni | Reci Seci Pokloni Shop',
}

export default async function Page({ searchParams }: PageProps<'/products'>) {
  return (
    <div className='space-y-5'>
      <ProductsHeader />

      <div className='md:grid gap-5 grid-cols-products mx-1'>
        <CategoryFilters />

        <Suspense fallback={<ProductsListSkeleton />}>
          <ProductsList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}
