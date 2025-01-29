import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='space-y-5 text-center'>
      <h2 className='text-2xl'>UPS, GREŠKA 404</h2>
      <p className='text-xl font-semibold'>
        Izvinjavamo se, stranica nije pronađena.
      </p>
      <p>Link koji ste pratili je neispravan ili je stranica uklonjena.</p>
      <Button>
        <Link href={'/'}>Početna strana</Link>
      </Button>
    </div>
  )
}
