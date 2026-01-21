import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { shopInfo } from '@/lib/consts'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='space-y-5 snap-start'>
      <h2 className='text-2xl font-semibold'>O nama</h2>

      <Separator />

      <div className='space-y-3 mb-10'>
        <p className='text-xl font-semibold'>Ko smo mi</p>
        <p>
          Mi smo "Reci Seci Pokloni" - vaša destinacija za personalizovane
          poklone, korporativna priznanja i nezaboravne uspomene.
        </p>
        <p>
          Možda nas znate kao "Reci Seci" sa Instagrama ili kao "Carstvo
          Trofeja" kada je reč o sportskim i poslovnim priznanjima - svi smo mi,
          različiti brendovi, jedna posvećena misija: pretvoriti vaše ideje u
          savršene poklone koji ostavljaju trajan utisak.
        </p>
        <p>
          Od 2019. godine stvaramo personalizovane poklone, korporativna
          priznanja, turističke suvenire i promo materijale koji govore vašim
          jezikom. Bilo da tražite jedinstveni poklon magnet, sportski trofej
          ili kompletan reklamni materijal za vašu kompaniju - mi smo tu da vaše
          želje pretvorimo u stvarnost.
        </p>
        <p>
          Ono što nas izdvaja? "Maksimalna personalizacija u svakom segmentu."
          Od izbora materijala, preko oblika i principa izrade, do najsitnijih
          detalja - vi odlučujete, mi realizujemo. Koristimo najsavrenije
          tehnologije kako bismo vam garantovali vrhunski kvalitet, kratke
          rokove izrade i odgovornost u svakom koraku procesa.
        </p>
        <p>
          Konstantno rastemo, razvijamo se i širimo svoje mogućnosti, ali nikada
          ne zaboravljamo zašto smo krenuli - da bismo svakom klijentu pružili
          proizvod koji prevazilazi očekivanja.
        </p>
      </div>

      <div className='space-y-3 scroll-mt-50' id='about-us-info'>
        <p className='text-xl font-semibold'>Kako smo nastali</p>
        <p>
          Naša priča počinje kao porodična priča - sa strašću, verom u kvalitet
          i željom da stvaramo nešto posebno.
        </p>
        <p>
          2019. godine, ono što je krenulo kao mala porodična radionica, brzo je
          preraslo u nešto mnogo veće. Shvatili smo da ljudi traže više od
          standardnih rešenja - traže proizvode koji nose emociju, priču, lični
          pečat. I tako je rođen "Reci Seci", brend posvećen personalizovanim
          poklonima koji govore iz srca.
        </p>
        <p>
          Kako je potražnja rasla, tako smo i mi rasli. Uvideli smo potrebu za
          specijalizovanim pristupom u segmentu sportskih i korporativnih
          priznanja, pa smo kreirali "Carstvo Trofeja" - brend koji slavi
          uspehe, nagrade i dostignuća na način koji zaslužuju.
        </p>
        <p>
          Danas nismo više samo porodična radionica - naš tim se širi, broj
          angažovanih ljudi raste, ali naše vrednosti ostaju iste: kvalitet,
          odgovornost, kratki rokovi i maksimalna personalizacija. Svaki
          projekat shvatamo ozbiljno, svaki klijent je važan, svaki proizvod je
          prilika da pokažemo šta znamo.
        </p>
        <p>
          Od prvih dana pa do danas, koristimo najsavrenije tehnologije kako
          bismo vam pružili proizvode koji ne samo da izgledaju sjajno, već
          traju i ostavljaju utisak. Jer verujemo da svaki poklon, svako
          priznanje, svaki suvenir - zaslužuje da bude savršen.
        </p>
        <p>Dobrodošli u našu priču. Postanite deo nje.</p>
      </div>

      <Separator className='my-10' />

      <p className='text-2xl font-semibold text-center'>
        "ORIGINALNOST KOJA SE DARUJE"
      </p>

      <Button>
        <Link href={'/'}>Početna strana</Link>
      </Button>
    </div>
  )
}
