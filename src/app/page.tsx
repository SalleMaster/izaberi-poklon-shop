import { Suspense } from 'react'
import { getBanners } from '@/data/services/banners'
import {
  getDiscountedProducts,
  getTrendingProducts,
} from '@/data/services/products'
import { getCategories } from '@/data/services/category'
import { BannersSkeleton } from '@/components/layout/banners/BannersCarousel'
import Banners from '@/components/layout/banners/Banners'
import Benefits from '@/components/layout/benefits/Benefits'
import ProductsCarousel, {
  ProductsCarouselSkeleton,
} from '@/components/layout/products-carousel/ProductsCarousel'
import Categories, {
  CategoriesSkeleton,
} from '@/components/layout/categories/Categories'

export default function Landing() {
  // const bannersPromise = getBanners({ active: true })
  // const discountedProductsPromise = getDiscountedProducts({ take: 10 })
  // const trendingProductsPromise = getTrendingProducts({ take: 10 })
  // const categoriesPromise = getCategories({ active: true })

  return (
    <div className='flex flex-col gap-20'>
      <div className='flex flex-col gap-10'>
        <Banners />
        <Benefits />
      </div>

      <ProductsCarousel productType='trending' title='Aktuelno' />
      <ProductsCarousel productType='discounted' title='Na popustu' />

      <Categories />
    </div>
  )
}
