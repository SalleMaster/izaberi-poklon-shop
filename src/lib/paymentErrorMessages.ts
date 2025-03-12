export const paymentErrorMessages: Record<string, string> = {
  // 3D Secure specific errors (000.400.xxx series)
  '000.400.101':
    'Kartica ne učestvuje u 3D Secure sistemu ili autentifikacija nije dostupna.',
  '000.400.102': 'Korisnik nije registrovan za 3D Secure uslugu.',
  '000.400.103': 'Tehnička greška u 3D Secure sistemu.',
  '000.400.104':
    'Nedostaje ili je pogrešna 3D Secure konfiguracija za kanal plaćanja.',
  '000.400.105': 'Uređaj nije podržan - autentifikacija nije moguća.',
  '000.400.106':
    'Nevažeći odgovor za autentifikaciju (PARes) u 3D Secure transakciji.',
  '000.400.107': 'Greška u komunikaciji sa serverom za proveru kartice.',
  '000.400.108':
    'Korisnik kartice nije pronađen - broj kartice se ne nalazi u opsegu izdavaoca kartice.',
  '000.400.109': 'Kartica nije registrovana za 3D Secure verziju 2.',
  '000.400.111': 'Zahtev za proveru podataka nije uspeo.',
  '000.400.112': '3RI transakcija nije dozvoljena.',
  '000.400.113':
    'Verzija protokola nije podržana od strane ACS sistema izdavaoca kartice.',
  '000.400.200': 'Greška u komunikaciji prilikom provere rizika transakcije.',

  // Transaction declined errors (800.xxx.xxx series)
  '800.100.100': 'Transakcija je odbijena iz nepoznatog razloga.',
  '800.100.150':
    'Transakcija je odbijena (povraćaj novca na transakciji kockanja nije dozvoljen).',
  '800.100.151': 'Transakcija je odbijena (nevažeća kartica).',
  '800.100.152': 'Transakcija je odbijena od strane sistema za autorizaciju.',
  '800.100.153': 'Transakcija je odbijena (nevažeći sigurnosni kod - CVV).',
  '800.100.154': 'Transakcija je odbijena (transakcija označena kao nevažeća).',
  '800.100.155': 'Transakcija je odbijena (iznos premašuje dostupna sredstva).',
  '800.100.156': 'Transakcija je odbijena (greška u formatu).',
  '800.100.157': 'Transakcija je odbijena (pogrešan datum isteka kartice).',
  '800.100.158': 'Transakcija je odbijena (sumnja na manipulaciju).',
  '800.100.159': 'Transakcija je odbijena (ukradena kartica).',
  '800.100.160': 'Transakcija je odbijena (kartica je blokirana).',
  '800.100.161': 'Transakcija je odbijena (previše neuspešnih pokušaja).',
  '800.100.162': 'Transakcija je odbijena (prekoračen limit).',
  '800.100.163':
    'Transakcija je odbijena (prekoračena maksimalna učestalost transakcija).',
  '800.100.164': 'Transakcija je odbijena (prekoračen limit trgovca).',
  '800.100.165': 'Transakcija je odbijena (izgubljena kartica).',
  '800.100.166': 'Transakcija je odbijena (neispravan PIN).',
  '800.100.167':
    'Transakcija je odbijena (referentna transakcija se ne poklapa).',
  '800.100.168': 'Transakcija je odbijena (ograničena kartica).',
  '800.100.169':
    'Transakcija je odbijena (tip kartice nije podržan od strane centra za autorizaciju).',
  '800.100.170': 'Transakcija je odbijena (transakcija nije dozvoljena).',
  '800.100.171': 'Transakcija je odbijena (kartica zadržana).',
  '800.100.172': 'Transakcija je odbijena (račun je blokiran).',
  '800.100.173':
    'Transakcija je odbijena (nevažeća valuta, nije podržana od strane centra za autorizaciju).',
  '800.100.174': 'Transakcija je odbijena (nevažeći iznos).',
  '800.100.175': 'Transakcija je odbijena (nevažeći brend kartice).',
  '800.100.176':
    'Transakcija je odbijena (račun privremeno nije dostupan. Pokušajte ponovo kasnije).',
  '800.100.177': 'Transakcija je odbijena (polje za iznos ne sme biti prazno).',
  '800.100.178': 'Transakcija je odbijena (PIN je pogrešno unet previše puta).',
  '800.100.179': 'Transakcija je odbijena (prekoračen broj podizanja).',
  '800.100.190': 'Transakcija je odbijena (nevažeći konfiguracioni podaci).',
  '800.100.191':
    'Transakcija je odbijena (transakcija u pogrešnom stanju na strani banke).',
  '800.100.192':
    'Transakcija je odbijena (nevažeći CVV, iznos je još uvek rezervisan na kartici i biće oslobođen za nekoliko radnih dana. Molimo proverite CVV kod pre ponovnog pokušaja).',
  '800.100.195':
    'Transakcija je odbijena (broj korisničkog računa/ID nepoznat).',
  '800.100.196': 'Transakcija je odbijena (greška prilikom registracije).',
  '800.100.197': 'Transakcija je odbijena (registracija otkazana eksterno).',
  '800.100.198': 'Transakcija je odbijena (nevažeći vlasnik).',
  '800.100.199': 'Transakcija je odbijena (nevažeći poreski broj).',
  '800.100.200': 'Obratite se platiocu zbog nespecificiranog razloga.',
  '800.100.201': 'Podaci o računu ili banci su netačni.',
  '800.100.202': 'Račun je zatvoren.',
  '800.100.203': 'Nedovoljno sredstava na računu.',
  '800.100.204': 'Mandat je istekao.',
  '800.100.205': 'Mandat je odbačen.',
  '800.100.206':
    'Povraćaj autorizovanog plaćanja zatražen od strane korisnika.',
  '800.100.207': 'Zatražen je povraćaj novca.',
  '800.100.208':
    'Direktno zaduženje nije omogućeno za navedeni račun ili banku.',
  '800.100.300':
    'Network token transakcija je odbijena (PAN podaci su nevažeći).',
  '800.100.301':
    'Network token transakcija je odbijena (izdavalac smatra da PAN nije podoban za tokenizaciju).',
  '800.100.302':
    'Network token transakcija je odbijena (izdavalac je odbio tokenizaciju).',
  '800.100.303':
    'Network token transakcija je odbijena (sesija sa kartičnim sistemom je istekla).',
  '800.100.304':
    'Network token transakcija je odbijena (kartični sistem nije identifikovan ili podržan).',
  '800.100.305':
    'Network token transakcija je odbijena (ID trgovca je pogrešan ili trgovac nije prijavljan).',
  '800.100.306':
    'Network token transakcija je odbijena (podaci ne mogu biti dešifrovani).',
  '800.100.307':
    'Network token transakcija je odbijena (nevažeće stanje mrežnog tokena - operacija nije dozvoljena).',
  '800.100.308':
    'Network token transakcija je odbijena (zahtev ne može biti verifikovan od strane kartičnog sistema).',
  '800.100.309':
    'Network token transakcija je odbijena (prekinuto od strane kartičnog sistema).',
  '800.100.310': 'Network token transakcija je odbijena (nepoznat razlog).',
  '800.100.311':
    'Network token transakcija je odbijena (zahtev za mrežni token u toku).',
  '800.100.312':
    'Network token transakcija je odbijena (mrežni token nije dostupan ali je zatražen).',
  '800.100.313':
    'Network token transakcija je odbijena (nedovoljno podataka za zahtevanje mrežnog tokena).',
  '800.100.314':
    'Network token transakcija je odbijena (mrežni token već postoji).',
  '800.100.315':
    'Network token transakcija je odbijena (obavezno polje nije prisutno).',
  '800.100.316':
    'Network token transakcija je odbijena (nije obrađeno - greška u konfiguraciji trezora tokena).',
  '800.100.317':
    'Network token transakcija je odbijena (suspendovani mrežni token).',
  '800.100.318':
    'Network token transakcija je odbijena (potrebna je najmanje jedna transakcija sa kriptogramom).',
  '800.100.320':
    'Network token transakcija je odbijena (generička greška provajdera usluge tokena koja se ne može ponoviti).',
  '800.100.321':
    'Network token transakcija je odbijena (generička greška provajdera usluge tokena koja se može ponoviti).',
  '800.100.322':
    'Network token transakcija je odbijena (generička greška kartičnog sistema koja se može ponoviti).',
  '800.100.323':
    'Network token transakcija je odbijena (generička greška kartičnog sistema koja se ne može ponoviti).',
  '800.100.324': 'Network token transakcija je odbijena (greška u formatu).',
  '800.100.325': 'Network token transakcija je odbijena (neautorizovano).',
  '800.100.326':
    'Network token transakcija je odbijena (mrežni token nije pronađen).',
  '800.100.327': 'Network token transakcija je odbijena (previše zahteva).',
  '800.100.330':
    'Network token transakcija je odbijena (mrežni token je istekao).',
  '800.100.402': 'Vlasnik kartice/bankovnog računa nije validan.',
  '800.100.403': 'Transakcija je odbijena (opoziv naloga za autorizaciju).',
  '800.100.500':
    'Vlasnik kartice je obavestio svoju banku da zaustavi ovo ponavljajuće plaćanje.',
  '800.100.501':
    'Vlasnik kartice je obavestio svoju banku da zaustavi sva ponavljajuća plaćanja za ovog trgovca.',
  '800.700.100':
    'Transakcija za istu sesiju se trenutno obrađuje, pokušajte ponovo kasnije.',
  '800.700.101': 'Prezime je predugačko.',
  '800.700.201': 'Ime je predugačko.',
  '800.700.500': 'Naziv kompanije je predugačak.',
  '800.800.102': 'Nevažeća ulica.',
  '800.800.202': 'Nevažeći poštanski broj.',
  '800.800.302': 'Nevažeći grad.',

  // System and technical errors (900.xxx.xxx series)
  '000.400.030':
    'Transakcija je delimično neuspešna (potrebno je ručno poništavanje zbog neuspelog automatskog poništavanja).',
  '900.100.100':
    'Neočekivana greška u komunikaciji sa povezanim sistemom/bankama.',
  '900.100.200': 'Primljena je greška od povezanog sistema/banke.',
  '900.100.201':
    'Greška na eksternom sistemu plaćanja (npr. na strani banke, procesora plaćanja...).',
  '900.100.202':
    'Nevažeći tok transakcije, zatražena funkcija nije primenjiva za referentnu transakciju.',
  '900.100.203': 'Greška na internom sistemu plaćanja.',
  '900.100.204': 'Greška prilikom obrade poruke.',
  '900.100.205': 'Greška odgovora iz trezora tokena.',
  '900.100.300': 'Isteklo je vreme za obradu, neizvestan rezultat.',
  '900.100.301':
    'Vreme za transakciju je isteklo bez odgovora od povezanog sistema/banke. Transakcija je poništena.',
  '900.100.310':
    'Vreme za transakciju je isteklo zbog interne greške u konfiguraciji sistema. Zahtev ka banci nije poslat.',
  '900.100.400':
    'Vreme za obradu je isteklo na strani povezanog sistema/banke.',
  '900.100.500':
    'Vreme za obradu je isteklo na strani povezanog sistema/banke (pokušajte kasnije).',
  '900.100.600': 'Povezani sistem/banka trenutno nije dostupan/dostupna.',
  '900.100.700': 'Greška na eksternom pružaocu usluga.',
  '900.200.100': 'Redni broj poruke u povezanom sistemu nije sinhronizovan.',
  '900.300.600': 'Vreme korisničke sesije je isteklo.',
  '900.400.100':
    'Neočekivana greška u komunikaciji sa eksternim sistemom za procenu rizika.',

  // Additional system and operational errors
  '600.100.100':
    'Neočekivana greška integratora (Zahtev nije mogao biti obrađen).',
  '800.500.100':
    'Direktna transakcija zaduženja je odbijena iz nepoznatog razloga.',
  '800.500.110':
    'Nije moguće obraditi transakciju - nedostatak terminalID-jeva - molimo kontaktirajte prihvatioca.',
  '800.600.100': 'Transakcija se već obrađuje.',
  '800.800.400': 'Sistem prihvatioca je u procesu održavanja.',
  '800.800.800':
    'Sistem za plaćanje trenutno nije dostupan. Molimo kontaktirajte podršku ukoliko se ovo ponovi.',
  '800.800.801':
    'Sistem za plaćanje je trenutno u procesu održavanja. Izvinjavamo se zbog neugodnosti. Ukoliko niste bili obavešteni o ovom održavanju unapred, kontaktirajte vašeg prodajnog predstavnika.',
  '999.999.888': 'NEDEFINISANA GREŠKA PLATFORME BAZE PODATAKA',
  '999.999.999': 'NEDEFINISANA GREŠKA PRIHVATIOCA/POVEZANOG SISTEMA',

  // Online banking and user cancellation errors
  '100.395.101': 'Banka nije podržana za Giropay.',
  '100.395.102': 'Račun nije omogućen za Giropay npr. test nalog.',
  '100.395.501': 'Prethodno započet onlajn transfer je istekao.',
  '100.395.502':
    'Banka je prijavila istek vremena za onlajn transfer transakciju.',
  '100.396.101': 'Otkazano od strane korisnika.',
  '100.396.102': 'Nije potvrđeno od strane korisnika.',
  '100.396.103': 'Prethodno započeta transakcija je istekla.',
  '100.396.104': 'Neizvestan status - verovatno otkazano od strane korisnika.',
  '100.396.106': 'Korisnik nije prihvatio uslove plaćanja.',
  '100.396.201': 'Otkazano od strane trgovca.',
  '100.397.101': 'Otkazano od strane korisnika zbog eksterne promene.',
  '100.397.102': 'Odbijeno od strane procesora/banke zbog eksterne promene.',

  // Additional authentication error
  '300.100.100':
    'Transakcija je odbijena (potrebna je dodatna autentifikacija korisnika).',

  // Risk management and fraud prevention errors
  '100.380.401': 'Autentifikacija korisnika nije uspela.',
  '100.380.501': 'Istek vremena za transakciju za upravljanje rizikom.',
  '100.400.000': 'Transakcija je odbijena (pogrešna adresa).',
  '100.400.001': 'Transakcija je odbijena (pogrešna identifikacija).',
  '100.400.002': 'Transakcija je odbijena (nedovoljan kreditni rejting).',
  '100.400.005': 'Transakcija mora biti izvršena za nemačku adresu.',
  '100.400.007': 'Greška sistema (mogući netačni/nedostajući ulazni podaci).',
  '100.400.020': 'Transakcija je odbijena.',
  '100.400.021': 'Transakcija je odbijena za zemlju.',
  '100.400.030': 'Transakcija nije autorizovana. Molimo proverite ručno.',
  '100.400.039': 'Transakcija je odbijena zbog druge greške.',
  '100.400.040': 'Greška autorizacije.',
  '100.400.041': 'Transakcija mora biti izvršena za nemačku adresu.',
  '100.400.042':
    'Transakcija je odbijena od strane SCHUFA (nedovoljan kreditni rejting).',
  '100.400.043':
    'Transakcija je odbijena zbog nedostajućih obaveznih parametara.',
  '100.400.044': 'Transakcija nije autorizovana. Molimo proverite ručno.',
  '100.400.045': 'SCHUFA rezultat nije konačan. Molimo proverite ručno.',
  '100.400.051':
    'SCHUFA greška sistema (mogući netačni/nedostajući ulazni podaci).',
  '100.400.060': 'Greška autorizacije.',
  '100.400.061': 'Transakcija je odbijena (nedovoljan kreditni rejting).',
  '100.400.063':
    'Transakcija je odbijena zbog nedostajućih obaveznih parametara.',
  '100.400.064':
    'Transakcija mora biti izvršena za austrijsku, nemačku ili švajcarsku adresu.',
  '100.400.065': 'Rezultat je dvosmislen. Molimo proverite ručno.',
  '100.400.071': 'Greška sistema (mogući netačni/nedostajući ulazni podaci).',
  '100.400.080': 'Greška autorizacije.',
  '100.400.081': 'Transakcija je odbijena.',
  '100.400.083':
    'Transakcija je odbijena zbog nedostajućih obaveznih parametara.',
  '100.400.084': 'Transakcija ne može biti izvršena za navedenu zemlju.',
  '100.400.085': 'Rezultat je dvosmislen. Molimo proverite ručno.',
  '100.400.086': 'Transakcija je odbijena (pogrešna adresa).',
  '100.400.087': 'Transakcija je odbijena (pogrešna identifikacija).',
  '100.400.091': 'Greška sistema (mogući netačni/nedostajući ulazni podaci).',
  '100.400.100': 'Transakcija je odbijena - veoma loš rejting.',
  '100.400.120': 'Greška autorizacije.',
  '100.400.121': 'Račun je na crnoj listi.',
  '100.400.122': 'Transakcija mora biti izvršena za važeći nemački račun.',
  '100.400.123':
    'Transakcija je odbijena zbog nedostajućih obaveznih parametara.',
  '100.400.130': 'Greška sistema (mogući netačni/nedostajući ulazni podaci).',
  '100.400.139': 'Greška sistema (mogući netačni/nedostajući ulazni podaci).',
  '100.400.140': 'Transakcija je odbijena od strane GateKeeper sistema.',
  '100.400.141': 'Izazov od strane ReD Shield sistema.',
  '100.400.142': 'Odbijeno od strane ReD Shield sistema.',
  '100.400.143': 'Bez ocene od strane ReD Shield sistema.',
  '100.400.144': 'ReD Shield greška podataka.',
  '100.400.145': 'ReD Shield greška povezivanja.',
  '100.400.146': 'Greška u stavci od strane ReD Shield sistema.',
  '100.400.147':
    'Plaćanje poništeno i transakcija odbijena od strane ReD Shield sistema.',
  '100.400.148':
    'Plaćanje poništeno i transakcija izazvana od strane ReD Shield sistema.',
  '100.400.149':
    'Plaćanje poništeno i greška podataka od strane ReD Shield sistema.',
  '100.400.150':
    'Plaćanje poništeno i greška povezivanja od strane ReD Shield sistema.',
  '100.400.151':
    'Plaćanje poništeno i greška u stavci od strane ReD Shield sistema.',
  '100.400.152':
    'Plaćanje poništeno i greška vraćena od strane ReD Shield sistema.',
  '100.400.241': 'Izazvano od strane Threat Metrix sistema.',
  '100.400.242': 'Odbijeno od strane Threat Metrix sistema.',
  '100.400.243': 'Nevažeći sessionId.',
  '100.400.260': 'Greška autorizacije.',
  '100.400.300': 'Prekinut proces plaćanja.',
  '100.400.301': 'Ponovo unesite godine/datum rođenja.',
  '100.400.302': 'Ponovo unesite adresu (packstation nije dozvoljen).',
  '100.400.303': 'Ponovo unesite adresu.',
  '100.400.304': 'Nevažeći ulazni podaci.',
  '100.400.305': 'Nevažeća strana adresa.',
  '100.400.306': 'Greška adrese za dostavu.',
  '100.400.307': 'Ponudite samo sigurne metode plaćanja.',
  '100.400.308':
    'Ponudite samo sigurne metode plaćanja; moguće prekinuti proces plaćanja.',
  '100.400.309':
    'Potvrdite ispravljenu adresu; ako nije potvrđena, ponudite samo sigurne metode plaćanja.',
  '100.400.310':
    'Potvrdite podatke o bankovnom računu; ako nisu potvrđeni, ponudite samo sigurne metode plaćanja.',
  '100.400.311': 'Transakcija je odbijena (greška u formatu).',
  '100.400.312': 'Transakcija je odbijena (nevažeći konfiguracioni podaci).',
  '100.400.313': 'Polje za valutu je nevažeće ili nedostaje.',
  '100.400.314': 'Iznos je nevažeći ili prazan.',
  '100.400.315':
    'Nevažeća ili nedostajuća email adresa (verovatno nevažeća sintaksa).',
  '100.400.316': 'Transakcija je odbijena (kartica nedostaje).',
  '100.400.317': 'Transakcija je odbijena (nevažeća kartica).',
  '100.400.318': 'Nevažeći IP broj.',
  '100.400.319': 'Transakcija je odbijena od strane sistema za procenu rizika.',
  '100.400.320': 'Podaci korpe za kupovinu su nevažeći ili nedostaju.',
  '100.400.321': 'Tip plaćanja je nevažeći ili nedostaje.',
  '100.400.322': 'Metod enkripcije je nevažeći ili nedostaje.',
  '100.400.323': 'Sertifikat je nevažeći ili nedostaje.',
  '100.400.324': 'Greška na eksternom sistemu za procenu rizika.',
  '100.400.325': 'Eksterni sistem za procenu rizika nije dostupan.',
  '100.400.326': 'Provera rizičnog bankovnog računa nije uspela.',
  '100.400.327': 'Izveštaj o riziku nije uspeo.',
  '100.400.328': 'Izveštaj o riziku nije uspeo (nevažeći podaci).',

  // Address Verification errors (AVS)
  '800.400.100': 'Provera adrese (AVS) nije uspela.',
  '800.400.101': 'Nepodudaranje ulice prilikom provere adrese.',
  '800.400.102': 'Nepodudaranje broja ulice prilikom provere adrese.',
  '800.400.103':
    'Nepodudaranje PO Box-a prilikom provere adrese - kritična greška.',
  '800.400.104':
    'Nepodudaranje poštanskog broja prilikom provere adrese - kritična greška.',
  '800.400.105':
    'Nepodudaranje AVS podešavanja (AVSkip, AVIgnore, AVSRejectPolicy).',
  '800.400.110':
    'Provera adrese (AVS) nije uspela. Iznos je još uvek rezervisan na kartici korisnika i biće oslobođen za nekoliko radnih dana. Molimo proverite tačnost adrese za naplatu pre ponovnog pokušaja transakcije.',
  '800.400.150': 'Neprihvatljivi podaci o adresi.',
  '800.400.151': 'Neprihvatljivi podaci o državi u adresi.',

  // Additional 3D Secure errors
  '100.390.100': '3D Secure transakcija je odbijena.',
  '100.390.101': 'Nepodudaranje iznosa kupovine/valute.',
  '100.390.102': 'PARes validacija nije uspela.',
  '100.390.103': 'PARes validacija nije uspela - problem sa potpisom.',
  '100.390.104': 'XID nepodudaranje.',
  '100.390.105':
    'Transakcija odbijena zbog tehničke greške u 3D Secure sistemu.',
  '100.390.106': 'Transakcija odbijena zbog greške u 3D Secure konfiguraciji.',
  '100.390.107':
    'Transakcija odbijena jer autentifikacija vlasnika kartice nije dostupna.',
  '100.390.108':
    'Transakcija odbijena jer trgovac ne učestvuje u 3D Secure programu.',
  '100.390.109':
    "Transakcija odbijena zbog VISA statusa 'U' ili AMEX statusa 'N' ili 'U' u 3D Secure programu.",
  '100.390.110':
    'Vlasnik kartice nije pronađen - navedeni broj kartice nije u opsegu izdavaoca.',
  '100.390.111': 'Greška u komunikaciji sa Directory serverom šeme.',
  '100.390.112': 'Tehnička greška u 3D sistemu.',
  '100.390.113': 'Nepodržani korisnički uređaj - autentifikacija nije moguća.',
  '100.390.114': 'Nije autentifikovano jer izdavalac odbija autentifikaciju.',
  '100.390.115': 'Autentifikacija nije uspela zbog nevažećeg formata poruke.',
  '100.390.116': 'Pristup sistemu za autentifikaciju je odbijen.',
  '100.390.117': 'Autentifikacija nije uspela zbog nevažećih polja podataka.',
  '100.390.118': 'Autentifikacija nije uspela zbog sumnje na prevaru.',
  '100.390.119': 'Prekoračen maksimalni broj 3DS pokušaja.',
  '100.390.120': 'Neplatna transakcija je odbijena.',
  '100.390.121': '3RI transakcija je odbijena.',
  '100.390.122': 'Razdvojena autentifikacija je odbijena.',
  '100.390.123': 'Prekoračen maksimalni broj PReq poruka.',
  '100.390.124': 'Autentifikacija je otkazana ili napuštena.',
  '800.400.200': 'Nevažeća autentifikacija platioca u 3D Secure transakciji.',

  // Blacklist and security errors
  '800.200.159': 'Račun ili korisnik je na crnoj listi (ukradena kartica).',
  '800.200.160': 'Račun ili korisnik je na crnoj listi (kartica blokirana).',
  '800.200.165': 'Račun ili korisnik je na crnoj listi (izgubljena kartica).',
  '800.200.202': 'Račun ili korisnik je na crnoj listi (račun zatvoren).',
  '800.200.208': 'Račun ili korisnik je na crnoj listi (račun blokiran).',
  '800.200.220':
    'Račun ili korisnik je na crnoj listi (fraudulentna transakcija).',
  '800.300.101': 'Račun ili korisnik je na crnoj listi.',
  '800.300.102': 'Zemlja je na crnoj listi.',
  '800.300.200': 'Email adresa je na crnoj listi.',
  '800.300.301': 'IP adresa je na crnoj listi.',
  '800.300.302': 'IP adresa je anonimni proxy.',
  '800.300.401': 'BIN je na crnoj listi.',
  '800.300.500':
    'Transakcija je privremeno na crnoj listi (previše pokušaja sa nevažećim CVV kodom).',
  '800.300.501':
    'Transakcija je privremeno na crnoj listi (previše pokušaja sa nevažećim datumom isteka).',
  '800.310.200': 'Račun je zatvoren.',
  '800.310.210': 'Račun nije pronađen.',
  '800.310.211': 'Račun nije pronađen (BIN/izdavalac ne učestvuje).',

  // Rate limiting and duplicate transaction errors
  '800.110.100': 'Dupla transakcija.',
  '800.120.100': 'Odbijeno zbog prekoračenja limita.',
  '800.120.101': 'Već je prekoračen maksimalni broj transakcija po računu.',
  '800.120.102': 'Već je prekoračen maksimalni broj transakcija po IP adresi.',
  '800.120.103':
    'Već je prekoračen maksimalni broj transakcija po email adresi.',
  '800.120.200': 'Već je prekoračen maksimalni ukupni obim transakcija.',
  '800.120.201':
    'Već je prekoračen maksimalni ukupni obim transakcija po računu.',
  '800.120.202':
    'Već je prekoračen maksimalni ukupni obim transakcija po IP adresi.',
  '800.120.203':
    'Već je prekoračen maksimalni ukupni obim transakcija po email adresi.',
  '800.120.300': 'Prekoračena je stopa povraćaja novca po BIN-u.',
  '800.120.401':
    'Prekoračen je maksimalni broj transakcija ili ukupni obim za konfigurisane MID-ove ili CI-ove.',
  '800.120.402': 'Plaćanje se već obrađuje.',
  '800.130.100': 'Transakcija sa istim ID-em transakcije već postoji.',
  '800.140.100':
    'Prekoračen maksimalni broj registracija po broju mobilnog telefona.',
  '800.140.101': 'Prekoračen maksimalni broj registracija po email adresi.',
  '800.140.110':
    'Prekoračen maksimalni broj registracija mobilnog telefona po broju kreditne kartice.',
  '800.140.111':
    'Prekoračen maksimalni broj registracija broja kreditne kartice po mobilnom telefonu.',
  '800.140.112':
    'Prekoračen maksimalni broj registracija email adrese po broju kreditne kartice.',
  '800.140.113':
    'Prekoračen maksimalni broj registracija broja kreditne kartice po email adresi.',
  '800.150.100': 'Vlasnik računa se ne poklapa sa imenom kupca.',
  '800.160.100':
    'Nevažeći podaci o plaćanju za konfigurisani tip raspoređivanja kupaca.',
  '800.160.110':
    'Nevažeći podaci o plaćanju za konfigurisani tip raspoređivanja plaćanja.',
  '800.160.120':
    'Nevažeći podaci o plaćanju za konfigurisani tip raspoređivanja ponavljajuće transakcije.',
  '800.160.130':
    'Nevažeći podaci o plaćanju za konfigurisani tip raspoređivanja veličine tiketa.',

  // Merchant and channel configuration errors
  '500.100.201': 'Kanal/trgovac je onemogućen (obrada nije moguća).',
  '500.100.202': 'Kanal/trgovac je nov (obrada još nije moguća).',
  '500.100.203': 'Kanal/trgovac je zatvoren (obrada nije moguća).',
  '500.100.301': 'Trgovac-konektor je onemogućen (obrada nije moguća).',
  '500.100.302': 'Trgovac-konektor je nov (obrada još nije moguća).',
  '500.100.303': 'Trgovac-konektor je zatvoren (obrada nije moguća).',
  '500.100.304':
    'Trgovac-konektor je onemogućen na gateway-u (obrada nije moguća).',
  '500.100.401': 'Konektor nije dostupan (obrada nije moguća).',
  '500.100.402': 'Konektor je nov (obrada još nije moguća).',
  '500.100.403': 'Konektor nije dostupan (obrada nije moguća).',
  '500.200.101': 'Nije konfigurisan ciljni račun za DD transakciju.',

  // Payment method and type errors
  '600.200.100': 'Nevažeći metod plaćanja.',
  '600.200.200': 'Nepodržan metod plaćanja.',
  '600.200.201': 'Kanal/trgovac nije konfigurisan za ovaj metod plaćanja.',
  '600.200.202': 'Kanal/trgovac nije konfigurisan za ovaj tip plaćanja.',
  '600.200.300': 'Nevažeći tip plaćanja.',
  '600.200.310': 'Nevažeći tip plaćanja za dati metod plaćanja.',
  '600.200.400': 'Nepodržan tip plaćanja.',
  '600.200.500':
    'Nevažeći podaci o plaćanju. Niste konfigurisani za ovu valutu ili podtip (zemlju ili brend).',
  '600.200.501':
    'Nevažeći podaci o plaćanju za ponavljajuću transakciju. Trgovac ili podaci transakcije imaju pogrešnu konfiguraciju za ponavljanje.',
  '600.200.600': 'Nevažeći kod plaćanja (tip ili metod).',
  '600.200.700':
    'Nevažeći režim plaćanja (niste konfigurisani za traženi režim transakcije).',
  '600.200.701': 'Testni režim nije dozvoljen.',
  '600.200.800':
    'Nevažeći brend za dati metod plaćanja i režim plaćanja (niste konfigurisani za traženi režim transakcije).',
  '600.200.810': 'Dostavljen nevažeći povratni kod.',

  // Merchant security and authentication errors
  '600.300.101': 'Ključ trgovca nije pronađen.',
  '600.300.200': 'IP adresa izvora trgovca nije na beloj listi.',
  '600.300.210': 'URL za obaveštenja trgovca nije na beloj listi.',
  '600.300.211': 'URL rezultata za kupca nije na beloj listi.',

  // Additional service configuration errors
  '800.121.100':
    'Kanal nije konfigurisan za dati tip izvora. Molimo kontaktirajte vašeg menadžera za račun.',
  '800.121.200':
    'Bezbedni upit nije omogućen za ovaj entitet. Molimo kontaktirajte vašeg menadžera za račun.',
  '800.121.300':
    'SMS nije omogućen za ovaj entitet. Molimo kontaktirajte vašeg menadžera za račun.',
  '800.121.400':
    'Marketplace plaćanja nisu omogućena. Molimo kontaktirajte vašeg menadžera za račun.',

  // Registration and account data errors
  '100.150.100': 'Zahtev ne sadrži podatke o računu niti ID registracije.',
  '100.150.101':
    'Nevažeći format za navedeni ID registracije (mora biti u UUID formatu).',
  '100.150.200': 'Registracija ne postoji.',
  '100.150.201': 'Registracija još uvek nije potvrđena.',
  '100.150.202': 'Registracija je već deregistrovana.',
  '100.150.203': 'Registracija nije važeća, verovatno je inicijalno odbijena.',
  '100.150.204':
    'Referenca registracije računa ne pokazuje na transakciju registracije.',
  '100.150.205': 'Navedena registracija ne sadrži podatke o računu.',
  '100.150.206': 'Istekao je period čuvanja podataka.',
  '100.150.300':
    'Plaćanje je dozvoljeno samo uz važeću inicijalnu registraciju.',

  // Session state errors
  '100.350.100': 'Navedena sesija je ODBIJENA (nikakva akcija nije moguća).',
  '100.350.101': 'Navedena sesija je ZATVORENA (nikakva akcija nije moguća).',
  '100.350.200': 'Nedefinisano stanje sesije.',
  '100.350.201':
    'Referenciranje registracije preko ID reference nije primenljivo za ovaj tip plaćanja.',
  '100.350.301': 'Potvrda (CF) mora prvo biti registrovana (RG).',
  '100.350.302': 'Sesija je već potvrđena (CF).',
  '100.350.303':
    'Nije moguće deregistrovati (DR) neregistrovani račun i/ili korisnika.',
  '100.350.310': 'Nije moguće potvrditi (CF) sesiju putem XML-a.',
  '100.350.311':
    'Nije moguće potvrditi (CF) na kanalu sa direktnim prihvatom registracije.',
  '100.350.312':
    'Nije moguće koristiti direktni prihvat na neinternom konektoru.',
  '100.350.313': 'Registracija ovog tipa mora obezbediti URL za potvrdu.',
  '100.350.314':
    'Korisnik nije mogao biti obavešten o PIN-u za potvrdu registracije (problem sa kanalom).',
  '100.350.315':
    'Korisnik nije mogao biti obavešten o PIN-u za potvrdu registracije (slanje nije uspelo).',
  '100.350.316': 'Nije moguće produžiti token (TE) na neregistrovanom računu.',
  '100.350.400':
    'Neispravan ili nedostajući PIN (autentifikacija putem email-a/SMS-a/mikro depozita).',
  '100.350.500':
    'Nije moguće dobiti lični (virtuelni) račun - najverovatnije nema dostupnih računa.',
  '100.350.601':
    'Registraciji nije dozvoljeno referenciranje druge transakcije.',
  '100.350.602':
    'Registracija nije dozvoljena za migraciju ponavljajućeg plaćanja.',

  // Job scheduling and recurring payment errors
  '100.250.100': 'Posao ne sadrži informacije o izvršenju.',
  '100.250.105': 'Nevažeći ili nedostajući tip akcije.',
  '100.250.106': 'Nevažeća ili nedostajuća jedinica trajanja.',
  '100.250.107': 'Nevažeća ili nedostajuća jedinica obaveštenja.',
  '100.250.110': 'Nedostaje izvršenje posla.',
  '100.250.111': 'Nedostaje izraz posla.',
  '100.250.120':
    'Nevažeći parametri izvršenja, kombinacija nije u skladu sa standardom.',
  '100.250.121': 'Nevažeći parametri izvršenja, sat mora biti između 0 i 23.',
  '100.250.122':
    'Nevažeći parametri izvršenja, minut i sekunde moraju biti između 0 i 59.',
  '100.250.123':
    'Nevažeći parametri izvršenja, dan u mesecu mora biti između 1 i 31.',
  '100.250.124': 'Nevažeći parametri izvršenja, mesec mora biti između 1 i 12.',
  '100.250.125':
    'Nevažeći parametri izvršenja, dan u nedelji mora biti između 1 i 7.',
  '100.250.250': 'Nedostaje oznaka posla.',
  '100.360.201': 'Nepoznat tip rasporeda.',
  '100.360.300': 'Ne može se rasporediti (SD) neraspoređeni posao.',
  '100.360.303': 'Ne može se otkazati raspored (DS) neraspoređenog posla.',
  '100.360.400':
    'Modul za raspoređivanje nije konfigurisan za LIVE režim transakcije.',

  // Transaction reference and workflow errors
  '700.100.100': 'Referentni ID ne postoji.',
  '700.100.200': 'Referentni iznos se ne poklapa.',
  '700.100.300': 'Nevažeći iznos (verovatno prevelik).',
  '700.100.400':
    'Referentni metod plaćanja se ne poklapa sa zahtevanim metodom plaćanja.',
  '700.100.500':
    'Referentna valuta plaćanja se ne poklapa sa zahtevanom valutom plaćanja.',
  '700.100.600':
    'Referentni režim se ne poklapa sa zahtevanim režimom plaćanja.',
  '700.100.700': 'Referentna transakcija je neodgovarajućeg tipa.',
  '700.100.701':
    'Referencirana DB transakcija bez izričitog navođenja računa. Nije dozvoljeno korišćenje referenciranog računa.',
  '700.100.710': 'Unakrsno povezivanje dva stabla transakcija.',
  '700.300.100':
    'Referencirana transakcija ne može biti refundirana, naplaćena ili poništena (nevažeći tip).',
  '700.300.200': 'Referencirana transakcija je odbijena.',
  '700.300.300':
    'Referencirana transakcija ne može biti refundirana, naplaćena ili poništena (već je refundirana, naplaćena ili poništena).',
  '700.300.400':
    'Referencirana transakcija ne može biti naplaćena (dostignut je krajnji rok).',
  '700.300.500': 'Greška povraćaja sredstava (višestruki povraćaji).',
  '700.300.600':
    'Referencirana transakcija ne može biti refundirana ili poništena (vraćena je).',
  '700.300.700':
    'Referencirana transakcija ne može biti poništena (poništenje više nije moguće).',
  '700.300.800': 'Referencirana transakcija ne može biti poništena.',
  '700.400.000': 'Ozbiljna greška u toku rada (kontaktirajte podršku).',
  '700.400.100':
    'Nije moguće izvršiti naplatu (PA vrednost prekoračena, PA poništena ili nevažeći tok rada?).',
  '700.400.101':
    'Nije moguće izvršiti naplatu (nije podržano od strane sistema autorizacije).',
  '700.400.200':
    'Nije moguće izvršiti povraćaj sredstava (količina povraćaja prekoračena, transakcija poništena ili nevažeći tok rada?).',
  '700.400.300':
    'Nije moguće poništiti (već refundirano/poništeno, nevažeći tok rada ili prekoračen iznos).',
  '700.400.400':
    'Nije moguće izvršiti povraćaj sredstava (već je izvršen povraćaj ili nevažeći tok rada?).',
  '700.400.402':
    'Povraćaj sredstava može generisati samo interni platni sistem.',
  '700.400.410':
    'Nije moguće poništiti povraćaj sredstava (povraćaj je već poništen ili nevažeći tok rada?).',
  '700.400.411':
    'Nije moguće poništiti povraćaj sredstava ili nevažeći tok rada (drugi povraćaj).',
  '700.400.420':
    'Nije moguće poništiti povraćaj sredstava (ne postoji povraćaj ili nevažeći tok rada?).',
  '700.400.510':
    'Naplata zahteva najmanje jednu uspešnu transakciju tipa (PA).',
  '700.400.520':
    'Refundacija zahteva najmanje jednu uspešnu transakciju tipa (CP ili DB ili RB ili RC).',
  '700.400.530':
    'Poništenje zahteva najmanje jednu uspešnu transakciju tipa (CP ili DB ili RB ili PA).',
  '700.400.540':
    'Usaglašavanje zahteva najmanje jednu uspešnu transakciju tipa (CP ili DB ili RB).',
  '700.400.550':
    'Povraćaj sredstava zahteva najmanje jednu uspešnu transakciju tipa (CP ili DB ili RB).',
  '700.400.560':
    'Potvrda zahteva najmanje jednu uspešnu transakciju tipa (PA ili CP ili DB ili RB).',
  '700.400.561':
    'Potvrda na registraciji zahteva uspešnu registraciju u stanju "OTVORENO".',
  '700.400.562':
    'Potvrde su konfigurisane da ih generiše samo interni platni sistem.',
  '700.400.565':
    'Finalizacija zahteva najmanje jednu uspešnu transakciju tipa (PA ili DB).',
  '700.400.570': 'Nije moguće referencirati transakciju koja čeka/na čekanju.',
  '700.400.580': 'Nije moguće pronaći transakciju.',
  '700.400.590':
    'Rata zahteva najmanje jednu uspešnu transakciju tipa (DB ili PA).',
  '700.400.600':
    'Finalizacija zahteva najmanje jednu uspešnu transakciju tipa (IN, DB, PA ili CD).',
  '700.400.700': 'ID-ovi početnog i referentnog kanala se ne poklapaju.',
  '700.450.001': 'Nije moguće preneti novac sa jednog računa na isti račun.',
  '700.500.001': 'Referencirana sesija sadrži previše transakcija.',
  '700.500.002':
    'Naplata ili predautorizacija se pojavljuje prekasno u referenciranoj sesiji.',
  '700.500.003': 'Test nalozi nisu dozvoljeni u produkciji.',
  '700.500.004':
    'Nije moguće referencirati transakciju koja sadrži obrisane podatke o kupcu.',

  // Transaction validation and protocol errors
  '100.300.101':
    'Nevažeći test režim (molimo koristite LIVE ili INTEGRATOR_TEST ili CONNECTOR_TEST)',
  '100.300.200': 'ID transakcije je predugačak',
  '100.300.300': 'Nevažeći referentni ID',
  '100.300.400': 'Nedostajući ili nevažeći ID kanala',
  '100.300.401': 'Nedostajući ili nevažeći ID pošiljaoca',
  '100.300.402': 'Nedostajuća ili nevažeća verzija',
  '100.300.501': 'Nevažeći ID odgovora',
  '100.300.600': 'Nevažeće ili nedostajuće korisničko ime',
  '100.300.601': 'Nevažeća ili nedostajuća korisnička lozinka',
  '100.300.700': 'Nevažeća relevantnost',
  '100.300.701': 'Nevažeća relevantnost za dati tip plaćanja',

  // Frontend and authentication parameter errors
  '100.370.100': 'Transakcija je odbijena',
  '100.370.101': 'URL za odgovor nije postavljen u Transaction/Frontend',
  '100.370.102': 'Neispravan format URL-a za odgovor u Transaction/Frontend',
  '100.370.110': 'Transakcija mora biti izvršena za nemačku adresu',
  '100.370.111': 'Greška sistema (mogući netačni/nedostajući ulazni podaci)',
  '100.370.121': 'Nije definisan ili je nepoznat tip ECI-ja u autentifikaciji',
  '100.370.122':
    'Parametar sa null ključem dostavljen u 3DSecure autentifikaciji',
  '100.370.123':
    'Nije definisan ili je nepoznat tip verifikacije u 3DSecure autentifikaciji',
  '100.370.124': 'Nepoznat ključ parametra u 3DSecure autentifikaciji',
  '100.370.125':
    'Nevažeći 3DSecure Verification_ID. Mora imati Base64 kodiranje dužine manje ili jednake 4000 karaktera',
  '100.370.131':
    'Nije definisan ili je nepoznat tip autentifikacije u Transaction/Authentication@type',
  '100.370.132':
    'Nije definisan indikator rezultata Transaction/Authentication/resultIndicator',

  // Additional payment method errors
  '100.500.101': 'Nevažeći metod plaćanja',
  '100.500.201': 'Nevažeći tip plaćanja',
  '100.500.301': 'Nevažeći datum dospeća',
  '100.500.302': 'Nevažeći datum potpisa mandata',
  '100.500.303': 'Nevažeći ID mandata',
  '100.500.304': 'Nevažeći eksterni ID mandata',
  '100.600.500': 'Polje za namenu je predugačko',
  '100.900.500': 'Nevažeći režim ponavljanja',

  // XML and request format errors
  '200.100.101':
    'Nevažeća poruka zahteva. XML nije validan. XML mora biti url-enkodiran! Možda sadrži neenkodiran znak & ili slično.',
  '200.100.102':
    'Nevažeći zahtev. XML sadržaj nedostaje (XML string mora biti poslat u parametru "load")',
  '200.100.103': 'Nevažeća poruka zahteva. Zahtev sadrži strukturne greške',
  '200.100.150':
    'Transakcija višestrukog zahteva nije obrađena zbog naknadnih problema',
  '200.100.151': 'Višestruki zahtev je dozvoljen sa maksimalno 10 transakcija',
  '200.100.199':
    'Pogrešan Web interfejs / URL korišćen. Molimo proverite Tech Quick Start dokument, poglavlje 3.',
  '200.100.201':
    'Nevažeći Request/Transaction tag (nije prisutan ili je [delimično] prazan)',
  '200.100.300':
    'Nevažeći Request/Transaction/Payment tag (nije naveden kod ili je nevažeći)',
  '200.100.301':
    'Nevažeći Request/Transaction/Payment tag (nije prisutan ili je [delimično] prazan)',
  '200.100.302':
    'Nevažeći Request/Transaction/Payment/Presentation tag (nije prisutan ili je [delimično] prazan)',
  '200.100.401':
    'Nevažeći Request/Transaction/Account tag (nije prisutan ili je [delimično] prazan)',
  '200.100.402':
    'Nevažeći Request/Transaction/Account(Customer, Relevance) tag (jedan od Account/Customer/Relevance mora biti prisutan)',
  '200.100.403':
    'Nevažeći Request/Transaction/Analysis tag (Kriterijumi moraju imati ime i vrednost)',
  '200.100.404': 'Nevažeći Request/Transaction/Account (ne sme biti prisutan)',
  '200.100.501': 'Nevažeći ili nedostajući kupac',
  '200.100.502':
    'Nevažeći Request/Transaction/Customer/Name tag (nije prisutan ili je [delimično] prazan)',
  '200.100.503':
    'Nevažeći Request/Transaction/Customer/Contact tag (nije prisutan ili je [delimično] prazan)',
  '200.100.504':
    'Nevažeći Request/Transaction/Customer/Address tag (nije prisutan ili je [delimično] prazan)',
  '200.100.601':
    'Nevažeći Request/Transaction/(ApplePay|GooglePay|SamsungPay) tag (nije prisutan ili je [delimično] prazan)',
  '200.100.602':
    'Nevažeći Request/Transaction/(ApplePay|GooglePay|SamsungPay)/PaymentToken tag (nije prisutan ili je [delimično] prazan)',
  '200.100.603':
    'Nevažeći Request/Transaction/(ApplePay|GooglePay|SamsungPay)/PaymentToken tag (greška dešifrovanja)',
  '200.200.106': 'Dupla transakcija. Molimo proverite da li je UUID jedinstven',
  '200.300.403': 'Nevažeći HTTP metod',
  '200.300.404': 'Nevažeći ili nedostajući parametar',
  '200.300.405': 'Duplirani entitet',
  '200.300.406': 'Entitet nije pronađen',
  '200.300.407': 'Entitet nije dovoljno specifičan',

  // Additional authorization and authentication errors
  '800.900.100': 'Autorizacija pošiljaoca nije uspela',
  '800.900.101': 'Nevažeća email adresa (verovatno nevažeća sintaksa)',
  '800.900.200':
    'Nevažeći broj telefona (mora počinjati cifrom ili znakom "+", najmanje 7 i najviše 25 znakova)',
  '800.900.201': 'Nepoznat kanal',
  '800.900.300': 'Nevažeće informacije za autentifikaciju',
  '800.900.301':
    'Autorizacija korisnika nije uspela, korisnik nema dovoljno prava za obradu transakcije',
  '800.900.302': 'Autorizacija nije uspela',
  '800.900.303': 'Token nije kreiran',
  '800.900.399': 'Problem sa bezbednom registracijom',
  '800.900.401': 'Nevažeći IP broj',
  '800.900.450': 'Nevažeći datum rođenja',

  // Address validation errors
  '100.800.100': 'Zahtev ne sadrži ulicu',
  '100.800.101': 'Kombinacija ulice1 i ulice2 ne sme prelaziti 201 karakter',
  '100.800.102': 'Kombinacija ulice1 i ulice2 ne sme sadržati samo brojeve',
  '100.800.200': 'Zahtev ne sadrži poštanski broj',
  '100.800.201': 'Poštanski broj je predugačak',
  '100.800.202': 'Nevažeći poštanski broj',
  '100.800.300': 'Zahtev ne sadrži grad',
  '100.800.301': 'Grad je predugačak',
  '100.800.302': 'Nevažeći grad',
  '100.800.400': 'Nevažeća kombinacija države/zemlje',
  '100.800.401': 'Država je predugačka',
  '100.800.500': 'Zahtev ne sadrži zemlju',
  '100.800.501': 'Nevažeća zemlja',

  // Customer name and identity validation errors
  '100.700.100': 'Prezime kupca ne sme biti prazno',
  '100.700.101': 'Dužina prezimena kupca mora biti između 0 i 50 karaktera',
  '100.700.200': 'Ime kupca ne sme biti prazno',
  '100.700.201': 'Dužina imena kupca mora biti između 0 i 50 karaktera',
  '100.700.300': 'Nevažeći oslovljavanje',
  '100.700.400': 'Nevažeća titula',
  '100.700.500': 'Naziv kompanije je predugačak',
  '100.700.800': 'Identitet ne sadrži ili sadrži nevažeću "dokumentaciju"',
  '100.700.801':
    'Identitet ne sadrži ili sadrži nevažeću identifikacionu vrednost',
  '100.700.802': 'Identifikaciona vrednost je predugačka',
  '100.700.810': 'Navedite najmanje jedan identitet',

  // Customer contact information validation errors
  '100.900.100': 'Zahtev ne sadrži email adresu',
  '100.900.101': 'Nevažeća email adresa (verovatno nevažeća sintaksa)',
  '100.900.105': 'Email adresa je predugačka (maksimalno 50 karaktera)',
  '100.900.200':
    'Nevažeći broj telefona (mora počinjati cifrom ili znakom "+", najmanje 7 i najviše 25 znakova)',
  '100.900.300':
    'Nevažeći broj mobilnog telefona (mora počinjati cifrom ili znakom "+", najmanje 7 i najviše 25 znakova)',
  '100.900.301': 'Broj mobilnog telefona je obavezan',
  '100.900.400': 'Zahtev ne sadrži IP broj',
  '100.900.401': 'Nevažeći IP broj',
  '100.900.450': 'Nevažeći datum rođenja',

  // Payment account validation errors
  '100.100.100':
    'Zahtev ne sadrži podatke o kreditnoj kartici, broju bankovnog računa ili imenu banke',
  '100.100.101':
    'Nevažeća kreditna kartica, broj bankovnog računa ili ime banke',
  '100.100.104': 'Nevažeći jedinstveni ID / osnovni jedinstveni ID',
  '100.100.200': 'Zahtev ne sadrži mesec',
  '100.100.201': 'Nevažeći mesec',
  '100.100.300': 'Zahtev ne sadrži godinu',
  '100.100.301': 'Nevažeća godina',
  '100.100.303': 'Kartica je istekla',
  '100.100.304': 'Kartica još nije važeća',
  '100.100.305': 'Nevažeći format datuma isteka',
  '100.100.400': 'Zahtev ne sadrži vlasnika kreditne kartice/bankovnog računa',
  '100.100.401':
    'Ime vlasnika kreditne kartice/bankovnog računa je prekratko ili predugačko',
  '100.100.402': 'Ime vlasnika kreditne kartice/bankovnog računa nije važeće',
  '100.100.500': 'Zahtev ne sadrži brend kreditne kartice',
  '100.100.501': 'Nevažeći brend kreditne kartice',
  '100.100.600': 'Prazan CVV za VISA, MASTER, AMEX nije dozvoljen',
  '100.100.601': 'Nevažeća kombinacija CVV/brenda',
  '100.100.650':
    'Prazan broj izdavanja kreditne kartice za MAESTRO nije dozvoljen',
  '100.100.651': 'Nevažeći broj izdavanja kreditne kartice',
  '100.100.700': 'Nevažeća kombinacija broja kreditne kartice/brenda',
  '100.100.701': 'Sumnja na prevaru, ova kartica ne može biti procesirana',
  '100.200.100': 'Bankovni račun ne sadrži zemlju ili je zemlja nevažeća',
  '100.200.103':
    'Bankovni račun ima nevažeću kombinaciju koda banke/imena i broja računa',
  '100.200.104': 'Bankovni račun ima nevažeći format broja računa',
  '100.200.200':
    'Bankovni račun mora prvo biti registrovan i potvrđen. Zemlja zahteva mandat',
  '100.210.101': 'Virtuelni račun ne sadrži ID ili je ID nevažeći',
  '100.210.102': 'Virtuelni račun ne sadrži brend ili je brend nevažeći',
  '100.211.101': 'Korisnički račun ne sadrži ID ili je ID nevažeći',
  '100.211.102': 'Korisnički račun ne sadrži brend ili je brend nevažeći',
  '100.211.103': 'Nije definisana lozinka za korisnički račun',
  '100.211.104':
    'Lozinka ne ispunjava sigurnosne zahteve (potrebno najmanje 8 znakova i mora sadržati slova i brojeve)',
  '100.211.105': 'ID novčanika mora biti važeća email adresa',
  '100.211.106': 'ID vaučera mora uvek imati 32 cifre',
  '100.212.101': 'Registracija računa novčanika ne sme imati početni saldo',
  '100.212.102': 'Račun novčanika ne sadrži brend ili je brend nevažeći',
  '100.212.103':
    'Transakcija plaćanja novčanikom mora referencirati registraciju',

  // Amount and currency validation errors
  '100.550.300': 'Zahtev ne sadrži iznos ili je iznos prenizak',
  '100.550.301': 'Iznos je prevelik',
  '100.550.303': 'Format iznosa je nevažeći (dozvoljene su samo dve decimale)',
  '100.550.310': 'Iznos premašuje limit za registrovani račun',
  '100.550.311': 'Premašen je dostupni saldo računa',
  '100.550.312': 'Iznos je izvan dozvoljenih granica veličine tiketa',
  '100.550.400': 'Zahtev ne sadrži valutu',
  '100.550.401': 'Nevažeća valuta',
  '100.550.601': 'Rizični iznos je prevelik',
  '100.550.603':
    'Format rizičnog iznosa je nevažeći (dozvoljene su samo dve decimale)',
  '100.550.605':
    'Rizični iznos je manji od iznosa (mora biti jednak ili veći od iznosa)',
  '100.550.701': 'Iznosi se ne poklapaju',
  '100.550.702': 'Valute se ne poklapaju',

  // Risk management validation errors
  '100.380.101': 'Transakcija ne sadrži deo za upravljanje rizikom',
  '100.380.201': 'Nije naveden tip procesa za upravljanje rizikom',
  '100.380.305': 'Nedostaju informacije o frontend-u za asinhronu transakciju',
  '100.380.306':
    'Nisu dostavljeni podaci o autentifikaciji u transakciji za upravljanje rizikom',

  // General error and chargeback codes
  '000.100.200': 'Razlog nije naveden',
  '000.100.201': 'Podaci o računu ili banci su netačni',
  '000.100.202': 'Račun je zatvoren',
  '000.100.203': 'Nedovoljno sredstava',
  '000.100.204': 'Mandat nije važeći',
  '000.100.205': 'Mandat je otkazan',
  '000.100.206': 'Opoziv ili osporavanje',
  '000.100.207': 'Otkazivanje u mreži za kliring',
  '000.100.208': 'Račun je blokiran',
  '000.100.209': 'Račun ne postoji',
  '000.100.210': 'Nevažeći iznos',
  '000.100.211':
    'Transakcija uspešna (iznos transakcije je manji od iznosa predautorizacije)',
  '000.100.212':
    'Transakcija uspešna (iznos transakcije je veći od iznosa predautorizacije)',
  '000.100.220': 'Fraudulentna transakcija',
  '000.100.221': 'Roba nije primljena',
  '000.100.222': 'Transakcija nije prepoznata od strane vlasnika kartice',
  '000.100.223': 'Usluga nije izvršena',
  '000.100.224': 'Duplo procesiranje',
  '000.100.225': 'Kredit nije obrađen',
  '000.100.226': 'Ne može biti naplaćeno',
  '000.100.227': 'Problem sa konfiguracijom',
  '000.100.228': 'Privremena greška u komunikaciji - Pokušajte ponovo',
  '000.100.229': 'Netačna uputstva',
  '000.100.230': 'Neovlašćena naplata',
  '000.100.231': 'Kasno ponovno podnošenje',
  '000.100.232': 'Prenos odgovornosti',
  '000.100.233': 'Povraćaj sredstava vezan za autorizaciju',
  '000.100.234': 'Roba nije primljena',
  '000.100.299': 'Nespecificirano (Tehnički problem)',
}
