import { Button } from '@/components/ui/button'
import { shopInfo } from '@/lib/consts'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='space-y-5'>
      <h2 className='text-2xl'>Reklamacije</h2>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>
          Reklamacije na oštećenje u transportu
        </p>
        <p>
          Veoma je važno da sva oštećenja u transportu, vidjliva na pakovanju
          proizvoda odmah prijavite kuriru koji vam isporuči robu. Svako
          oštećenje pri transportu kupac je dužan da prijavi u roku od 24h od
          prijema robe.
        </p>
        <p>
          Ukoliko uočite takvo oštećenje, nemojte potpisati prijem pošiljke ili
          zamolite kurira da sačeka dok proverite da li oštećenje na pakovanju
          uslovilo i oštećenje samog proizvoda ili gubitak delova. Ukoliko
          proizvod nije oštećen, i svi delovi su na broju, potpišite prijem
          pošiljke.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>
          Reklamacije na podatke ili pogrešnu vrstu robe
        </p>
        <p>
          Ukoliko ste primili pošiljku i nakon otvaranja kutije ustanovili da
          isporučena roba ne odgovara naručenoj ili podaci na računu nisu
          odgovarajući, molimo Vas da nas, najkasnije u roku od 24h od trenutka
          prijema pošiljke, pozovete telefonom na broj{' '}
          <a href={`tel:${shopInfo.phone}`} className='underline'>
            {shopInfo.phone}
          </a>
          , ili pošaljete e-mail sa svojim podacima (ime, prezime, telefon) na
          e-mail{' '}
          <a href={`mailto:${shopInfo.email}`} className='underline'>
            {shopInfo.email}
          </a>{' '}
          i opišete kakav problem imate. U najkraćem mogućem roku, odgovorćemo
          potrošaču na izjavljenu reklamaciju i obavestićemo Vas o daljem
          postupanju. Rok za rešavanje reklamacije je 15 dana od trenutka
          prijave iste.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Odustanak od kupovine</p>
        <p>
          Prema zakonu o zaštiti potrošača, iz člana 36. tački 3, potrošač nema
          prava da odustane od ugovora u slučaju isporuke robe proizvedene prema
          posebnim zahtevima potrošača ili jasno personalizovane.
        </p>
      </div>

      <Button>
        <Link href={'/'}>Početna strana</Link>
      </Button>
    </div>
  )
}
