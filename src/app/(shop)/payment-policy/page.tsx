import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='space-y-5'>
      <h2 className='text-2xl'>Uslovi plaćanja</h2>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Izjava o konverzijama</p>
        <p>Sva online plaćanja de biti obavljenima u dinarima (RSD).</p>
        <p>
          Ukoliko se plaća platnim karticama inostranih Banaka izdavalaca,
          dinarski iznos transakcije će biti konvertovan u settlement valutu
          Banke (EUR) prema kursu Narodne Banke Srbije. Pri zaduživanju Vaše
          platne kartice, već konvertovan iznos će se konvertovati u Vašu
          lokalnu valutu, prema kursu koji primenjuju operatori platnih
          kartica.", a koji nama u trenutku transakcije ne može biti poznat. Kao
          rezultat ove konverzije postoji mogućnost neznatne razlike od
          originalne cene navedene na našem sajtu.
        </p>
        <p>
          "Please note that all payments will be effected in the Serbian
          currency - dinar (RSD). If the payment is done using foreign issuers
          payment cards, total amount of transaction will be converted into bank
          settlement currency, according to the current exchange rate of the
          Serbian National Bank. Once when transaction is settled the already
          converted amount will be converted into your local currency according
          to the exchange rate of credit card associations. As a result of this
          conversion there is a possibility of a slight difference from the
          original price stated in our web site."
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Plaćanje pouzećem</p>
        <p>
          Ukoliko kupovinu obavljate na način posredništvom kurirske službe,
          plaćanje vršite kuriru a po pravilima koje primenjuje kurirska služba
          koju ste odabrali (gotovinsko plaćanje u dinarima ili stranoj valuti,
          kartično pladanje i drugo).
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>
          Plaćanje u maloprodajnom objektu
        </p>
        <p>
          Poručenu robu sa preuzimanjem u maloprodajnom objektu na adresi
          preduzeća možete platiti u gotovini ili virmanski u skladu sa
          dogovorom prilikom kreiranja narudžbenice.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Povraćaj sredstava</p>
        <p>
          U slučaju povraćaja sredstava kupcu koji je predhodno platio nekom od
          platnih kartica, delimično ili u celosti, a bez obzira na razlog
          vraćanja, taj povraćaj se vrši isključivo preko iste VISA, Maestro ili
          MasterCard kartice koja je korištena za plaćanje. Ovo znači da će naša
          banka na naš zahtev obaviti povraćaj sredstava na račun korisnika
          kartice.
        </p>
        <p>
          Ukoliko je plaćanje izvršeno pouzećem, povraćaj sredstava je moguć tek
          nakon povrata poručene robe i adekvatnog razloga za isti a putem
          kreiranja zahteva za Povraćaj sredstava, ista de biti uplaćena na
          račun kupca u roku od 15 dana od dana povrata proizvoda.
        </p>
        <p>
          Povraćaj sredstava nije moguć u gotovini na platnom maloprodajnom
          mestu osim ukoliko se isti ne vrši u toku istog dana kada je obavljena
          kupovina.
        </p>
      </div>

      <Button>
        <Link href={'/'}>Početna strana</Link>
      </Button>
    </div>
  )
}
