import { Metadata } from 'next'
import EditProductPage from './EditProductPage'
import pageGuard from '@/lib/pageGuard'

export const metadata: Metadata = {
  title: 'Proizvodi | Edit',
}

type PageProps = {
  params: { id: string }
}

export default async function Page({ params: { id } }: PageProps) {
  await pageGuard({
    callbackUrl: `/admin/proizvodi/${id}/edit`,
    adminGuard: true,
  })

  return <EditProductPage id={id} />
}
