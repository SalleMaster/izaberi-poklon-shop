import prisma from '@/lib/db'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { fallbackImageURL } from '@/lib/consts'

export default async function NavbarMenu() {
  const activeCategories = await prisma.category.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
    include: { image: true },
  })

  return (
    <div className='bg-primary'>
      <div className='container mx-auto flex'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='secondary' className='rounded-none'>
              Pokloni
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Kategorije</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {activeCategories.map((category) => (
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
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className='text-end'>
              <Link href={'/pokloni'}>Svi pokloni</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className='rounded-none'>Akcija</Button>
        <Button className='rounded-none'>Korporativni pokloni</Button>
        <Button className='rounded-none'>O nama</Button>
        <Button className='rounded-none ml-auto' asChild>
          <a href='tel:+3816212312123'>Call centar: 062 123 12 123</a>
        </Button>
      </div>
    </div>
  )
}
