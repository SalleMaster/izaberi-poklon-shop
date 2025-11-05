import { Metadata } from 'next'
import DiscountsPage, { DiscountsPageSkeleton } from './DiscountsPage'
import pageGuard from '@/lib/pageGuard'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Popusti | Admin',
}

export default async function Page() {
  return (
    <Suspense fallback={<DiscountsPageSkeleton />}>
      <PageLoader />
    </Suspense>
  )
}

async function PageLoader() {
  await pageGuard({
    callbackUrl: '/admin/popusti',
    adminGuard: true,
  })

  return <DiscountsPage />
}
