import { Metadata } from 'next'
import BannersPage from './BannersPage'
import pageGuard from '@/lib/pageGuard'

export const metadata: Metadata = {
  title: 'Admin | Baneri',
}

export default async function Page() {
  await pageGuard({ callbackUrl: '/admin/baneri', adminGuard: true })

  return <BannersPage />
}
