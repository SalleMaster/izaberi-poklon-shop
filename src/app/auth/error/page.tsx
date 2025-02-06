import { redirect } from 'next/navigation'
import getSession from '@/lib/getSession'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function ErrorPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams

  const session = await getSession()
  const user = session?.user

  if (user) {
    redirect('/')
  }

  return (
    <div className='flex'>
      <Card className='w-full md:max-w-96 mx-auto'>
        <CardHeader>
          <CardTitle>Ups greška</CardTitle>
          <CardDescription>
            Izvinjavamo se, došlo je do greške prilikom prijave. Molimo
            pokušajte ponovo.
          </CardDescription>
          <CardDescription>Kod greške: {searchParams.error}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
