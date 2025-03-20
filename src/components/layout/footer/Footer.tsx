import { getSpecialCategories } from '@/data/services/category'
import { Suspense } from 'react'
import FooterLinks from './_components/FooterLinks'
import SpecialCategories, {
  SpecialCategoriesSkeleton,
} from './_components/SpecialCategories'
import { onlinePurchaseContract, orderQuitForm, shopInfo } from '@/lib/consts'
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
  { href: '/nacin-isporuke', label: 'Način isporuke' },
  { href: '/politika-privatnosti', label: 'Politika privatnosti' },
  { href: orderQuitForm.url, target: '_blank', label: 'Odustanak obrazac' },
  { href: '/reklamacije', label: 'Reklamacije' },
  {
    href: '/uslovi-koriscenja',
    label: 'Uslovi korišćenja',
  },
  {
    href: onlinePurchaseContract.url,
    target: '_blank',
    label: 'Ugovor o kupovini na daljinu',
  },
  {
    href: '/povracaj-proizvoda',
    label: 'Povraćaj proizvoda',
  },
]

const socialLinks = [
  { href: shopInfo.facebook, label: 'Facebook' },
  { href: shopInfo.instagram, label: 'Instagram' },
  { href: shopInfo.tikTok, label: 'TikTok' },
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
          <FooterLinks title='Društvene mreže' links={socialLinks} />
          <FooterLinks title='Profil' links={profileLinks} />
          <Suspense fallback={<SpecialCategoriesSkeleton />}>
            <SpecialCategories categoriesPromise={specialCategoriesPromise} />
          </Suspense>
        </div>

        <div className='flex flex-wrap justify-center items-center gap-4'>
          <Separator className='w-full h-px bg-muted-foreground' />
          <div className='relative w-[70px] h-[50px]'>
            <Image
              src='/img/payment-cards/logo-payments-visa.svg'
              alt='Logo'
              fill={true}
            />
          </div>
          <div className='relative w-[70px] h-[50px]'>
            <Image
              src='/img/payment-cards/logo-payments-maestro-1.svg'
              alt='Logo'
              fill={true}
            />
          </div>
          <div className='relative w-[70px] h-[50px]'>
            <Image
              src='/img/payment-cards/logo-payments-master-1.svg'
              alt='Logo'
              fill={true}
            />
          </div>
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
