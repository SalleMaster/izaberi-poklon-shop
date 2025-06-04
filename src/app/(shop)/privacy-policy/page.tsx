import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='space-y-5'>
      <h2 className='text-2xl'>Politika privatnosti</h2>

      <div className='space-y-3'>
        <p>
          Ovim putem Vas obaveštavamo o informacijama koje prikupljamo od Vas
          kada nam pošaljete upit putem našeg websajta. Prikupljajući ove
          informacije mi delujemo kao rukovodilac obrade ličnih podataka u
          skladu sa Zakonom o zaštiti podataka o ličnosti Republike Srbije (Sl
          glasnik RS br 87/2018) i Opštom uredbom o zaštiti podataka o ličnosti
          EU (GDPR). Ova Politika privatnosti reguliše praksu prikupljanja
          informacija od korisnika prilikom korišćenja internet stranice
          www.izaberipoklon.com, kao i njihovo skladištenje u bazama podataka
          našeg preduzeća Red Dot PR Milanović Zoran.
        </p>
        <p>
          Naša politika privatnosti obuhvata razloge kako i zašto sakupljamo,
          koristimo i štitimo Vaše lične podatke. U nastavku možete pronaći više
          informacija o nama zašto i kako koristimo Vaše podatke i koja su Vaša
          prava kada je reč o zaštiti ličnih podataka.
        </p>
      </div>

      <div className='space-y-3'>
        <ul className='list-disc pl-4 space-y-3'>
          <li>
            <p>
              Vaša porudžbina i{' '}
              <span className='font-semibold'>podaci su potpuno sigurni!</span>{' '}
              Mi u internet prodavnici IZABERI POKLON i preduzeću Red Dot PR
              Milanović Zoran cenimo Vašu privatnost, zato o Vašim podacima
              izuzetno pažljivo brinemo. Posetioci naše interent prodavnice,
              korišćenjem iste, prihvataju da se podaci o njima koriste u skladu
              sa ovom Politikom privatnosti. Kako bismo brzo i uspešno obradili
              Vašu narudžbinu potrebni su nam Vaši ispravni podaci: ime,
              prezime, adresa, e-adresa(email) i broj telefona. Uz pomoć tih
              informacija bićemo u mogućnosti da Vam isporučimo željene
              proizvode, kao i da Vas obavestimo o trenutnom statusu porudžbine.
              Preduzimamo sve standardne mere predostrožnosti kako bi sprečili
              eventualni neovlašćeni pristup Vašim podacima.
            </p>
          </li>

          <li>
            <p>
              <span className='font-semibold'>
                Prikupljamo samo neophodne, osnovne podatke
              </span>{' '}
              o kupcima/korisnicima i podatke neophodne za poslovanje i
              informisanje korisnika u skladu sa dobrim poslovnim običajima u
              cilju pružanja vrhunske i kvalitetne usluge. Vaše podatke ćemo
              koristiti isključivo u svrhu tehničke administracije internet
              prodavnice, kako bi Vam obezbedili pristup posebnim informacijama,
              ponudama i materilaima ili za direktnu komunikaciju sa Vama.
              Nikada i ni na koji način nećmo zloupotrebiti Vaše privatne
              informacije. Registracijom ili prijavom na naš servis
              www.izaberipoklon.com dajete saglasnost kao korisnik servisa sa
              opcijom slanja obaveštenja na Vašu adresu, e-adresu(email),
              ostavljen kontakt telefon ili viber servis. Kao korisnik imate
              mogućnost odluke da budete ili ne, deo naših bilten, sms i viber
              lista putem kojih održavamo kontakt sa Vama kao vernim korisnicima
              i kupcima u cilju informisanja i deljenja sadržaja vezanog za
              novine, ponude, igre i dodatna znanja komplementarna sa tematikom
              IZABERI POKLON internet prodavnice. Kao naš korisnik ili kupac
              imate mogućnost u svakom trenutku, da slanjem zahteva u pisanoj
              ili elektronskoj formi, povučete svoju saglasnost, nakon čega više
              nikada nećete dobijati pomenute informacije.
            </p>
          </li>

          <li>
            <p>
              Prilikom unošenja podataka o platnoj kartici poverljive
              informacija se prenose putem javne mreže u zaštićenoj
              (kriptovanoj) formi upotrebom SSL protokola i PKI sistema kao
              trenutno najsavremenije kriptografske tehnologije. Sigurnost
              podataka prilikom kupovine, garantuje procesor platnih kartica,
              AllSecure doo, pa se tako kompletni proces naplate obavlja na
              stranicama njihove platforme. Niti jednog trenutka podaci o
              platnoj kartici nisu dostupni našem sistemu.
            </p>
          </li>

          <li>
            <p>
              Svi podaci o Vama kao našim korisnicima ili kupcima se{' '}
              <span className='font-semibold'>strogo čuvaju</span> i dostupni su
              samo zaposlenima kojima su ti podaci nužni za obavljanje posla.
              Svi zaposleni naše internet prodavnice Izaberi Poklon i preduzeća
              Red Dot PR Milanović Zoran su odgovorni za poštovanje načela
              zaštite privatnosti. Kako bismo brzo i uspešno dostavili
              proizvode, kurirska služba koja vrši dostavu kupljenih proizvoda
              ima mogućnost pristupa Vašim podacima neophodnim za izvršenje
              ugovorenog posla - ime, prezime, adresu i broj telefona. U ime
              internet prodavnice Izaberi Poklon i preduzeća Red Dot PR
              Milanović Zoran obavezujemo se da ćemo čuvati privatnost svih
              naših kupaca. Obavezujemo se da prikupljene podatke ne koristimo
              ni u koje druge svrhe, niti ih prosleđujemo trećim licima, što Vam
              osigurava potpuno sigurno i bezbedno iskustvo korišćenja naše
              internet prodavnice.
            </p>
          </li>

          <li>
            <p>
              Pored navedenih prikupljamo, analiziramo i{' '}
              <span className='font-semibold'>
                obrađujemo podatke o proizvodima
              </span>{' '}
              koje naši posetioci traže i kupuju, kao i o stranicama koje
              posećuju. Te podatke koristimo da bismo poboljšali ponudu i izgled
              naših stranica, i omogućili našim korisnicima jednostavnije
              korišćenje, sigurniju i udobniju kupovinu. Ovi podaci su anonimni.
            </p>
          </li>

          <li>
            <p>
              Kao naši korisnici ili kupci odgovorni ste za pristup svom sistemu
              i zaštitu svojih korisničkih informacija i lozinke, tačnost i
              istinitost svih informacija upisanih ili poslatih na servis
              internet prodavnice Izaberi Poklon i preduzeća Red Dot PR
              Milanović Zoran.
            </p>
          </li>

          <li>
            <p>
              <span className='font-semibold'>
                Internet prodavnica koristi kolačiće
              </span>{' '}
              (cookies) isključivo u svrhu autentifikacije korisnika i
              održavanja statusa prijave. Ovi kolačići su neophodni za
              funkcionisanje korisničkih naloga i bezbedno korišćenje naše
              internet prodavnice. Ne koristimo kolačiće za praćenje ponašanja
              korisnika ili u marketinške svrhe. Kolačići za autentifikaciju se
              skladište na Vašem uređaju i automatski brišu nakon isteka sesije
              ili odjave sa našeg sistema.
            </p>
          </li>

          <li>
            <p>
              Maloletna lica mogu koristiti internet prodavnicu uz nadzor
              roditelja ili staratelja. IZABERI POKLON internet prodavnica
              zadržava pravo da odbije pružanja usluga, ukine nalog ili otkaže
              narudžbenicu ukoliko ustanovi da su prekršeni{' '}
              <Link href='/uslovi-koriscenja' className='underline'>
                Uslovi korišćenja
              </Link>
              , a shodno zakonskim ograničenjima.
            </p>
          </li>

          <li>
            <p>
              Izaberi Poklon i preduzeće Red Dot PR Milanović Zoran nisu
              odgovorni za sadržaj informacija objavljenih od strane korisnika
              na našem servisu.
            </p>
          </li>

          <li>
            <p>
              <span className='font-semibold'>Saglasnost i promena uslova</span>
              <br />
              Korišćenje naših servisa podrazumeva saglasnost Vas kao korisnika
              sa navedenim uslovima korišćenja. Izaberi Poklon i preduzeće Red
              Dot PR Milanović Zoran zadržavaju pravo za izmenom ove Politike
              privatnosti. Svaka izmena postaje važeća nakon njenog
              objavljivanja na interent prodavnici www.izaberipoklon.com. Vi kao
              korisnik se obavezujete da povremeno pročitate ovu politiku
              privatnosti kako biste bili upoznati sa eventualnim izmenama iste.
              Ukoliko nastavite sa korišćenjem internet prodavnice i servisa
              IZABERI POKLON nakon nove verzije politike privatnosti,
              podrazumeva se da ste istu prihvatili kao važeću.
            </p>
          </li>

          <li>
            <p>
              Sav materijal na ovom internet sajtu (u daljem tekstu “Sajt”) je
              zaštićen autorskim pravima i svaka neovlašćena upotreba može
              predstavljati kršenje Zakona o autorskom i srodnim pravima, Zakona
              o žigovima ili drugih zakona iz oblasti intelektualne svojine Osim
              ukoliko je drugačije naznačeno na drugom mestu na ovom sajtu sav
              sadržaj možete pregledati kopirati štampati ili preuzimati
              isključivo za ličnu nekomercijalnu upotrebu i u informativne
              svrhe, pod uslovom da sve naznake o autorskim pravima ili drugim
              vlasničkim informacijama koji su sadržani u originalnom dokumentu
              zadržite u svim kopijama. Ne možete menjati sadržaj ovog sajta ni
              na koji način niti ga reprodukovati ili javno prikazivati,
              izvoditi, distribuirati ili na drugi način koristiti u javne ili
              komercijalne svrhe. Ne uzimaju i u obzir prethodno navedeno bilo
              koji softver ili drugi materijal dostupan za preuzimanje ili
              korišćenje preko ovog sajta koji poseduje sopstvene uslove
              korišćenja ili licenciranja nalazi se pod zaštitom tih uslova.
              Ukoliko prekršite bilo koji od ovih Uslova Vaša dozvola za
              upotrebu sajta će biti povučena i bićete obavezni da odmah
              uništite sve sadržaje koje ste preuzeli ili odštampali. Osim ako
              je eksplicitno drugačije naznačeno ovde ili na nekoj drugoj
              stranici ovog sajta, ništa ovde sadržano bilo izričito prećutno
              odricanjem ili na drugi način vam ne daje pravo da koristite bilo
              koji deo intelektualne svojine koju ste pronašli na Sajtu.
            </p>
          </li>
        </ul>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Izjava o konverzijama</p>
        <p>
          Sva plaćanja će biti obavljenima u dinarima (RSD) Ukoliko se plaća
          platnim karticama inostranih Banaka izdavalaca dinarski iznos
          transakcije e biti konvertovan u settlement valutu Banke (EUR) prema
          kursu Narodne Banke Srbije.
        </p>
        <p>
          Pri zaduživanju Vase platne kartice ve konvertovan iznos će se
          konvertovati u Vašu lokalnu valutu, prema kursu koji primenjuju
          operatori platnih kartica.
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
        <p className='text-xl font-semibold'>Izjava o PDV-u</p>
        <p>Red Dot nije u sistemu PDV-a, nema skrivenih troškova.</p>
      </div>

      <Button>
        <Link href={'/'}>Početna strana</Link>
      </Button>
    </div>
  )
}
