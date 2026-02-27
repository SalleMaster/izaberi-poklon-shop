'use client'

import { useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { signinGoogle } from '@/lib/social-login'
import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import MagicLinkForm from './_components/MagicLinkForm'
import { Separator } from '@/components/ui/separator'
import { NotificationAlert } from '@/components/custom/NotificationAlert'

export default function SignInPage() {
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleSignIn = () => {
    startTransition(async () => {
      const { data, error } = await signinGoogle({ callbackUrl })
      if (error) {
        toast.warning(
          'Došlo je do greške prilikom prijave. Molimo pokušajte ponovo.',
        )
      }
    })
  }

  return (
    <div className='flex flex-col gap-5'>
      <Card className='w-full md:max-w-96 mx-auto'>
        <CardHeader>
          <CardTitle>Prijava ili registracija</CardTitle>
          <CardDescription>
            Nemate nalog? Kreiraćemo ga automatski.
          </CardDescription>
        </CardHeader>
        <CardContent className='grid grid-cols-1 gap-5'>
          <Button
            onClick={handleSignIn}
            variant='outline'
            className='w-full'
            disabled={isPending}
          >
            <Image
              src='/img/brand-icons/google.svg'
              alt='Google'
              width={16}
              height={16}
              className='mr-4'
            />
            Google
          </Button>
          <Separator />

          <MagicLinkForm callbackUrl={callbackUrl} />
        </CardContent>
      </Card>

      <NotificationAlert
        title=''
        description='Nema potrebe za klasičnom registracijom i čuvanjem šifara.
            Jednostavno se prijavite sa svojim Google nalogom ili unesite email
            i pratite dalje korake.'
        variant='default'
        className='w-full md:max-w-96 mx-auto'
      />
    </div>
  )
}

export function SignInPageFallback() {
  return (
    <div className='flex flex-col gap-5'>
      <Card className='w-full md:max-w-96 mx-auto'>
        <CardHeader>
          <CardTitle>Prijava ili registracija</CardTitle>
          <CardDescription>
            Nemate nalog? Kreiraćemo ga automatski.
          </CardDescription>
        </CardHeader>
        <CardContent className='grid grid-cols-1 gap-5'>
          <Button variant='outline' className='w-full' disabled>
            <Image
              src='/img/brand-icons/google.svg'
              alt='Google'
              width={16}
              height={16}
              className='mr-4'
            />
            Google
          </Button>

          <Separator />

          <MagicLinkForm callbackUrl={''} />
        </CardContent>
      </Card>

      <NotificationAlert
        title=''
        description='Nema potrebe za klasičnom registracijom i čuvanjem šifara.
            Jednostavno se prijavite sa svojim Google nalogom ili unesite email
            i pratite dalje korake.'
        variant='default'
        className='w-full md:max-w-96 mx-auto'
      />
    </div>
  )
}
