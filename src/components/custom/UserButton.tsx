import {
  ChartBarStacked,
  Truck,
  LogOut,
  Settings,
  BadgePercent,
  Gift,
  Images,
  User as UserIcon,
} from 'lucide-react'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type UserButtonProps = {
  user: User
}

const adminMenuOptions = [
  { href: '/admin/kategorije', text: 'Kategorije', icon: ChartBarStacked },
  {
    href: '/admin/kurirske-sluzbe',
    text: 'Kurirske službe',
    icon: Truck,
  },
  { href: '/admin/baneri', text: 'Baneri', icon: Images },
  { href: '/admin/popusti', text: 'Popusti', icon: BadgePercent },
  { href: '/admin/proizvodi', text: 'Proizvodi', icon: Gift },
  { href: '/admin/proizvodi/novi', text: 'Novi Proizvod', icon: Gift },
  { href: '/dashboard/profile', text: 'Profile', icon: Settings },
]

const userMenuOptions = [
  { href: '/dashboard/profile', text: 'Profile', icon: Settings },
]

export default function UserButton({ user }: UserButtonProps) {
  const menuOptions = user.role === 'admin' ? adminMenuOptions : userMenuOptions

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='rounded-full'>
          <UserIcon className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>{user.name || 'User'}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuOptions.map((link) => (
            <DropdownMenuItem key={link.href} asChild>
              <Link href={link.href}>
                <link.icon className='mr-2 h-4 w-4' />
                <span>{link.text}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className='flex w-full items-center'
          >
            <LogOut className='mr-2 h-4 w-4' /> Odjava
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
