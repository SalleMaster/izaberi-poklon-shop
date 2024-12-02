import { Metadata } from 'next'
import DeliveryAddressPage from './DeliveryAddressPage'
import pageGuard from '@/lib/pageGuard'

export const metadata: Metadata = {
  title: 'Adresa dostave | Profil',
}

export default async function Page() {
  await pageGuard({ callbackUrl: '/profil/adresa-dostave' })

  return <DeliveryAddressPage />
}
