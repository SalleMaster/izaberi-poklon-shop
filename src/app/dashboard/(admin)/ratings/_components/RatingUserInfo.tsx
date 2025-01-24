import { User } from '@prisma/client'

type RatingUserInfoProps = {
  user: User
}

export function RatingUserInfo({ user }: RatingUserInfoProps) {
  return (
    <div className='w-full space-y-2'>
      <div className='space-y-1'>
        <p className='text-muted-foreground'>Ime i prezime:</p>
        <p className='bg-secondary px-2 py-1'>
          <span>{user.name}</span>
        </p>
      </div>
      <div className='space-y-1'>
        <p className='text-muted-foreground'>Email:</p>
        <a
          className='block bg-secondary px-2 py-1'
          href={`mailto:${user.email}`}
        >
          {user.email}
        </a>
      </div>
      {user.phone ? (
        <div className='space-y-1'>
          <p className='text-muted-foreground'>Telefon:</p>
          <a
            className='block bg-secondary px-2 py-1'
            href={`tel:${user.phone}`}
          >
            {user.phone}
          </a>
        </div>
      ) : null}
    </div>
  )
}
