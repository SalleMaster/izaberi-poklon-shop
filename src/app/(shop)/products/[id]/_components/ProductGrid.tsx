import { use } from 'react'
import { Session } from 'next-auth'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { GetProductReturnType } from '@/data/services/products'
import ProductCarousel, {
  ProductCarouselSkeleton,
} from './product-details-carousel/ProductCarousel'
import ProductDetails, {
  ProductDetailsSkeleton,
} from './product-details/ProductDetails'
import { GetProductRatingsReturnType } from '@/data/services/ratings'
import ProductRatingOverview from './product-ratings/product-rating-overview/ProductRatingOverview'
import ProductRatingList from './product-ratings/product-rating-list/ProductRatingList'

type Props = {
  productPromise: GetProductReturnType
  productRatingsPromise: GetProductRatingsReturnType
  sessionPromise: Promise<Session | null>
}

export default function ProductGrid({
  productPromise,
  productRatingsPromise,
  sessionPromise,
}: Props) {
  const product = use(productPromise)
  const ratings = use(productRatingsPromise)
  const session = use(sessionPromise)
  const user = session?.user

  console.log(ratings)

  return (
    <>
      {product ? (
        <div className='space-y-10'>
          <div className='relative sm:grid sm:grid-cols-2 sm:gap-4 md:gap-10'>
            <ProductCarousel product={product} />
            <ProductDetails product={product} user={user} />
          </div>
          <div className='space-y-10'>
            {ratings.length > 0 && (
              <>
                <ProductRatingOverview ratings={ratings} />
                <p className='text-muted-foreground'>
                  Recenzije proizvoda koje slede mogu da napišu isključivo
                  korisnici koji su kupili ovaj proizvod u našoj internet
                  prodavnici. Zahvaljujući utisku i oceni korisnika koji su
                  kupili ovaj proizvod, svi posetioci našeg sajta sada imaju
                  realan uvid u prednosti i mane proizvoda zasnovan na
                  korisničkom iskustvu. Nadamo se da će Vam ova opcija biti od
                  koristi pri odabiru pravog proizvoda za Vas.
                </p>
                <ProductRatingList ratings={ratings} />
              </>
            )}
          </div>
        </div>
      ) : (
        <NotificationAlert
          title='Obaveštenje'
          description='Ovaj proizvod nije dostupan.'
          variant='info'
          className='mb-auto'
        />
      )}
    </>
  )
}

export function ProductGridSkeleton() {
  return (
    <div className='sm:grid sm:grid-cols-2 sm:gap-4 md:gap-10'>
      <ProductCarouselSkeleton />
      <ProductDetailsSkeleton />
      <div className='h-[500px]'></div>
    </div>
  )
}
