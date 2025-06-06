import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { shopInfo } from '@/lib/consts'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='space-y-5'>
      <h2 className='text-2xl font-semibold'>Uslovi korišćenja</h2>

      <Separator />

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Opšti uslovi</p>
        <p>
          {`Opšti uslovi poslovanja Internet prodavnice "IZABERI POKLON"
          sastavljeni su u skladu sa Zakonom o zaštiti potrošača, našom
          najboljom namerom da ostvarimo saradnju na obostrano zadovoljstvo kao
          i međunarodnom praksom u e-poslovanju. Podaci o firmi Trgovcu: ${shopInfo.shortDescription}, ${shopInfo.address};
          Matični Broj: ${shopInfo.idNumber}; PIB: ${shopInfo.pib} (u daljem tekstu: “Izaberi
          Poklon”) Prilikom registracije, posetilac Internet prodavnice "Izaberi
          Poklon" ostavlja svoje identifikacione podatke, a zatim se prijavljuje
          sa svojim korisničkim imenom i lozinkom. Nakon registracije korisnik
          stiče pravo na kupovinu. Opšti uslovi poslovanja podrazumevaju
          delovanje internet prodavnice "Izaberi Poklon", prava korisnika i
          poslovni odnos između trgovca i potrošača a sve u cilju obostranog
          zadovoljstva. Opšti uslovi su detaljnije objašnjeni po oblastima.`}
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Saglasnost i promene uslova</p>
        <p>
          Dragi kupci, posetom, registracijom ili kupovinom na Internet
          prodavnici Izaberi Poklon prihvatate Uslove korišćenja koji su
          navedeni u daljem tekstu. Molimo Vas da pažljivo pročitate pravilila i
          procedure koje primenjujemo. Ukoliko ne prihvatate ove uslove, molimo
          Vas nemojte koristiti ovu internet prodavnicu. Izaberi Poklon zadržava
          pravo da vrši izmene i dopune ovih Uslova korišćenja u bilo kom
          trenutku izmenama u ovom tekstu. Hvala na poverenju.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Korišćenje internet prodavnice</p>
        <p>
          Korisnici prihvataju korišćenje sadržaja internet prodavnice
          isključivo za sopstvenu upotrebu i na svoju odgovornost. Korisnicima
          internet prodavnice www.izaberipoklon.com je strogo zabranjeno
          korišćenje specijalizovanih programa (robota, crawlera) radi
          preuzimanja sadržaja sa internet prodavnice, kao i bilo kakvih
          hakerskih napada u cilju onesposobljavanja internet prodavnice.
          Nedozvoljeno korišćenje internet prodavnice smatra se kršenjem pravila
          i podložno je tužbi.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Intelektualna svojina</p>
        <p>
          Sadržaj prikazan na ovoj interent prodavnici je zaštićen autorskim
          pravima, vlasništvo su Izaberi Poklon-a ili njegovih dobavljača, ne
          mogu se koristiti bez naše prethodne saglasnosti, uključujući
          stranice, dizajnerske elemente, tekstove, fotografije, logotipe, audio
          zapise i softver. Svaka neovlašćena upotreba može predstavljati
          kršenje Zakona o autorskom i srodnim pravima, zakona o žigovima ili
          drugih zakona iz oblasti intelektualne svojine. Celokupan sadržaj
          možete pregledati, kopirati, štampati ili preuzimati isključivo za
          ličnu, nekomercijalnu upotrebu i u informativne svrhe, pod uslovom da
          sve naznake o autorskim pravima ili drugim vlasničkim informacijama
          koji su sadržani u originalnom dokumentu zadržite u svim kopijama,
          osim ukoliko je drugačije naznačeno na drugom mestu na ovoj internet
          prodavnici. Ne smete menjati sadržaj ove interent prodavnice ni na
          koji način, niti ga reprodukovati ili javno prikazivati, izvoditi,
          distribuirati ili na drugi način koristiti u javne ili komercijalne
          svrhe. Ukoliko prekršite bilo koji od ovih Uslova, Vaša dozvola za
          upotrebu interent prodavnice će biti povučena i bićete obavezni da
          odmah uništite sve sadržaje koje ste preuzeli ili odštampali. Ukoliko
          za sadržaj koji se nalazi na Izaberi Poklon internet prodavnici
          smatrate da je Vaš i da je zloupotrebljen, molimo Vas da nas
          kontaktirate u cilju utvrđivanja intelektualne svojine. Sve
          informacije dostupne na internet stranama isključivo su informativnog
          karaktera, ne smeju se koristiti u komercijalne svrhe niti
          distribuirati trećim licima.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>
          Komentari, komunikacija i sadržaj koji postavljaju korisnici
        </p>
        <p>
          Korisnici mogu slobodno komentarisati proizvode i slati email poruke.
          Izaberi Poklon zadržava pravo da ne objavi ili izbriše komentare koji
          su zlonamerni, sadrže nepristojne izjave, šire mržnju i diskriminaciju
          i na bilo koji način ugrožavaju prava drugih. Takvi komentari će biti
          uklonjeni bez prethodnog obaveštenja. Lažno predstavljanje i
          registracija sa tuđom e-adresom nije dozvoljeno. Protiv takvih
          aktivnosti Izaberi Poklon može pokrenuti odgovarajući zakonski
          postupak. Izaberi Poklon ne garantuje potpunost, istinitost, tačnost i
          pouzdanost sadržaja koji su postavljeni od strane korisnika. Svi
          materijali, povratne informacije ili druge vrste informacija koje
          dostavite ovoj internet prodavnici neće biti smatrani za poverljive
          ili vlasničke. Izaberi Poklon će postati isključivi vlasnik svih
          informacija prikupljenih na interent prodavnici ili u vezi sa njim.
          Izaberi Poklon nema obaveze u odnosu na takve informacije i slobodan
          je da ih koristi bez ograničenja (kao što je upotreba, reprodukcija,
          modifikacija, objavljivanje, (re)distribucija, javno prikazivanje
          itd.) bez navođenja izvora.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Ograničenje garancija</p>
        <p>
          Informacije, proizvodi, materijali i/ili usluge (“sadržaj”) prikazan
          na ovoj interent prodavnici je prikazan “kao takav” bez ikakvih
          garancija bilo koje vrste. Izaberi Poklon se eksplicitno ograničava do
          maksimalnog stepena određenog zakonom, od bilo kakve direktne,
          indirektne statutarne ili bilo koje druge garancije ili zastupništva,
          uključujući garancije tržišne isplativosti, pogodnosti za određenu
          svrhu ili poštovanja intelektualnih ili svojinskih prava. Sadržaj čine
          isključivo informacije opšte prirode, koje nisu namenjene za rešavanje
          specifičnih situacija ili za neku konkretnu osobu ili entitet, i koje
          ne predstavljaju profesionalni savet.
        </p>

        <p>
          U maksimalnom stepenu koji zakon dozvoljava, Izaberi Poklon ne daje
          garancije za tačnost, primenjivost, pouzdanost i kompletnost sadržaja
          na ovoj internet prodavnici, kao ni garanciju neprekidnog rada,
          pravovremenosti, bezbednosti ili odsustva grešaka. Izaberi Poklon može
          promeniti sadržaj ove internet prodavnice ili proizvode i cene
          navedene na internet prodavnici u bilo koje vreme i bez prethodnog
          upozorenja. Sadržaj na ovoj internet prodavnici može biti zastareo, a
          Izaberi Poklon se ne obavezuje da ga ažurira. Sadržaj objavljen na
          ovoj internet prodavnici može se odnositi na proizvode, programe ili
          usluge koji nisu dostupni u Vašoj zemlji. Konsultujte se sa Izaberi
          Poklon lokalnom kancelarijom u vezi proizvoda, programa ili usluga
          koje su Vam na raspolaganju. Izaberi Poklon, njegovi dobavljači ili
          treća lica pomenuta na ovoj internet prodavnici ni u kom slučaju neće
          biti odgovorni za bilo kakvu štetu (uključujući, ali ne i isključivo,
          direktnu, indirektnu, slučajnu, posledičnu, posebnu štetu, ili takvu
          koja nastaje usled gubitka profila, gubitka podataka ili prekida
          poslovnog procesa) koja nastaje kao posledica upotrebe, odlaganja ili
          nemogućnosti upotrebe, ili rezultata upotrebe ove internet prodavnice,
          internet prezentacija na koje vode veze sa ove internet prodavnice ili
          sadržaja objavljenog ovde ili na drugim pomenutim internet
          prezentacijama, bez obzira da li je zasnovana na garanciji, ugovoru
          ili drugom pravnom sredstvu ili da li je klijent bio obavešten o
          mogućnosti takve štete. Ukoliko vaša upotreba materijala, informacija
          ili usluga sa ove internet prodavnice rezultira potrebom za
          servisiranjem ili popravkom opreme ili podataka, Vi ste odgovorni za
          nastale troškove.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Radno vreme</p>
        <p>
          Internet prodavnica Izaberi Poklon radi od 00-24h, 7 dana u nedelji,
          365/6 dana u godini, što znači da ćete proizvode moći da naručite u
          bilo koje doba. U slučaju tehničkih problema ili tokom zahvata
          redovnog održavanja internet prodavnice može biti kraći vremenski
          period nedostupan o čemu ćete biti obavešteni.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>
          Promena (ažuriranje) podataka na sajtu
        </p>

        <p>
          Izaberi Poklon zadržava pravo da može u svako vreme, bez prethodne
          najave, promeniti podatke prikazane na bilo kojoj stranici sajta.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>
          Uslovi kupovine na internet prodavnici Izaberi Poklon
        </p>

        <p>
          Izaberi Poklon je internet prodavnica koja posluje u skladu sa Zakonom
          o elektronskoj trgovini i svim ostalim važećim zakonima i propisima u
          Republici Srbiji.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Kako poručiti?</p>
        <p>
          Poručiti možete na tri načina, putem internet prodavnice, pozivom
          našeg korisničkog servisa na broj{' '}
          <a href={`tel:${shopInfo.phone}`} className='underline'>
            {shopInfo.phone}
          </a>{' '}
          ili slanjem poruke na adresu{' '}
          <a href={`mailto:${shopInfo.email}`} className='underline'>
            {shopInfo.email}
          </a>
        </p>

        <p>
          Poručivanje putem internet prodavniceje je vrlo jednostavno.
          Registrujete se na internet prodavnici, pronađete artikal koji želite
          kupiti, zatim kliknete na "dodaj u korpu". Pratite korake i ukoliko ne
          želite ništa više da kupite, kliknete "Završi kupovinu". Očekivano
          vreme dostave artikala je od 3 do 5 radna dana osim ako nije drugačije
          naznačeno za konkretan proizvod. Ukoliko postoje tehnički problemi ili
          problemi druge vrste operater će Vas putem E:mail-a ili telefonskim
          pozivom obavestiti o promeni roka isporuke gde Vi u tom trenutku imate
          pravo odustanka od kupovine ili prihvatanje promena.
        </p>

        <p>
          Ako Vam je lakše poručiti telefonom, pozovite naš korisnički servis na
          broj{' '}
          <a href={`tel:${shopInfo.phone}`} className='underline'>
            {shopInfo.phone}
          </a>{' '}
          i dajte sve potrebne podatke našem operateru. Uz proizvod dobijate
          račun i garanciju i uputstvo, ukoliko je potrebno.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>UPUTSTVO ZA KUPOVINU</p>
        <p>
          Prilikom pregleda proizvoda primetićete da pored svakog posebno
          postoji dugme "dodaj u korpu". Kada kliknte to dugme bićete obavešteni
          da se proizvod nalazi u Vašoj korpi. Moguće je više puta dodati isti
          proizvod u korpu. U svakom trenutku omogućen Vam je pregled svih
          proizvoda koje želite da kupite. Jednostavnim klikom na ikonicu korpe
          u gornjem desnom uglu internet prodavnice otvarate stranicu na kojoj
          su prikazani svi proizvodi spremni za kupovinu. Veoma lako možete
          obrisati proizvode iz korpe ili povećati/smanjiti broj željenih
          proizvoda. Kada ste završili sve korake i spremni ste da izvršite
          kupovinu potrebno je samo da na stranici korpa kliknete dugme "Završi
          kupovinu". Ukoliko ste se predomislili u vezi kupovine i želite nešto
          da promenite, jednostavno se možete vratiti na stranicu korpa. Posle
          odabira proizvoda i registracije, birate način dostave, plaćanja,
          poveravate da li ste ispravno uneli svoje podatke i potvrđujete
          kupovinu. Na taj način je Vaša porudžbina kompletirana i možete da
          očekujete e-mail sa potvrdom a u da Vas u roku od 24 sata kontaktira
          naš operater zadužen za internet prodaju.
        </p>

        <ul className='list-disc pl-4 space-y-3'>
          <li>
            <p>
              Prilikom svake prve narudžbine, naš tim će vas kontaktirati kako
              bi potvrdio narudžbinu sa Vama
            </p>
          </li>
          <li>
            <p>
              Nakon potvrde narudžbine od strane kupca, narudžbina je neopoziva
            </p>
          </li>
          <li>
            <p>
              Obavezujemo se da naručene proizvode isporučimo ispravne i u
              predviđenom roku
            </p>
          </li>
          <li>
            <p>
              U slučaju bilo kakve promene obavezujemo se da Vas obavestimo
              prilikom telefonske potvrde narudžbine
            </p>
          </li>
        </ul>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>
          Cene u Izaberi Poklon internet prodavnici
        </p>
        <p>
          Sve cene su iskazane u dinarima *nismo u sistemu PDV-a. Prodavac
          zadržava pravo izmene cena, ako nije drugačije navedeno (u slučaju
          akcija i specijalnih popusta). Cene važe u trenutku kreiranja
          porudžbine i imaju dejstvo i validnost i za naredni period. Navedene
          cene važe samo za kupovinu u Internet prodavnici i mogu da se
          razlikuju od cena u maloprodajnim objektima Prodavca. Izaberi Poklon
          zadržava pravo da otkaže porudžbinu i pritom obavesti kupca putem
          pozviva ili poruke na e-adresu ukoliko je došlo do grube greške
          prilikom postavljanja cene ili opisa proizvoda na sajt.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>Garancija kvaliteta</p>
        <p>
          Izaberi Poklon garantuje za kvalitet svojih proizvoda. Svi proizvodi
          su naše proizvodnje u celosti ili delimično, Proizvodi poput lampi ili
          slicnih tehničkih uređajima imaju garanti rok od 2godine. u garantnom
          roku, o svom trošku obezbeđuje otklanjanje kvarova i nedostataka
          proizvoda koji proizilaze iz nepodudarnosti stvarnih sa propisanim
          odnosno deklarisanim karakteristikama kvaliiteta proizvoda. U slučaju
          neizvršenja ove obaveze, davalac garancije će zameniti proizvod novim
          ili vratiti novac. Garantni rok počinje danom prodaje uređaja, koji se
          unosi u garantni list i overava pečatom i potpisom ovlašćenog
          prodavca. Kupac gubi pravo na garanciju ako se kvar izazove
          nepridržavanjem datih uputstava za upotrebu i ako su na proizvodu
          vršene bilo kakve popravke od strane neovlašćenih lica. Da bi se
          izbegli nesporazumi, prilikom isporuke dužnost prodavca i kupca je da
          izvrše pregled proizvoda i da ukažu na eventualna mehanička oštećenja,
          u kom slučaju će proizvod biti zamenjen. Garanciji ne podlažu
          baterije.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>
          Izjava o odricanju od odgovornosti
        </p>
        <p>
          Izaberi Poklon tim maksimalno koristi sve svoje resurse kako bismo
          bili što precizniji u opisu proizvoda, prikazu slika i samih cena.
          Ipak, ne možemo garantovati da su sve navedene informacije kompletne i
          u potpunosti ispravne. Svi artikli prikazani na internet prodavnici su
          deo naše ponude i ne podrazumeva da su dostupni u svakom trenutku. Sve
          cene na ovoj internet prodavnici iskazane su u dinarima, sa uračunatim
          porezom. Ako proizvod koji ste kupili odstupa od podataka koji su
          navedeni na internet prodavnici možete ga vratiti u nekorišćenom
          stanju sa kompletnom dokumentacijom koju ste uz njega dobili, a mi
          ćemo vam vratiti novac ili zameniti za drugi odgovarajući artikal.
        </p>
      </div>

      <p className='text-2xl'>Sigurna internet kupovina</p>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>1. Plaćanje gotovinom</p>
        <p>
          Plaćanje pouzećem podrazumeva plaćanje narudžbine kuriru prilikom
          preuzimanja pošiljke. Isporuku vrši kurirska služba i moguća su
          plaćanja gotovinom ili čekovima, u zavisnosti od kurirske službe.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>
          2. Plaćanje debitnim i kreditnim karticama
        </p>
        <ul className='list-disc pl-4 space-y-3'>
          <li>
            <p>
              Plaćanje proizvoda na našoj internet prodavnici je moguće izvršiti
              na jedan od sledećih načina: platnim karticama - VISA, Maestro ili
              MasterCard koje podržavaju plaćanje preko Interneta. Plaćanje
              karticama je realizovano u saradnji sa AllSecure doo i UniCredit
              bankom i obavlja se na bezbedan i sertifikovan način preko
              AllSecure Paymet Gateway-a, jednostavnim unosom podataka sa platne
              kartice. Nakon što se unesu podaci o kartici i potvrdi plaćanje,
              banka autorizuje transakciju i time je porudžbina odobrena i ulazi
              u dalji proces pripreme za isporuku. Iznos će biti rezervisan na
              vašoj kartici (računu) i neće Vam biti raspoloživ za drugu namenu.
              Transkacija će biti kompletirana i iznos skinut sa vašeg računa
              tek kada su proizvodi pripremljeni za transport i predati
              kurirskoj službi. U slučaju da se plaćanje ne kompletira, odnosno
              iznos se ne skine sa računa do isteka 14 dana od prihvatanja Vaše
              porudžbine, ta porudžbenica će biti otkazana i izbrisana. Nakon
              isteka roka od 14 dana, novac rezervisan na Vašem računu se
              oslobadja i biće Vam ponovo na raspolaganju. Nakon toga možete
              ponoviti istu ili novu porudžbinu, i izvršiti plaćanje vezano za
              njih. Proverite kod banke koja je karticu izdala da li Vaša
              kartica podržava plaćanje preko Interneta. Napomena: Plaćanje nije
              moguće u stranoj valuti.
            </p>
          </li>
          <li>
            <p>
              Ukoliko je transakcija uspešna bićete vraćeni na našu internet
              stranicu sa obaveštenjem da je plaćanje uspešno obavljeno. U
              slučaju da plaćanje nije uspelo, bićete vraćeni na našu internet
              stranicu sa informacijom o neuspelom plaćanju i imaćete mogućnost
              da ponovite plaćanje karticom ili da izaberete drugi način
              plaćanja.
            </p>
          </li>
          <li>
            <p>
              U slučaju vraćanja robe i povraćaja sredstava kupcu koji je
              prethodno platio nekom od platnih kartica, delimično ili u
              celosti, a bez obzira na razlog vraćanja, Izaberi Poklon se
              obavezuje da povraćaj vrši isključivo preko VISA, EC/MC i Maestro
              metoda plaćanja, što znači da će banka na zahtev prodavca obaviti
              povraćaj sredstava na račun korisnika kartice.
            </p>
          </li>
          <li className='space-y-2'>
            <p className='font-semibold'>
              Sigurnost plaćanja kreditnim karticama Zaštita prilikom plaćanja
              putem interneta
            </p>
            <p>
              a) Iz sigurnostnih razloga, podaci o Vašoj platnoj kartici su
              vidljivi samo banci kao procesoru kartica, pa se celokupan proces
              naplate obavlja na internet stranicama banke. Niti jednog trenutka
              podaci o platnoj kartici nisu dostupni našem sistemu.
            </p>
            <p>
              b) Opis načina zaštite poverljivih podataka o transakciji pri
              plaćanju platnim karticama Tajnost podataka Kupca zaštićena je i
              osigurana upotrebom SSL enkripcije. Stranice za naplatu putem
              interneta osigurane su korištenjem Secure Socket Layer (SSL)
              protokola sa 128-bitnom enkripcijom podataka (SSL enkripcija
              postupak je šifrovanja podataka radi sprečavanja neovlaštenog
              pristupa prilikom njihovog prijenosa). Navedeni način omogućuje
              siguran prenos informacija i onemogućuje nedopušten pristup
              podacima prilikom komunikacije između računara Kupca i ALL Secure
              payment gateway servisa i obrnuto. Navedeni servis i finansijske
              ustanove razmjenjuju podatke upotrebom virtuelne privatne mreže
              (VPN), koja je zaštićena od neautorizovanog pristupa. Brojevi
              kreditnih kartica se ne čuvanju i nisu dostupni neovlaštenim
              osobama. Prilikom plaćanja karticom putem interneta, unos podataka
              o platnoj kartici se vrši na zaštićenoj stranici Banke. Poverljive
              informacije se prenose putem javne mreže u zaštićenoj(kriptovanoj)
              formi, upotrebom SSL protokola i PKI sistema, kao trenutno
              najsavremenije kriptografske tehnologije.
            </p>

            <p className='font-semibold'>
              **Proverite kod banke koja je karticu izdala da li Vaša kartica
              podržava plaćanje preko Interneta.
            </p>
            <p className='font-semibold'>
              **Isporuka robe je moguća samo na teritoriji Srbije i iskljucivo
              na adresu koja je navedena na korisničkom profilu.
            </p>
            <p className='font-semibold'>
              ***Samo vlasnik platne kartice može izvršiti plaćanje.
            </p>
          </li>
        </ul>
      </div>

      <p className='text-2xl'>Kupovina u prodavnici</p>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>1. Gotovinsko plaćanje</p>
        <p>Plaćanje u gotovini</p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>
          2.Virmansko plaćanje - plaćanje preko računa
        </p>
        <p>
          Svoju narudžbinu možete platiti direktnom uplatom na tekući račun
          Poklon Dućana. Uplatnicom na šalteru banke ili pošte; e-bankarstvo;
          m-bankarstvo Plaćanje možete izvršiti odmah nakon potvrde narudžbine{' '}
          <span className='font-semibold'>standardnom uplatnicom</span> u bilo
          kojoj <span className='font-semibold'>pošti ili banci</span> na
          teritoriji Srbije, ili putem internet bankarstva ukoliko imate
          internet pristup svom tekućem računu{' '}
          <span className='font-semibold'>(e-bankarstvo ili m-bankarstvo)</span>
          . Narudžbenicu sa uputstvima i iznosom za uplatu izabranih proizvoda
          dobićete na e-adresu koju ste uneli prilikom registracije. Isporuku
          vršimo nakon prijema sredstava na tekući račun.
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>3. Poklon vaučer</p>
        <p>
          Tražite idealan poklon? Poklon vaučer Vam omogućava da darujete dragoj
          osobi i vise od poklona - mogućnost izbora! Odaberite Željeni iznos i
          darujte u originalnom dizajniranom pakovanju koje dobijate gratis.
          Ukoliko ste vlasnik preduzeća, a zainteresovani ste da obradujete Vaše
          zaposlene možete nas direktno kontaritrati na{' '}
          <a href={`mailto:${shopInfo.email}`} className='underline'>
            {shopInfo.email}
          </a>
          . Poklon Vaučer je savršen poklon za svaku priliku!
        </p>
      </div>

      <div className='space-y-3'>
        <p className='text-xl font-semibold'>7. Korporativni pokloni</p>
        <p>
          Pored navedenih načina kupovine, u mogućnosti smo da Vam uz posebne
          pogodnosti, obezbedimo ekskluzivne personalizovane korporativne
          poklone za Vaše poslovne partnere ili zaposlene. Dozvolite nam da
          budemo deo Vaših važnih trenutaka i uspeha, a mi ćemo Vam uzvratiti.
        </p>
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
