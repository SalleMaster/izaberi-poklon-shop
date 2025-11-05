import Banners from '@/components/layout/banners/Banners'
import Benefits from '@/components/layout/benefits/Benefits'
import ProductsCarousel from '@/components/layout/products-carousel/ProductsCarousel'
import Categories from '@/components/layout/categories/Categories'

export default function Landing() {
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
