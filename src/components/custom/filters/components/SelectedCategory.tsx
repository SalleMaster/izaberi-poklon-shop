'use client'

import { useSearchParams } from 'next/navigation'
import { CategoryWithImage } from '@/data/services/category'

type Props = {
  categories: CategoryWithImage[]
}

export default function SelectedCategoryLabel({ categories }: Props) {
  const searchParams = useSearchParams()

  const selectedCategory = searchParams.getAll('kategorija')

  const selectedCategoryLabel = categories.find((category) =>
    selectedCategory.includes(category.slug)
  )?.name

  if (!selectedCategoryLabel) {
    return 'Svi pokloni'
  }

  return selectedCategoryLabel
}
