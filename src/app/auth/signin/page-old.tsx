import { redirect } from 'next/navigation'
import getSession from '@/lib/getSession'
import { signIn, providerMap } from '@/auth'
import { AuthError } from 'next-auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { NotificationAlert } from '@/components/custom/NotificationAlert'

const SIGNIN_ERROR_URL = '/auth/error'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function SignInPage(props: {
  searchParams: SearchParams
}) {
  const searchParams = await props.searchParams
  let callbackUrl = searchParams?.callbackUrl
  const error = searchParams?.error
  if (Array.isArray(callbackUrl)) {
    callbackUrl = callbackUrl[0]
  }

  const session = await getSession()
  const user = session?.user

  if (user) {
    redirect(callbackUrl ?? '/')
  }

  return (
    <div className='flex flex-col gap-5'>
      <Card className='w-full md:max-w-96 mx-auto'>
        <CardHeader>
          <CardTitle>Vaš nalog</CardTitle>
          <CardDescription>Odaberite opciju za prijavu</CardDescription>
        </CardHeader>
        <CardContent className='grid grid-cols-1 gap-5'>
          {Object.values(providerMap).map((provider) => (
            <form
              key={provider.id}
              // className={provider.id === 'resend' ? 'col-span-2' : ''}
              action={async (formData) => {
                'use server'

                try {
                  await signIn(provider.id, formData, {
                    redirectTo: callbackUrl ?? '/',
                  })
                } catch (error) {
                  // Signin can fail for a number of reasons, such as the user
                  // not existing, or the user not having the correct role.
                  // In some cases, you may want to redirect to a custom error
                  if (error instanceof AuthError) {
                    return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                  }

                  // Otherwise if a redirects happens Next.js can handle it
                  // so you can just re-thrown the error and let Next.js handle it.
                  // Docs:
                  // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                  throw error
                }
              }}
            >
              {provider.id === 'resend' ? (
                <>
                  <Separator className='mb-5' />
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Prijava putem email-a:</Label>
                    <Input type='email' name='email' placeholder='Email' />
                    <Button type='submit' variant='outline' className='w-full'>
                      <Mail className='w-5 h-5 mr-4' /> Prijavite se
                    </Button>
                  </div>
                </>
              ) : (
                <Button type='submit' variant='outline' className='w-full'>
                  {provider.id === 'google' && (
                    <Image
                      src='/img/brand-icons/google.svg'
                      alt='Google'
                      width={16}
                      height={16}
                      className='mr-4'
                    />
                  )}
                  {provider.id === 'apple' && (
                    <Image
                      src='/img/brand-icons/apple.svg'
                      alt='Apple'
                      width={16}
                      height={16}
                      className='mr-4'
                    />
                  )}
                  {provider.name}
                </Button>
              )}
            </form>
          ))}
        </CardContent>
        <CardFooter>
          <p className='text-muted-foreground text-sm'>
            Nema potrebe za klasičnom registracijom i čuvanjem šifara.
            Jednostavno se prijavite sa svojim Google nalogom ili unesite email
            i pratite dalje korake.
          </p>
        </CardFooter>
      </Card>

      {error && (
        <NotificationAlert
          title='Greška prilikom prijave'
          description='Došlo je do greške prilikom prijave. Molimo pokušajte ponovo ili koristite drugu opciju prijave.'
          variant='destructive'
          className='w-full md:max-w-96 mx-auto'
        />
      )}
    </div>
  )
}
