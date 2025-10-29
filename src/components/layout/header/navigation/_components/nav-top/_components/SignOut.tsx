'use client'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/auth-client'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SignOut() {
  const router = useRouter()

  const handleSignOut = async () => {
    return await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/')
        },
      },
    })
  }

  return (
    <DropdownMenuItem onClick={handleSignOut}>
      <LogOut className='mr-2 h-4 w-4' /> Odjava
    </DropdownMenuItem>
  )
}
