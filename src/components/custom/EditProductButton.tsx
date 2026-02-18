'use client'

import { use } from 'react'
import { useAuth } from '@/lib/auth/components/AuthProvider'
import { UserRoleType } from '@/generated/prisma/enums'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function EditProductButton({
  productId,
}: {
  productId: string
}) {
  const { userDetails: userDetailsPromise } = useAuth()
  const userDetails = use(userDetailsPromise)

  return (
    userDetails &&
    userDetails.role === UserRoleType.admin && (
      <Button className='ml-auto mt-auto' asChild>
        <Link href={`/admin/proizvodi/${productId}/edit`}>Edit</Link>
      </Button>
    )
  )
}
