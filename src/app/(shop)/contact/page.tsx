import { Button } from '@/components/ui/button'
import { shopInfo } from '@/lib/consts'
import { Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='space-y-5'>
      <h2 className='text-2xl'>Kontakt</h2>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>
          Imate pitanje ili sugestiju? Pišite nam.
        </p>
        <p>Možete nas kontaktirati putem:</p>
        <div>
          <p className='font-semibold mb-2'>E-maila:</p>
          <a
            href={`mailto:${shopInfo.email}`}
            className='inline-flex items-center gap-2 underline'
          >
            <Mail size={16} /> {shopInfo.email}
          </a>
        </div>

        <div>
          <p className='font-semibold mb-2'>Telefona:</p>
          <a
            href={`tel:${shopInfo.phone}`}
            className='inline-flex items-center gap-2 underline'
          >
            <Phone size={16} />
            {shopInfo.phone}
          </a>
        </div>

        <div>
          <p className='font-semibold mb-2'>Društvenih mreža:</p>
          <ul className='space-y-2'>
            <li className='flex items-center space-x-2'>
              <Image
                src='/img/brand-icons/facebook.svg'
                alt='Facebook'
                width={16}
                height={16}
              />
              <a href={shopInfo.facebook}>Facebook</a>
            </li>
            <li className='flex items-center space-x-2'>
              <Image
                src='/img/brand-icons/instagram.svg'
                alt='Instagram'
                width={16}
                height={16}
              />
              <a href={shopInfo.instagram}>Instagram</a>
            </li>
            <li className='flex items-center space-x-2'>
              <Image
                src='/img/brand-icons/tiktok.svg'
                alt='TikTok'
                width={16}
                height={16}
              />
              <a href={shopInfo.tikTok}>TikTok</a>
            </li>
          </ul>
        </div>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Dodatne informacije</p>

        <div>
          <p className='font-semibold mb-2'>Kompanija:</p>
          <p>{shopInfo.description}</p>
        </div>

        <div>
          <p className='font-semibold mb-2'>Adresa:</p>
          <p>{shopInfo.address}</p>
        </div>

        <div>
          <p className='font-semibold mb-2'>PIB:</p>
          <p>{shopInfo.pib}</p>
        </div>
      </div>

      <Button>
        <Link href={'/'}>Početna strana</Link>
      </Button>
    </div>
  )
}
