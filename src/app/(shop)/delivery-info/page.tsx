import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { orderQuitForm, shopInfo, freeShippingThreshold } from '@/lib/consts'
import { priceFormatter } from '@/lib/format'
import Link from 'next/link'

export default function Page() {
  const formattedFreeShippingThreshold = priceFormatter(freeShippingThreshold)

  return (
    <div className='space-y-5'>
      <h2 className='text-2xl font-semibold'>Način isporuke</h2>

      <Separator />

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Prijem porudžbine</p>
        <p>
          Prilikom naručivanja proizvoda na Izaberi Poklon internet prodavnici,
          poslaćemo Vam automatsko obaveštenje o prijemu porudžbine na Vašu
          e-adresu. Molimo Vas da nas obavestite u roku od jednog sata od
          trenutk poručivanja, ukoliko primetite da detalji narudžbine nisu
          ispravni ili želite da izmenite nešto na originalnoj porudžbini.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Potvrda narudžbine</p>
        <p>
          Nakon što obradimo Vašu porudžbinu, naše kolege iz korisničke podrške
          će Vas pozvati telefonom radi potvrde porudžbine i provere ispravnosti
          unetih informacija, kako bi Vaša porudžbina stigla u pravo vreme na
          pravo mesto.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Preuzimanje narudžbine</p>
        <p>
          Molimo Vas da u planiranom periodu isporuke obezbedite da na adresi
          dostave bude osoba koja može preuzeti pošiljku. Molimo Vas da prilikom
          preuzimanja pošiljke u prisustvu kurira vizuelno pregledate svoj paket
          kako slučajno ne bi postojala neka neželjena oštećenja. Ukoliko je
          pošiljka naizgled bez oštećenja slobodno preuzmite pošiljku i
          potpišite kuriru adresnicu.
        </p>
        <ul className='list-disc pl-4 space-y-3'>
          <li>
            <p>
              Ukoliko primetite da je transportna kutija značajno oštećena i
              posumnjate da je proizvod možda oštećen (pocepani delovi i
              ugnječenje), paket ne bi trebalo da preuzmete. U ovom slučaju
              potrebno je da nas odmah obavestite telefonom na broj{' '}
              <a href={`tel:${shopInfo.phone}`} className='underline'>
                {shopInfo.phone}
              </a>{' '}
              ili da nam pošaljite poruku na e-adresu{' '}
              <a href={`mailto:${shopInfo.email}`} className='underline'>
                {shopInfo.email}
              </a>{' '}
              sa navedenim razlogom zbog kojeg ste odbili preuzimanje paketa, a
              ukoliko ste u prilici i fotografijom oštećenja i Vašim podacima
              (ime, prezime, broj telefona).
            </p>
          </li>

          <li>
            <p>
              Ukoliko ste primili pošiljku i nakon otvaranja kutije ustanovili
              da isporučena roba ne odgovara naručenoj ili podaci na računu nisu
              odgovarajući, molimo Vas da nas, najkasnije u roku od 24h od
              trenutka prijema pošiljke, pozovete telefonom na broj{' '}
              <a href={`tel:${shopInfo.phone}`} className='underline'>
                {shopInfo.phone}
              </a>
              , ili da nam pošaljete poruku na e-adresu{' '}
              <a href={`mailto:${shopInfo.email}`} className='underline'>
                {shopInfo.email}
              </a>{' '}
              i opišete na kakav problem ste naišli, a ukoliko ste u prilici i
              fotografijom oštećenja i Vašim podacima (ime, prezime, broj
              telefona).
            </p>
          </li>

          <li>
            <p>
              Ukoliko se na kupljenom proizvodu pojave neusaglašenosti u smislu
              odredbi Zakona o zaštiti potrošača, molimo Vas da postupite na
              način definisan{' '}
              <Link href='/reklamacije' className='underline'>
                Pravilnikom o reklamaciji potrošača za robu kupljenu putem
                internet prodavnice.
              </Link>{' '}
              Robu zajedno sa{' '}
              <Link
                href={orderQuitForm.url}
                target='_blank'
                className='underline'
              >
                obrascem Zahteva za reklamaciju
              </Link>{' '}
              treba da pošaljete na adresu Red Dot (sa naznakom za Internet
              Prodavnicu), {shopInfo.address}
            </p>
          </li>

          <li>
            <p>
              Nakon prijema informacija o daljem postupku ćemo Vas obavestiti u
              najkraćem mogućem roku. Rok za reklamacije na eventualna oštećenja
              je 24h od trenutka prijema. Molimo Vas da nas obavestite u
              navedenom roku, jer u suprotnom, nećemo biti u prilici da branimo
              Vaše interese i nećemo biti u prilici da obradimo i prihvatimo
              Vašu reklamaciju.
            </p>
          </li>
        </ul>

        <p>
          Kurir svaku pošiljku pokušava da uruči u dva navrata. Uobičajena
          praksa je da ukoliko Vas kurir ne pronađe na adresi, da Vas pozove na
          broj telefona koji ste ostavili prilikom kreiranja narudžbenice i
          ugovori novi termin isporuke. Ukoliko Vas i tada ne pronađe na adresi,
          pošiljka će se vratiti nama ili će se naći u lokalnoj POŠTI ukoliko za
          isporuku odaberete kurirsku službu POSTEXPRESS, tamo će se nalaziti 5
          dana. Ukoliko se pak nama vrati po prijemu pošiljke, kontkatiraćemo
          Vas kako bi ustanovili razlog neuručenja i ugovorili ponovno slanje.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>
          Dostava na teritoriji cele Srbije
        </p>
        <p>
          Narudžbine vrednosti veće od {formattedFreeShippingThreshold} će biti
          isporučene{' '}
          <span className='font-semibold'>
            BESPLATNO NA TERITORIJI CELE SRBIJE
          </span>
          . Ukoliko narudžbina ima vrednost manju od{' '}
          {formattedFreeShippingThreshold} dostava se naplaćuje 250 RSD ili vise
          shodno cenovniku kurirskih službi. Isporuka robe se vrši isključivo na
          teritoriji Republike Srbije.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Isporuka na poseban datum</p>
        <p>
          Bilo da želite da iznenadite Vaše voljene osobe na poseban datum, a
          niste u prilici da im lično uručite poklon ili Vam odgovara poseban
          datum dostave zbog ličnih obaveza, naše kolege iz korisničke podrške
          će se pobrinuti da Vaša porudžbina dođe kada god vi to želite. Vaše je
          samo da u napomenu porudžbine navedite željeni datum isporuke, a mi
          ćemo se pobrinuti za ostalo.
        </p>
        <p>
          *Napomena - ukoliko propust isporuke bude do kurirske službe mi ne
          snosimo odgovornost budući da kada paket napusti naše prostorije više
          nemamo ingerencija nad njim već je sve u rukama kurirskih službi.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>
          Pakovanje proizvoda, transport i bezbednost
        </p>
        <p>
          Prozvodi se isporučuju na željenu adresu adekvatno upakovan i
          zaštićeni od oštećenja u transportu. Svaki proizvod ćete primiti u
          originalnoj poklon ambalaži.
        </p>
      </div>

      <Button>
        <Link href={'/'}>Početna strana</Link>
      </Button>
    </div>
  )
}
