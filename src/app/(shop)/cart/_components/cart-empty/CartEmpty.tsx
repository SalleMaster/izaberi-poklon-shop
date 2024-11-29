import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CartEmpty() {
  return (
    <div className='space-y-6 text-center'>
      <ShoppingCart className='w-40 h-40 text-muted-foreground mx-auto' />
      <p>Vaša korpa je prazna</p>
      <Button variant='outline' asChild>
        <Link href={'/'}>Vratite se na početnu stranicu</Link>
      </Button>
    </div>
  )
}
