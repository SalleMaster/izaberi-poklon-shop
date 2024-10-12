import { Metadata } from 'next'
import ProductsPage from './ProductsPage'
import pageGuard from '@/lib/pageGuard'

export const metadata: Metadata = {
  title: 'Proizvodi',
}

export default async function Page() {
  await pageGuard({
    callbackUrl: '/admin/proizvodi',
    adminGuard: true,
  })

  return <ProductsPage />
}
