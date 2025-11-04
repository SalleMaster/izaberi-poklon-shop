import { Metadata } from 'next'
import CategoriesPage, { CategoriesPageSkeleton } from './CategoriesPage'
import pageGuard from '@/lib/pageGuard'
import { getCategories } from '@/data/services/category'
import { Separator } from '@/components/ui/separator'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Kategorije | Admin',
}

export default async function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PageLoader />
    </Suspense>
  )
}

async function PageLoader() {
  await pageGuard({ callbackUrl: '/admin/kategorije', adminGuard: true })

  const activeCategoriesPromise = getCategories({ active: true })
  const inactiveCategoriesPromise = getCategories({ active: false })

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Kategorije</h2>

      <Separator />

      <Suspense fallback={<CategoriesPageSkeleton />}>
        <CategoriesPage
          activeCategoriesPromise={activeCategoriesPromise}
          inactiveCategoriesPromise={inactiveCategoriesPromise}
        />
      </Suspense>
    </div>
  )
}

function PageSkeleton() {
  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Kategorije</h2>

      <Separator />

      <CategoriesPageSkeleton />
    </div>
  )
}
