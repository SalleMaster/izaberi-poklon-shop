import { getSpecialCategories } from '@/data/services/category'
import { Suspense } from 'react'
import FooterLinks from './_components/FooterLinks'
import SpecialCategories, {
  SpecialCategoriesSkeleton,
} from './_components/SpecialCategories'
import { shopInfo } from '@/lib/consts'
import { Separator } from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'

const mainLinks = [
  { href: '/ko-smo-mi', label: 'Ko smo mi' },
  { href: '/kako-smo-nastali', label: 'Kako smo nastali' },
  { href: '/veleprodaja', label: 'Veleprodaja' },
  { href: '/cesta-pitanja', label: 'Česta pitanja' },
  { href: '/kontakt', label: 'Kontakt' },
]

const usefulLinks = [
  { href: '/kako-naruciti', label: 'Kako naručiti' },
  { href: '/uslovi-koriscenja', label: 'Uslovi korišćenja' },
  { href: '/odustanak-i-povrati', label: 'Odustanak i Povrati' },
  { href: '/reklamacije', label: 'Reklamacije' },
  {
    href: '/zastita-podataka-p-licnosti',
    label: 'Zaštita podataka o ličnosti',
  },
]

const socialLinks = [
  { href: '/facebook', label: 'Facebook' },
  { href: '/instagram', label: 'Instagram' },
  { href: '/x', label: 'X' },
]

const profileLinks = [
  { href: '/profil/moji-podaci', label: 'Moji podaci' },
  { href: '/profil/porudzbine', label: 'Porudžbine' },
  { href: '/profil/adresa-dostave', label: 'Adresa dostave' },
]

export default function Footer() {
  const specialCategoriesPromise = getSpecialCategories()

  const year = new Date().getFullYear()

  return (
    <footer className='bg-primary text-white px-4 mt-auto'>
      <div className='container mx-auto py-8 space-y-10'>
        <div className='space-y-6 md:space-y-0 md:flex justify-between'>
          <FooterLinks title='O nama' links={mainLinks} />
          <FooterLinks title='Korisne informacije' links={usefulLinks} />
          <FooterLinks title='Socijalne mreže' links={socialLinks} />
          <FooterLinks title='Profil' links={profileLinks} />
          <Suspense fallback={<SpecialCategoriesSkeleton />}>
            <SpecialCategories categoriesPromise={specialCategoriesPromise} />
          </Suspense>
        </div>
        <div className='flex flex-wrap justify-center items-center gap-4'>
          <Separator className='w-full h-px bg-muted-foreground' />
          <Image
            src='/img/payment-cards/logo-payments-amex-1.svg'
            alt='Logo'
            width={70}
            height={50}
          />
          <Image
            src='/img/payment-cards/logo-payments-dinacard.svg'
            alt='Logo'
            width={70}
            height={50}
          />
          <Image
            src='/img/payment-cards/logo-payments-diners-1.svg'
            alt='Logo'
            width={70}
            height={50}
          />
          <Image
            src='/img/payment-cards/logo-payments-discover-1.svg'
            alt='Logo'
            width={70}
            height={50}
          />
          <Image
            src='/img/payment-cards/logo-payments-maestro-1.svg'
            alt='Logo'
            width={70}
            height={50}
          />
          <Image
            src='/img/payment-cards/logo-payments-master-1.svg'
            alt='Logo'
            width={70}
            height={50}
          />
          <Image
            src='/img/payment-cards/logo-payments-visa.svg'
            alt='Logo'
            width={70}
            height={50}
          />
          <Image
            src='/img/payment-cards/ips-qr.png'
            alt='Logo'
            width={70}
            height={50}
          />
          <Separator className='w-full h-px bg-muted-foreground' />
        </div>
        <div className='text-center space-y-2 text-sm'>
          <p>
            &copy; {year} - {shopInfo.name} - Sva prava zadržana
          </p>
          <p>{shopInfo.description}</p>
          <p>
            {shopInfo.address} - PIB: {shopInfo.pib} - TEL:{' '}
            <a href={`tel:${shopInfo.phone}`}>{shopInfo.phone}</a>
          </p>
          <p>
            Sve fotografije na ovom sajtu su autorske tj pripadaju Red Dot-u,
            nije dozvoljena ponovna upotreba istih bez pismene saglasnosti
          </p>
        </div>
      </div>
    </footer>
  )
}
