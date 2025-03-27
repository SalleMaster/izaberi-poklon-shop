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

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Mapa</p>

        <div className='w-full h-0 pb-[56.25%] relative'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2854.0599002442755!2d20.555765992870054!3d44.329273633877776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a67d758bb4f85%3A0x38f8432f21c04e38!2sRed%20Dot!5e0!3m2!1sen!2srs!4v1743084849372!5m2!1sen!2srs'
            className='absolute top-0 left-0 w-full h-full border-0 rounded-md'
            title='Red Dot Location on Google Maps'
            loading='lazy'
            allowFullScreen
            referrerPolicy='no-referrer-when-downgrade'
            aria-label='Location map for Red Dot'
          ></iframe>
        </div>
      </div>

      <Button>
        <Link href={'/'}>Početna strana</Link>
      </Button>
    </div>
  )
}
