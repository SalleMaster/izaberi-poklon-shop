import { Metadata } from 'next'
import CouponsPage from './CouponsPage'
import pageGuard from '@/lib/pageGuard'

export const metadata: Metadata = {
  title: 'Admin | Kuponi',
}

export default async function Page() {
  await pageGuard({
    callbackUrl: '/admin/kuponi',
    adminGuard: true,
  })

  return <CouponsPage />
}
