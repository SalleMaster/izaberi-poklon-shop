'use client'

import type { Category, Media } from '@prisma/client'
import { use } from 'react'
import { useSearchParams } from 'next/navigation'
import FooterLinks from './FooterLinks'
import useCreateQueryString from '@/hooks/use-create-query-string'

type CategoryWithImage = Category & {
  image: Media | null
}

type Props = {
  categoriesPromise: Promise<CategoryWithImage[]>
}

export default function SpecialCategories({ categoriesPromise }: Props) {
  const categories = use(categoriesPromise)
  const searchParams = useSearchParams()

  const createQueryString = useCreateQueryString(searchParams)

  const generateCategoryLinks = () => {
    return categories.map((category) => ({
      href: `/pokloni?${createQueryString({
        addParams: [{ name: 'kategorija', value: category.slug }],
      })}`,
      label: category.name,
    }))
  }

  const mainLinks = generateCategoryLinks()

  return <FooterLinks title='Po datumu' links={mainLinks} />
}

export function SpecialCategoriesSkeleton() {
  return (
    <div>
      <h2 className='text-lg font-semibold mb-2.5'>Po datumu</h2>
    </div>
  )
}
