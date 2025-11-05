import { Metadata } from 'next'
import EditProductPage from './EditProductPage'
import pageGuard from '@/lib/pageGuard'
import { Suspense } from 'react'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Edit proizvoda | Admin',
}

export default async function Page({
  params,
}: PageProps<'/dashboard/products/[id]/edit'>) {
  return (
    <Suspense fallback={<PageFallback />}>
      <PageLoader params={params} />
    </Suspense>
  )
}

async function PageLoader({
  params,
}: Pick<PageProps<'/dashboard/products/[id]/edit'>, 'params'>) {
  const { id } = await params

  await pageGuard({
    callbackUrl: `/admin/proizvodi/${id}/edit`,
    adminGuard: true,
  })

  return <EditProductPage id={id} />
}

function PageFallback() {
  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Edit</h2>

      <Separator />
    </div>
  )
}
