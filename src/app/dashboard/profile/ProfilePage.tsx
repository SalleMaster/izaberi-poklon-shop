'use client'

import { use, useTransition } from 'react'
import { Card } from '@/components/ui/card'
import { NotificationAlert } from '@/components/custom/NotificationAlert'
import { Skeleton } from '@/components/ui/skeleton'
import { GetUserProfileReturnType } from '@/data/services/user'
import { ProfileForm } from './_components/ProfileForm'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'

type Props = {
  userProfilePromise: GetUserProfileReturnType
}

export default function ProfilePage({ userProfilePromise }: Props) {
  const userProfile = use(userProfilePromise)
  const [isPending, startTransition] = useTransition()

  return (
    <div className={isPending ? 'animate-pulse' : ''}>
      {userProfile ? (
        <Card className='p-4'>
          <ProfileForm
            name={userProfile.name || ''}
            phone={userProfile.phone || ''}
            email={userProfile.email}
            startTransition={startTransition}
          />
        </Card>
      ) : (
        <NotificationAlert
          title='Obaveštenje'
          description='Nismo pronasli Vaše podatke.'
          variant='info'
        />
      )}
    </div>
  )
}

export function ProfilePageSkeleton() {
  return (
    <Card className='space-y-2.5 p-4'>
      <div>
        <p className='mb-3'>Ime i prezime</p>
        <Skeleton className='h-8 w-full' />
      </div>
      <div>
        <p className='mb-3'>Broj telefona</p>
        <Skeleton className='h-8 w-full' />
      </div>
      <div>
        <p className='mb-3'>Email</p>
        <Skeleton className='h-8 w-full' />
      </div>
      <div className='flex pt-6'>
        <Button type='button' disabled className='ml-auto'>
          <Save className='mr-2 h-4 w-4' />
          Sačuvaj
        </Button>
      </div>
    </Card>
  )
}
