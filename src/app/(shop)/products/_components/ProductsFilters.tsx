import { Separator } from '@/components/ui/separator'
import TrendingFilter from '@/components/custom/filters/TrendingFilter'
import DisplayFilter from '@/components/custom/filters/DisplayFilter'
import SortFilter from '@/components/custom/filters/SortFilter'
import CategoryFilter from '@/components/custom/filters/CategoriesFilter'

export default function ProductsFilters() {
  return (
    <div className='space-y-4 md:space-y-0 md:flex md:space-x-4 items-center'>
      <TrendingFilter />
      <Separator className='md:hidden' />
      <DisplayFilter />
      <Separator className='md:hidden' />
      <SortFilter />
      <Separator className='md:hidden' />
      <div className='md:hidden'>
        <CategoryFilter />
      </div>
    </div>
  )
}
