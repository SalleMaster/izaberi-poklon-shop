import { Metadata } from 'next'
import ProductsPage from '@/app/(shop)/products/page'
import pageGuard from '@/lib/pageGuard'

export const metadata: Metadata = {
  title: 'Proizvodi | Admin',
}

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function Page(props: { searchParams: SearchParams }) {
  await pageGuard({
    callbackUrl: '/admin/proizvodi',
    adminGuard: true,
  })

  return <ProductsPage searchParams={props.searchParams} isAdmin={true} />
}
