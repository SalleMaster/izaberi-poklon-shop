'use client'

import { ColumnDef } from '@tanstack/react-table'
import type { CartItem, Product, Media } from '@prisma/client'
import ProductCell from './ProductCell'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { QuantityCell } from './QuantityCell'

export type CartItemWithRelations = CartItem & {
  product: Product & {
    coverImage: Media | null
  }
}

export const columns: ColumnDef<CartItemWithRelations>[] = [
  {
    accessorKey: 'product',
    header: 'Poklon',
    cell: ({ row }) => {
      return (
        <ProductCell
          productName={row.original.product.name}
          productCoverUrl={row.original.product.coverImage?.url || ''}
        />
      )
    },
  },
  {
    accessorKey: 'product.price',
    header: 'Cena',
  },
  {
    accessorKey: 'quantity',
    header: 'Kolicina',
    cell: ({ row, table }) => {
      return table.options.meta?.updateCartItemHandler ? (
        <QuantityCell
          id={row.original.id}
          quantity={row.original.quantity}
          updateCartItemHandler={table.options.meta?.updateCartItemHandler}
        />
      ) : null
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const itemId = row.original.id

      return (
        <div>
          <Button
            variant='ghost'
            size='icon'
            className='rounded-full'
            aria-label='Ukloni proizvod iz korpe'
            onClick={() => {
              table.options.meta?.removeCartItemHandler(itemId)
            }}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      )
    },
  },
]
