import type { Category, Media } from '@prisma/client'
import { use } from 'react'
import Image from 'next/image'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { fallbackImageURL } from '@/lib/consts'

type CategoryWithImage = Category & {
  image: Media | null
}

type Props = {
  categoriesPromise: Promise<CategoryWithImage[]>
}

export default function CategoriesList({ categoriesPromise }: Props) {
  const categories = use(categoriesPromise)
  return (
    <>
      {categories.map((category) => (
        <DropdownMenuItem key={category.id} asChild>
          <Link
            href={`/pokloni?${new URLSearchParams({ kategorija: category.slug })}`}
          >
            <div className='w-6 mr-2'>
              <Image
                src={category?.image?.url || fallbackImageURL}
                alt={category?.image?.name || 'No image'}
                width={24}
                height={24}
              />
            </div>
            {category.name}
          </Link>
        </DropdownMenuItem>
      ))}
    </>
  )
}
