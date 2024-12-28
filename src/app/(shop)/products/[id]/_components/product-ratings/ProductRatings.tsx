'use client'

import { TransitionStartFunction, useTransition } from 'react'
import { signIn } from 'next-auth/react'
import { User } from 'next-auth'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Product, Rating } from '@prisma/client'
import ProductRatingOverview, {
  ProductRatingOverviewSkeleton,
} from './product-rating-overview/ProductRatingOverview'
import ProductRatingList from './product-rating-list/ProductRatingList'
import { ProductRatingForm } from '../product-rating-form/ProductRatingForm'
import { Button } from '@/components/ui/button'

type Props = {
  product: Product
  ratings: Rating[]
  user?: User
  orderedProductIds: string[]
  productAlreadyRated: boolean
}

export default function ProductRatings({
  product,
  ratings,
  user,
  orderedProductIds,
  productAlreadyRated,
}: Props) {
  const [isPending, startTransition] = useTransition()

  const hasOrderedProduct = orderedProductIds.includes(product.id)

  const canRateProduct =
    user !== undefined && hasOrderedProduct && !productAlreadyRated

  return (
    <div>
      <h4 className='text-xl font-semibold mb-4'>Recenzije</h4>
      <div className={cn('space-y-10', isPending && 'animate-pulse')}>
        <ProductRatingOverview ratings={ratings} />

        {!productAlreadyRated && (
          <ProductRatingFormCard
            name={user?.name || ''}
            userId={user?.id || ''}
            productId={product.id}
            canRateProduct={canRateProduct}
            startTransition={startTransition}
          />
        )}

        {ratings.length ? <ProductRatingList ratings={ratings} /> : null}
      </div>
    </div>
  )
}

function ProductRatingFormCard({
  name,
  userId,
  productId,
  canRateProduct,
  startTransition,
}: {
  name: string
  userId: string
  productId: string
  canRateProduct: boolean
  startTransition: TransitionStartFunction
}) {
  return (
    <Card>
      <Accordion type='single' collapsible className='px-4'>
        <AccordionItem
          value={productId || 'create-product-rating'}
          className='border-b-0'
        >
          <AccordionTrigger>
            <div className='flex items-center gap-4'>
              <Star />
              <p className='font-semibold'>{'Oceni proizvod'}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            {canRateProduct ? (
              <ProductRatingForm
                name={name}
                productId={productId}
                startTransition={startTransition}
              />
            ) : (
              <div className='flex flex-col'>
                <p>
                  Ocenu možete ostaviti samo ukoliko ste ulogovani i kupili ste
                  ovaj proizvod.
                </p>

                {!userId && (
                  <Button onClick={() => signIn()} className='ml-auto'>
                    Prijava
                  </Button>
                )}
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export function ProductRatingsSkeleton() {
  return (
    <div>
      <h4 className='text-xl font-semibold mb-4'>Recenzije</h4>
      <div className='space-y-10'>
        <ProductRatingOverviewSkeleton />
        {/* <ProductRatingFormSkeleton />
        <ProductRatingListSkeleton /> */}
      </div>
    </div>
  )
}
