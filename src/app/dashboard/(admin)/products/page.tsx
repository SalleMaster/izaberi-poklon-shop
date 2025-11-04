import { Metadata } from 'next'
import ProductsPage from '@/app/(shop)/products/ProductsPage'
import pageGuard from '@/lib/pageGuard'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Proizvodi | Admin',
}

export default async function Page(props: PageProps<'/dashboard/products'>) {
  return (
    <Suspense>
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

  return <ProductsPage searchParams={searchParams} isAdmin={true} />
}
