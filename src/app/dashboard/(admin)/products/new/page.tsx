import { Metadata } from 'next'
import NewProductPage from './NewProductPage'
import pageGuard from '@/lib/pageGuard'

export const metadata: Metadata = {
  title: 'Novi proizvod | Admin',
}

export default async function Page() {
  await pageGuard({
    callbackUrl: '/admin/proizvodi/novi',
    adminGuard: true,
  })

  return <NewProductPage />
}
