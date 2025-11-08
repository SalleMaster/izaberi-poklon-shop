import { Metadata } from 'next'
import pageGuard from '@/lib/pageGuard'
import { Suspense } from 'react'

import { Separator } from '@/components/ui/separator'
import ProductsHeader from '@/app/(shop)/products/_components/ProductsHeader'
import CategoryFilters from '@/app/(shop)/products/_components/CategoryFilters'
import ProductsList, {
  ProductsListSkeleton,
} from '@/app/(shop)/products/_components/ProductList'

export const metadata: Metadata = {
  title: 'Proizvodi | Admin',
}

export default async function Page(props: PageProps<'/dashboard/products'>) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageLoader searchParams={props.searchParams} />
    </Suspense>
  )
}

async function PageLoader({
  searchParams,
}: Pick<PageProps<'/dashboard/products'>, 'searchParams'>) {
  await pageGuard({
    callbackUrl: '/admin/proizvodi',
    adminGuard: true,
  })

  return (
    <div className='space-y-5'>
      <ProductsHeader />

      <Separator />

      <div className='md:grid gap-5 grid-cols-products'>
        <CategoryFilters />

        <Suspense fallback={<ProductsListSkeleton />}>
          <ProductsList searchParams={searchParams} isAdminDashboard />
        </Suspense>
      </div>
    </div>
  )
}

function PageFallback() {
  return (
    <div className='space-y-5'>
      <ProductsHeader />

      <Separator />

      <div className='md:grid gap-5 grid-cols-products'>
        <CategoryFilters />

        <ProductsListSkeleton />
      </div>
    </div>
  )
}
