import { Metadata } from 'next'
import EditProductPage from './EditProductPage'
import pageGuard from '@/lib/pageGuard'

export const metadata: Metadata = {
  title: 'Proizvodi | Edit',
}

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function Page(props: PageProps) {
  const params = await props.params;

  const {
    id
  } = params;

  await pageGuard({
    callbackUrl: `/admin/proizvodi/${id}/edit`,
    adminGuard: true,
  })

  return <EditProductPage id={id} />
}
