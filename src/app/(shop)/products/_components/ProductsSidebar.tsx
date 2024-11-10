import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { Suspense } from 'react'
import { getActiveCategories } from '@/data/services/category'
import CategoriesList from './CategoriesList'

export default async function ProductsSidebar() {
  const activeCategories = getActiveCategories()

  return (
    <Card className='hidden max-h-[75vh] md:block mb-auto sticky top-[120px]'>
      <CardHeader>
        <CardDescription>Kategorije</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          <CategoriesList categoriesPromise={activeCategories} />
        </Suspense>
      </CardContent>
    </Card>
  )
}
