import { Metadata } from 'next'
import DiscountsPage, { DiscountsPageSkeleton } from './DiscountsPage'
import pageGuard from '@/lib/pageGuard'
import { getDiscounts } from '@/data/services/discounts'
import { Separator } from '@/components/ui/separator'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Popusti | Admin',
}

export default async function Page() {
  await pageGuard({
    callbackUrl: '/admin/popusti',
    adminGuard: true,
  })

  const activeDiscountsPromise = getDiscounts({ active: true })
  const inactiveDiscountsPromise = getDiscounts({ active: false })

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Popusti</h2>

      <Separator />

      <Suspense fallback={<DiscountsPageSkeleton />}>
        <DiscountsPage
          activeDiscountsPromise={activeDiscountsPromise}
          inactiveDiscountsPromise={inactiveDiscountsPromise}
        />
      </Suspense>
    </div>
  )
}
