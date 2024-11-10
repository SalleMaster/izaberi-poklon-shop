import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { Suspense } from 'react'
import { getActiveCategories } from '@/data/services/category'
import CategoriesList from './CategoriesList'

type ProductsSidebarProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ProductsSidebar(
  {
    // searchParams,
  }: ProductsSidebarProps
) {
  const activeCategories = getActiveCategories()

  // const { kategorija } = searchParams

  return (
    <Card className='hidden max-h-[75vh] md:block mb-auto sticky top-[120px]'>
      <CardHeader>
        <CardDescription>Kategorije</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          <CategoriesList
            categoriesPromise={activeCategories}
            // searchParams={searchParams}
          />
        </Suspense>

        {/* <Separator className='my-4' />

        <Link
          href={`/pokloni?${new URLSearchParams({ ...searchParams, kategorija: '' }).toString()}`}
          className={cn(
            'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            !kategorija && 'bg-accent text-accent-foreground'
          )}
        >
          Svi pokloni
        </Link> */}
      </CardContent>
    </Card>
  )
}
