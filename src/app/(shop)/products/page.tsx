import { NotificationAlert } from '@/components/custom/NotificationAlert'
import ProductCard from '@/components/custom/ProductCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import prisma from '@/lib/db'
import Link from 'next/link'
import ProductsSidebar from './_components/ProductsSidebar'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

type OrderByType = { price: 'asc' | 'desc' } | { createdAt: 'desc' }

export default async function ProductsPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  const { kategorija, sortiranje } = searchParams

  const sortingOptions = [
    {
      label: 'Najnovijim',
      url: `/pokloni?${new URLSearchParams({ ...searchParams, sortiranje: 'najnoviji' }).toString()}`,
    },
    {
      label: 'Najnižoj ceni',
      url: `/pokloni?${new URLSearchParams({ ...searchParams, sortiranje: 'najniza-cena' }).toString()}`,
    },
    {
      label: 'Najvišoj ceni',
      url: `/pokloni?${new URLSearchParams({ ...searchParams, sortiranje: 'najvisa-cena' }).toString()}`,
    },
  ]

  let ordering: { value: OrderByType; label: string }

  switch (sortiranje) {
    case 'najvisa-cena':
      ordering = { value: { price: 'desc' }, label: 'Najvišoj ceni' }
      break
    case 'najniza-cena':
      ordering = { value: { price: 'asc' }, label: 'Najnižoj ceni' }
      break
    case 'najnoviji':
      ordering = { value: { createdAt: 'desc' }, label: 'Najnovijim' }
      break
    default:
      ordering = { value: { createdAt: 'desc' }, label: 'Najnovijim' }
  }

  const products = await prisma.product.findMany({
    where: {
      ...(kategorija && {
        categories: {
          some: {
            slug: Array.isArray(kategorija) ? { in: kategorija } : kategorija,
          },
        },
      }),
    },
    orderBy: ordering.value,
    include: {
      coverImage: true,
      discount: true,
      priceTable: {
        orderBy: { price: 'asc' },
      },
    },
  })

  return (
    <div className='space-y-5'>
      <div className='flex justify-between'>
        <h2 className='text-xl font-bold'>Pokloni</h2>

        <div>
          <span className='mr-2'>Sortiranje prema:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary'>{ordering.label}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sortingOptions.map((option) => (
                <DropdownMenuItem key={option.label} asChild>
                  <Link href={option.url}>{option.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Separator />

      <div className='md:grid gap-5 grid-cols-products'>
        <ProductsSidebar searchParams={searchParams} />

        {products.length > 0 ? (
          <ScrollArea className='max-h-[75vh] w-full'>
            <div className='grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema proizvoda'
            variant='info'
          />
        )}
      </div>

      {/* <div className='grid gap-5 grid-cols-12'>
        <ProductsSidebar searchParams={searchParams} />

        {products.length > 0 ? (
          <ScrollArea className='max-h-[75vh] col-span-12 md:col-span-9 w-full'>
            <div className='grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <NotificationAlert
            title='Obaveštenje'
            description='Trenutno nema proizvoda'
            variant='info'
          />
        )}
      </div> */}
    </div>
  )
}
