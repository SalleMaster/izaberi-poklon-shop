import { Suspense } from 'react'
// import Banners from './_components/banners/Banners'
import { getActiveBanners } from '@/data/services/banners'
// import Benefits from './_components/benefits/Benefits'
import {
  getDiscountedProducts,
  getTrendingProducts,
} from '@/data/services/products'
// import ProductsCarousel, {
//   ProductsCarouselSkeleton,
// } from './_components/products-carousel/ProductsCarousel'
import { getActiveCategories } from '@/data/services/category'
import { BannersSkeleton } from '@/components/layout/banners/BannersCarousel'
import Banners from '@/components/layout/banners/Banners'
import Benefits from '@/components/layout/benefits/Benefits'
import ProductsCarousel, {
  ProductsCarouselSkeleton,
} from '@/components/layout/products-carousel/ProductsCarousel'
import Categories, {
  CategoriesSkeleton,
} from '@/components/layout/categories/Categories'
// import Categories, {
//   CategoriesSkeleton,
// } from './_components/categories/Categories'
// import { BannersSkeleton } from './_components/banners/BannersCarousel'

export default function Landing() {
  const bannersPromise = getActiveBanners()
  const discountedProductsPromise = getDiscountedProducts({ take: 10 })
  const trendingProductsPromise = getTrendingProducts({ take: 10 })
  const categoriesPromise = getActiveCategories()

  return (
    <div className='flex flex-col gap-20'>
      <div className='flex flex-col gap-10'>
        <Suspense fallback={<BannersSkeleton />}>
          <Banners bannersPromise={bannersPromise} />
        </Suspense>
        <Benefits />
      </div>

      <Suspense fallback={<ProductsCarouselSkeleton title='Aktuelno' />}>
        <ProductsCarousel
          productsPromise={trendingProductsPromise}
          title='Aktuelno'
        />
      </Suspense>

      <Suspense fallback={<ProductsCarouselSkeleton title='Na popustu' />}>
        <ProductsCarousel
          productsPromise={discountedProductsPromise}
          title='Na popustu'
        />
      </Suspense>

      <Suspense fallback={<CategoriesSkeleton />}>
        <Categories categoriesPromise={categoriesPromise} />
      </Suspense>
    </div>
  )
}
