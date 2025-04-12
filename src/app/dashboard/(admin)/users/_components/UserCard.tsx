import { User } from '@prisma/client'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { format } from 'date-fns'
import { srLatn } from 'date-fns/locale'
import { Clock4, SquareArrowOutUpRight, UserIcon } from 'lucide-react'
import { TransitionStartFunction } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { UserRoleBadge } from './UserRoleBadge'
import { UserForm } from './UserForm'
import { Label } from '@/components/ui/label'

type UserCardProps = {
  user: User
  isSingleCard?: boolean
  startTransition: TransitionStartFunction
}

export function UserCard({
  user,
  isSingleCard = false,
  startTransition,
}: UserCardProps) {
  const formattedCreatedAt = format(user.createdAt, 'PPpp', {
    locale: srLatn,
  })

  return (
    <Card className='py-0'>
      <Accordion
        type='single'
        collapsible
        defaultValue={isSingleCard ? user.id : undefined}
        className='px-4'
      >
        <AccordionItem value={user.id} className='border-b-0'>
          <AccordionTrigger>
            <div className='w-full grid gap-3 sm:grid-cols-4'>
              <div className='flex items-center gap-4'>
                <UserIcon />
                <p className='font-semibold'>{user.name}</p>
              </div>
              <div className='flex items-center gap-4'>
                <Clock4 />
                <p className='font-semibold'>{formattedCreatedAt}</p>
              </div>
              <div className='flex mr-6'>
                <UserRoleBadge role={user.role} />
                {!isSingleCard && (
                  <Button variant='outline' size='sm' asChild>
                    <Link href={`/admin/korisnici/${user.id}`}>
                      <SquareArrowOutUpRight className='w-4 h-4' />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className='space-y-4'>
            <div className='space-y-2.5 border rounded-xl p-4'>
              <div className='space-y-2'>
                <Label>ID</Label>
                <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
                  {user.id}
                </p>
              </div>
              <div className='space-y-2'>
                <Label>Ime</Label>
                <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
                  {user.name}
                </p>
              </div>
              <div className='space-y-2'>
                <Label>Email</Label>
                <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
                  {user.email}
                </p>
              </div>
              <div className='space-y-2'>
                <Label>Telefon</Label>
                <p className='dark:bg-input/30 border-input flex items-center h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-muted-foreground shadow-xs md:text-sm'>
                  {user.phone}
                </p>
              </div>
            </div>
            <div className='border rounded-xl p-4'>
              <UserForm
                role={user.role}
                id={user.id}
                startTransition={startTransition}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}

export function UserCardSkeleton() {
  return (
    <Card className='p-4'>
      <div className='w-full grid gap-3 sm:grid-cols-4 pr-4'>
        <div className='flex items-center gap-4'>
          <UserIcon />
          <Skeleton className='h-4 w-3/4' />
        </div>
        <div className='flex items-center gap-4'>
          <Clock4 />
          <Skeleton className='h-4 w-3/4' />
        </div>
        <div className='flex items-center gap-4'>
          <Skeleton className='h-4 w-3/4' />
        </div>
      </div>
    </Card>
  )
}

export function UserCardOpenSkeleton() {
  return (
    <Card className='p-4 space-y-4'>
      <div className='w-full grid gap-3 sm:grid-cols-4 pr-4'>
        <div className='flex items-center gap-4'>
          <UserIcon />
          <Skeleton className='h-4 w-3/4' />
        </div>
        <div className='flex items-center gap-4'>
          <Clock4 />
          <Skeleton className='h-4 w-3/4' />
        </div>
        <div className='flex items-center gap-4'>
          <Skeleton className='h-4 w-3/4' />
        </div>
      </div>
      <div className='space-y-4'>
        <div className='border rounded-xl p-4 space-y-2.5'>
          <Skeleton className='w-full h-60' />
        </div>
        <div className='border rounded-xl p-4 space-y-2.5'>
          <Skeleton className='w-full h-60' />
        </div>
      </div>
    </Card>
  )
}
