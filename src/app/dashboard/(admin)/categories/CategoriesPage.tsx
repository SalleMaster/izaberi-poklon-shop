import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { GetCategoriesReturnType } from '@/data/services/category'
import { use } from 'react'
import CategoryCard, { CategoryCardSkeleton } from './_components/CategoryCard'

type Props = {
  activeCategoriesPromise: GetCategoriesReturnType
  inactiveCategoriesPromise: GetCategoriesReturnType
}

export default function CategoriesPage({
  activeCategoriesPromise,
  inactiveCategoriesPromise,
}: Props) {
  const activeCategories = use(activeCategoriesPromise)
  const inactiveCategories = use(inactiveCategoriesPromise)

  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Nova</h2>
        <CategoryCard />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Aktivne</h2>
        {activeCategories.length > 0 ? (
          activeCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema aktivnih kategorija'
            variant='info'
          />
        )}
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Neaktivne</h2>
        {inactiveCategories.length > 0 ? (
          inactiveCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema neaktivnih kategorija'
            variant='info'
          />
        )}
      </div>
    </div>
  )
}

export function CategoriesPageSkeleton() {
  return (
    <div className='space-y-10'>
      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Nova</h2>
        <CategoryCardSkeleton />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Aktivne</h2>
        <CategoryCardSkeleton />
        <CategoryCardSkeleton />
        <CategoryCardSkeleton />
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-medium'>Neaktivne</h2>
        <CategoryCardSkeleton />
        <CategoryCardSkeleton />
        <CategoryCardSkeleton />
      </div>
    </div>
  )
}
