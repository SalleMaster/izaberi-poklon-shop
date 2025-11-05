import { cacheTag } from 'next/cache'
import FooterLinks from './FooterLinks'
import { getCategories } from '@/data/services/category'

export default async function SpecialCategories() {
  'use cache'

  cacheTag('categories')

  const categories = await getCategories({
    special: true,
    active: true,
  })

  const generateCategoryLinks = () => {
    return categories.map((category) => ({
      href: `/pokloni?kategorija=${encodeURIComponent(category.slug)}`,
      label: category.name,
    }))
  }

  const mainLinks = generateCategoryLinks()

  return <FooterLinks title='Aktuelno' links={mainLinks} />
}

export function SpecialCategoriesSkeleton() {
  return (
    <div>
      <h2 className='text-lg font-semibold mb-2.5'>Po datumu</h2>
    </div>
  )
}
