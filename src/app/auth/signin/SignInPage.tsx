'use client'

import { signinGoogle } from '@/lib/social-login'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import MagicLinkForm from './_components/MagicLinkForm'
import { Separator } from '@/components/ui/separator'

export default function SignInPage() {
  return (
    <div className='flex flex-col gap-5'>
      <Card className='w-full md:max-w-96 mx-auto'>
        <CardHeader>
          <CardTitle>Vaš nalog</CardTitle>
          <CardDescription>Odaberite opciju za prijavu</CardDescription>
        </CardHeader>
        <CardContent className='grid grid-cols-1 gap-5'>
          <Button onClick={signinGoogle} variant='outline' className='w-full'>
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

          <MagicLinkForm callbackUrl='/' />
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground text-sm'>
            Nema potrebe za klasičnom registracijom i čuvanjem šifara.
            Jednostavno se prijavite sa svojim Google nalogom ili unesite email
            i pratite dalje korake.
          </p>
        </CardFooter>
      </Card>

      {/* {error && (
        <NotificationAlert
          title='Greška prilikom prijave'
          description='Došlo je do greške prilikom prijave. Molimo pokušajte ponovo ili koristite drugu opciju prijave.'
          variant='destructive'
          className='w-full md:max-w-96 mx-auto'
        />
      )} */}
    </div>
  )
}
