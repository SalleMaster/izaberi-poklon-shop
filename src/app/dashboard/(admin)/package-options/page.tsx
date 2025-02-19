import { Metadata } from 'next'
import PackageOptionsPage from './PackageOptionsPage'
import pageGuard from '@/lib/pageGuard'

export const metadata: Metadata = {
  title: 'Poklon pakovanja | Admin',
}

export default async function Page() {
  await pageGuard({
    callbackUrl: '/admin/poklon-pakovanja',
    adminGuard: true,
  })

  return <PackageOptionsPage />
}
