import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import prisma from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import { fallbackImageURL } from '@/lib/consts'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

type ProductsSidebarProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ProductsSidebar({
  searchParams,
}: ProductsSidebarProps) {
  const activeCategories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
    include: { image: true },
  })

  const { kategorija } = searchParams

  return (
    <Card className='hidden max-h-[75vh] md:block mb-auto sticky top-[120px]'>
      <CardHeader>
        <CardDescription>Kategorije</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {activeCategories.map((category) => (
            <Link
              key={category.id}
              className={cn(
                'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                kategorija?.includes(category.slug) &&
                  'bg-accent text-accent-foreground'
              )}
              href={`/pokloni?${new URLSearchParams({ ...searchParams, kategorija: category.slug }).toString()}`}
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
          ))}
        </ul>

        <Separator className='my-4' />

        <Link
          href={'/pokloni'}
          className={cn(
            'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            !kategorija && 'bg-accent text-accent-foreground'
          )}
        >
          Svi pokloni
        </Link>
      </CardContent>
    </Card>
  )
}
