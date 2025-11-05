import { redirect } from 'next/navigation'
import getSession from '@/lib/getSession'

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Suspense } from 'react'

export default async function Page(props: PageProps<'/auth/error'>) {
  return (
    <Suspense>
      <PageLoader searchParams={props.searchParams} />
    </Suspense>
  )
}

async function PageLoader({
  searchParams,
}: Pick<PageProps<'/auth/error'>, 'searchParams'>) {
  const session = await getSession()
  const user = session?.user

  if (user) {
    redirect('/')
  }

  const error = (await searchParams).error

  return (
    <div className='flex'>
      <Card className='w-full md:max-w-96 mx-auto'>
        <CardHeader>
          <CardTitle>Ups greška</CardTitle>
          <CardDescription>
            Izvinjavamo se, došlo je do greške prilikom prijave. Molimo
            pokušajte ponovo.
          </CardDescription>
          <CardDescription>Kod greške: {error}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
