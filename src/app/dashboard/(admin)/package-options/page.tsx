import { Metadata } from 'next'
import PackageOptionsPage, {
  PackageOptionsPageSkeleton,
} from './PackageOptionsPage'
import pageGuard from '@/lib/pageGuard'
import { getPackageOptions } from '@/data/services/packageOptions'
import { Separator } from '@/components/ui/separator'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Poklon pakovanja | Admin',
}

export default async function Page() {
  await pageGuard({
    callbackUrl: '/admin/poklon-pakovanja',
    adminGuard: true,
  })

  const packageOptionsPromise = getPackageOptions()

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Poklon pakovanja</h2>

      <Separator />

      <Suspense fallback={<PackageOptionsPageSkeleton />}>
        <PackageOptionsPage packageOptionsPromise={packageOptionsPromise} />
      </Suspense>
    </div>
  )
}
