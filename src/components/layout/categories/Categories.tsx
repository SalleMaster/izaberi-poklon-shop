import { CategoryWithImage, getCategories } from '@/data/services/category'
import Link from 'next/link'
import Image from 'next/image'
import { fallbackImageLightURL } from '@/lib/consts'
import { cacheTag } from 'next/cache'

export default async function Categories() {
  'use cache'

  cacheTag('categories')

  const categories = await getCategories({ active: true })

  if (!categories.length) {
    return null
  }

  return (
    <div className='md:px-12'>
      <h2 className='text-2xl font-bold text-center mb-5'>
        Kategorije poklona
      </h2>
      <div className='grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 md:gap-8'>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}

type CategoryCardProps = {
  category: CategoryWithImage
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/pokloni?kategorija=${category.slug}`}>
      <div className='flex flex-col gap-4 items-center bg-white p-4 rounded-md shadow-md text-center h-full transition-transform transform hover:scale-105'>
        <Image
          src={category?.image?.url || fallbackImageLightURL}
          alt={category?.image?.name || 'No image'}
          width={150}
          height={150}
        />
        {category.name}
      </div>
    </Link>
  )
}
