import { Metadata } from 'next'
import PackageOptionsPage, {
  PackageOptionsPageSkeleton,
} from './PackageOptionsPage'
import pageGuard from '@/lib/pageGuard'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Poklon pakovanja | Admin',
}

export default async function Page() {
  return (
    <Suspense fallback={<PackageOptionsPageSkeleton />}>
      <PageLoader />
    </Suspense>
  )
}

async function PageLoader() {
  await pageGuard({
    callbackUrl: '/admin/poklon-pakovanja',
    adminGuard: true,
  })

  return <PackageOptionsPage />
}
