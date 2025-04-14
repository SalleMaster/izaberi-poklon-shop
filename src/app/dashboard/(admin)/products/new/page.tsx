import { Metadata } from 'next'
import NewProductPage from './NewProductPage'
import pageGuard from '@/lib/pageGuard'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Novi proizvod | Admin',
}

export default async function Page() {
  await pageGuard({
    callbackUrl: '/admin/proizvodi/novi',
    adminGuard: true,
  })

  return (
    <div className='space-y-5'>
      <h2 className='text-xl font-bold'>Novi Proizvod</h2>

      <Separator />

      <NewProductPage />
    </div>
  )
}
