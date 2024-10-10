import { Metadata } from 'next'
import CategoriesPage from './CategoriesPage'
import pageGuard from '@/lib/pageGuard'

export const metadata: Metadata = {
  title: 'Categories',
}

export default async function Page() {
  await pageGuard({ callbackUrl: '/admin/kategorije', adminGuard: true })

  return <CategoriesPage />
}
