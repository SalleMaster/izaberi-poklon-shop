import { Metadata } from 'next'
import DeliveryFeesPage from './DeliveryFeesPage'
import pageGuard from '@/lib/pageGuard'

export const metadata: Metadata = {
  title: 'Poštarine | Admin',
}

export default async function Page() {
  await pageGuard({
    callbackUrl: '/admin/postarine',
    adminGuard: true,
  })

  return <DeliveryFeesPage />
}
