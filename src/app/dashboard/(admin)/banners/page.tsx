import { Metadata } from 'next'
import BannersPage from './BannersPage'
import pageGuard from '@/lib/pageGuard'

export const metadata: Metadata = {
  title: 'Baneri | Admin',
}

export default async function Page() {
  await pageGuard({ callbackUrl: '/admin/baneri', adminGuard: true })

  return <BannersPage />
}
