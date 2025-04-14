import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { Suspense } from 'react'
import { getCategories } from '@/data/services/category'
import CategoriesList, { CategoriesListSkeleton } from './CategoriesList'

type Props = {
  pageUrl: string
}

export default async function ProductsSidebar({ pageUrl }: Props) {
  const activeCategories = getCategories({ active: true })

  return (
    <Card className='hidden md:block mb-auto sticky top-[120px]'>
      <CardHeader>
        <CardDescription>Kategorije</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<CategoriesListSkeleton />}>
          <CategoriesList
            categoriesPromise={activeCategories}
            pageUrl={pageUrl}
          />
        </Suspense>
      </CardContent>
    </Card>
  )
}
