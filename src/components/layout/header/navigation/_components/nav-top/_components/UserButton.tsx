import {
  ChartBarStacked,
  Truck,
  LogOut,
  Settings,
  BadgePercent,
  Gift,
  Images,
  Gem,
  Package,
  PackagePlus,
  ReceiptEuro,
  User as UserIcon,
  Star,
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
import { UserRoleType } from '@prisma/client'

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
  { href: '/admin/kuponi', text: 'Kuponi', icon: Gem },
  { href: '/admin/popusti', text: 'Popusti', icon: BadgePercent },
  { href: '/admin/postarine', text: 'Poštarine', icon: Package },
  {
    href: '/admin/poklon-pakovanja',
    text: 'Poklon pakovanja',
    icon: PackagePlus,
  },
  { href: '/admin/proizvodi', text: 'Proizvodi', icon: Gift },
  { href: '/admin/proizvodi/novi', text: 'Novi Proizvod', icon: Gift },
  { href: '/admin/porudzbine', text: 'Porudžbine', icon: ReceiptEuro },
  { href: '/admin/recenzije', text: 'Recenzije', icon: Star },
]

const userMenuOptions = [
  { href: '/profil/moji-podaci', text: 'Moji podaci', icon: Settings },
  { href: '/profil/porudzbine', text: 'Porudžbine', icon: ReceiptEuro },
  { href: '/profil/adresa-dostave', text: 'Adresa dostave', icon: Truck },
]

export default function UserButton({ user }: UserButtonProps) {
  const isAdmin = user.role === UserRoleType.admin
  const menuOptions = isAdmin ? adminMenuOptions : userMenuOptions

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'
          aria-label='Korisnik'
        >
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
        {isAdmin ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Lični meni</DropdownMenuLabel>
            <DropdownMenuGroup>
              {userMenuOptions.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href}>
                    <link.icon className='mr-2 h-4 w-4' />
                    <span>{link.text}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </>
        ) : null}
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
