import { Button } from '@/components/ui/button'
import { shopInfo } from '@/lib/consts'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='space-y-5'>
      <h2 className='text-2xl'>Povraćaj proizvoda</h2>

      <div className='space-y-3'>
        <p>
          Želite da vratite poručeni proizvod? Nema problema! Samo pošaljite
          nazad zajedno sa obrascem za odustajanje i dobijate celokupan iznos
          novca nazad.
        </p>
        <p>
          Mi u www.izaberipoklon.com internet prodavnici i preduzeću Red Dot PR
          Milanović Zoran ulažemo dosta truda, kako bismo opisali i prikazali
          svaki proizvod što je verodostojnije moguće. Međutim, razumemo da se
          događa da proizvode koje primite nisu baš kao što ste očekivali. Stoga
          smo ponosni što smo u prilici da Vam ponudimo vreme od 15 dana da se
          predomislite za bilo koju od Vaših kupovina na našoj internet
          prodavnici.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Pravo na odustajanje</p>
        <p>
          Dragi korisnici internet prodavnice www.izaberipoklon.com, želimo da
          Vas obavestimo da se prema Zakonu o zaštiti potrošača Republike Srbije
          (Službeni glasnik RS, br. 62/2014) kupovina putem naše internet
          prodavnice www.izaberipoklon.com{' '}
          <span className='font-semibold'>smatra prodajom na daljinu</span>. Vi
          kao korisnici internet prodavnice www.izaberipoklon.com, imate za
          slučaj prodaje na daljinu pravo po Zakonu, da odustanete od ugovora
          zaključenog na daljinu u roku od 15 dana od trenutka kada Vam je
          proizvod predat u državinu, odnosno u državinu lica kog ste kao kupac
          odredili, a nije prevoznik. Prilikom odustanka možete, ali nemate
          obavezu da navedete razlog zbog kojeg odustajete. Kupaci i potrošači
          su u ovom slučaju fizička lica koja proizvode kupuju radi namirenja
          svojih <span className='font-semibold'>individualnih potreba</span>, a
          ne radi obavljanja{' '}
          <span className='font-semibold'>profesionalne delatnosti</span>.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Povraćaj sredstava</p>
        <p>
          Ukoliko želite da iskoristite mogućnost odustanka od ugovora, kao
          kupac na www.izaberipoklon.com internet prodavnici, imate pravo na
          zamenu za drugi proizvod ili povraćaj novca. Ponosni smo da celokupnu
          vrednost plaćenog iznosa za naručene proizvode vraćamo pre roka od 14
          dana, i to odmah nakon prijema Izjave o odustanku od ugovora
          zaključenog na daljinu i naručenih proizvoda. Kao trgovci, a u skladu
          sa navedenim zakonom, u obavezi smo da Vama, našem kupcu, bez
          odlaganja vratimo iznos koji ste platili po osnovu ugovora, a
          najkasnije u roku od 14 dana od dana prijema proizvoda i izjave o
          odustanku od ugovora zaključenog na daljinu. Molimo Vas kao našeg
          kupca i korisnika interent prodavnice www.izaberipoklon.com, u slučaju
          odustajanja od ugovora, vratite naručene proizvode bez odlaganja, a
          najkasnije u roku od 15 dana, od dana kada ste poslali obrazac za
          odustanak od ugovora sklopljenog na daljinu. Ukoliko po isteku roka od
          15 dana od dana kada ste poslali izjavu o odustanku ne budete u
          prilici da pošaljete proizvod, izgubićete mogućnost povraćaja novca i
          proizvoda i nećemo biti u prilici da Vam zamenimo proizvod.
        </p>

        <ul className='list-disc pl-4 space-y-3'>
          <li>
            <p>
              Molimo Vas da prilikom povraćaja, obavezno proizvode vratite
              nekorišćene u ispravnom stanju sa neoštećenom originalnom
              ambalažom, zajedno sa originalnim fiskalnim isečakom i pratećom
              dokumentacijom. Po prijema proizvoda, naš korisnički servis će
              proveriti ispravnost i neoštećenost proizvoda, kako bismo Vam u
              što kraćem roku izvršili povraćaj sredstava.
            </p>
          </li>
          <li>
            <p>
              Kao Kupac imate odgovornost za neispravnost ili oštećenje
              proizvoda koji su rezultat neadekvatnog rukovanja proizvodom,
              odnosno kao kupac ste isključivo odgovorni za umanjenu vrednost
              proizvoda koja nastane kao posledica rukovanja proizvodom na način
              koji nije adekvatan, odnosno prevazilazi ono što je neophodno da
              bi se ustanovila njegova priroda, karakteristike i funkcionalnost.
              Ukoliko se utvrdi da je neispravnost ili oštećenje proizvoda
              nastupila krivicom kupca, nažalost, bićemo u obavezi da odbijemo
              zahtev za vraćanjem iznosa, i proizvod će Vam biti vraćen na Vaš
              trošak. Teret dokazivanja da je postupano u skladu sa prethodno
              navedenim, a radi ostvarivanja prava na odustanak od ugovora na
              daljinu je na Vama, odnosno kupcu. Troškove povraćaja proizvoda
              snosi kupac, osim u slučajevima kada kupac dobije neispravan ili
              pogrešan proizvod.
            </p>
          </li>
          <li>
            <p>
              U slučaju vraćanja robe ili povraćaja sredstava kupcu koji je
              predhodno platio nekom od platnih kartica, delimično ili u
              celosti, a bez obzira na razlog vraćanja, www.izaberipoklon.com je
              u obavezi da povraćaj vrši isključivo preko VISA, EC/MC i Maestro
              metoda plaćanja, što znači da će banka na zahtev prodavca obaviti
              povraćaj sredstava na račun korisnika kartice.
            </p>
          </li>
        </ul>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Procedura za povraćaj sredstava</p>
        <p>
          Molimo Vas da nas kontaktirate pozivanjem Korisničke podrške na broj
          telefona{' '}
          <a href={`tel:${shopInfo.phone}`} className='underline'>
            {shopInfo.phone}
          </a>{' '}
          ili slanjem poruke na e-adresu:{' '}
          <a href={`mailto:${shopInfo.email}`} className='underline'>
            {shopInfo.email}
          </a>{' '}
          sa Vašim Ličnim podacima i podacima Vašeg broja tekućeg dinarskog
          računa.
        </p>

        <ul className='list-disc pl-4 space-y-3'>
          <li>
            <p>
              Nakon što nam dostavite neophodne podatke, biće kreirana
              dokumentacija koja će Vam sa procedurom za povraćaj sredstava biti
              prosledjena na e-adresu koju ste ostavili prilikom kreiranja
              porudžbine.
            </p>
          </li>
        </ul>

        <p>
          Proceduru povraćaja novca nije preporučljivo samostalno pokretati, bez
          prethodnog kontakta i dogovora sa našom korisničkom podrškom. Ova
          dobra praksa se pokazala kao najbolji način za efikasnu realizaciju
          procesa i zadovoljstvo naših korisnik. Napomena: Molimo Vas da pratite
          procedure koja je navedena. Za sva dodatna pitanja, budite slobodni da
          nas kontaktirate.
        </p>
      </div>

      <p className='text-xl font-semibold'>
        Izjava o odustanku od ugovora zaključenog na daljinu možete preuzeti
        OVDE
      </p>

      <p className='text-xl font-semibold'>
        Ugovor o odustanku možete preuzeti OVDE
      </p>

      <div className='space-y-2'>
        <p className='text-xl font-semibold'>NAPOMENA:</p>
        <p className='text-xl font-semibold'>
          Zakon o zaštiti potrošača isključuje pravo kupca da vrati proizvod u
          određenim situacijama. Imajući u vidu asortiman proizvoda u našoj
          ponudi, od navedenih slučajeva u Zakonu, jedan slučaj je relevantan:
          Isporuka proizvoda proizvedenih prema posebnim zahtevima potrošača ili
          jasno personalizovanih. Ovo stavka zakona se odnosi na mogućnost
          Usluge graviranja ili štampe proizvoda.
        </p>
      </div>

      <Button>
        <Link href={'/'}>Početna strana</Link>
      </Button>
    </div>
  )
}
