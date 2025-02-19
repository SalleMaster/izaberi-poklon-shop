import { Metadata } from 'next'
import DiscountsPage from './DiscountsPage'
import pageGuard from '@/lib/pageGuard'

export const metadata: Metadata = {
  title: 'Popusti | Admin',
}

export default async function Page() {
  await pageGuard({
    callbackUrl: '/admin/popusti',
    adminGuard: true,
  })

  return <DiscountsPage />
}
