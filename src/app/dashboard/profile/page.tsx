import { Metadata } from 'next'
import ProfilePage from './ProfilePage'
import pageGuard from '@/lib/pageGuard'

export const metadata: Metadata = {
  title: 'Profile',
}

export default async function Page() {
  await pageGuard({ callbackUrl: '/dashboard/profile' })

  return <ProfilePage />
}
