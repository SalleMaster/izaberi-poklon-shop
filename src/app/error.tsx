'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className='space-y-5 text-center'>
      <h2 className='text-2xl'>UPS, DOŠLO JE DO NEOČEKIVANE GREŠKE</h2>
      <p className='text-xl font-semibold'>Izvinjavamo se na neprijatnosti.</p>
      <p>
        Molimo pokušajte ponovo ili nas{' '}
        <Link href={'/kontakt'} className='underline'>
          kontaktirajte
        </Link>{' '}
        ukoliko opet dođe do greške.
      </p>
      <p>Pokušaćemo da rešimo problem u što kraćem mogućem roku.</p>
      <div>
        <Button onClick={() => reset()} variant='secondary'>
          Pokušaj ponovo
        </Button>
      </div>

      <Button>
        <Link href={'/'}>Početna strana</Link>
      </Button>
    </div>
  )
}
