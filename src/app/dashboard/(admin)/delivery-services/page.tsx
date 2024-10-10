import { Metadata } from 'next'
import DeliveryServicesPage from './DeliveryServicesPage'
import pageGuard from '@/lib/pageGuard'

export const metadata: Metadata = {
  title: 'Delivery services',
}

export default async function Page() {
  await pageGuard({
    callbackUrl: '/admin/kurirske-sluzbe',
    adminGuard: true,
  })

  return <DeliveryServicesPage />
}
