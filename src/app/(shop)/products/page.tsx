import { Metadata } from 'next'
import ProductsPage from '@/app/(shop)/products/ProductsPage'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Pokloni | Izaberi Poklon Shop',
}

export default async function Page(props: PageProps<'/products'>) {
  return (
    <Suspense>
      <PageLoader searchParams={props.searchParams} />
    </Suspense>
  )
}

async function PageLoader({
  searchParams,
}: Pick<PageProps<'/products'>, 'searchParams'>) {
  return <ProductsPage searchParams={searchParams} isAdmin={false} />
}
