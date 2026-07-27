import { Venue, BookingRequest } from '../types';

export const INITIAL_VENUES: Venue[] = [
  {
    id: 'v1',
    name: 'Dwór Parkowy Krowodrza',
    category: 'Dom Weselny & Karczma',
    city: 'Kraków',
    region: 'Małopolskie',
    address: 'ul. Parkowa 12, Kraków',
    rating: 4.9,
    reviewCount: 128,
    maxGuests: 180,
    minGuests: 40,
    priceFrom: 220,
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Elegancki dwór otoczony starym parkiem. Doskonałe miejsce na wesela, komunie i jubileusze. Oferujemy wyśmienitą kuchnię polską oraz pełną obsługę dekoratorską.',
    amenities: ['Klimatyzacja', 'Ogród / Taras', 'Noclegi dla 40 osób', 'Parking 80 aut', 'Scena dla zespołu / DJ', 'Plac zabaw dla dzieci'],
    contactPhone: '+48 12 430 99 88',
    contactEmail: 'rezerwacje@dworparkowy.pl',
    managerId: 'mgr1',
    cancellationPolicy: 'Bezpłatna anulacja do 30 dni przed terminem imprezy.',
    blockedDates: ['2026-08-01', '2026-08-15'],
    availableDates: ['2026-08-08', '2026-08-22', '2026-08-29', '2026-09-05', '2026-09-12', '2026-09-19', '2026-10-03'],
    packages: [
      {
        id: 'p1-srebrny',
        name: 'Pakiet Klasyczny',
        pricePerPerson: 220,
        minGuests: 40,
        durationHours: 8,
        depositPercent: 20,
        features: ['Obiad 2-daniowy', 'Zimny bufet (6 przekąsek)', 'Napoje ciepłe i zimne bez limitu', 'Klimatyzowana sala', 'Parking dla gości'],
        menu: [
          { category: 'Zupa', name: 'Rosół królewski z domowym makaronem' },
          { category: 'Danie Główne', name: 'Tradcyjna pieczeń wieprzowa w sosie własnym, ziemniaki z koperkiem, bukiet surówek' },
          { category: 'Zimna Płyta', name: 'Półmisek wędlin staropolskich, deska serów zagrodowych, śledzie w śmietanie' },
          { category: 'Desery & Tort', name: 'Pucharki lodowe z owocami i bita śmietaną' },
          { category: 'Napoje', name: 'Soki owocowe, woda mineralna z cytryną, kawa z ekspresu, wybór herbat' }
        ]
      },
      {
        id: 'p1-zloty',
        name: 'Pakiet Złoty (Rekomendowany)',
        pricePerPerson: 280,
        minGuests: 50,
        durationHours: 10,
        depositPercent: 20,
        features: ['Obiad 3-daniowy', 'Zimny bufet Premium', '2 dania gorące nocne', 'Tort weselny/okolicznościowy w cenie', 'Napoje bez limitu + wiejski stół'],
        menu: [
          { category: 'Zupa', name: 'Krem z borowików z groszkiem ptysiowym lub rosół' },
          { category: 'Danie Główne', name: 'Polędwiczki wieprzowe w sosie kurkowym + pierś z kaczki z żurawiną, kopytka, buraczki' },
          { category: 'Zimna Płyta', name: 'Łosoś w galarecie, tatar wołowy, sałatka jarzynowa, mięsa pieczone, pikle' },
          { category: 'Dania Gorące Nocne', name: 'Barszcz czerwony z krokietem, płonąca kitka wieprzowa' },
          { category: 'Desery & Tort', name: 'Tort trzypiętrowy smaku truskawkowym / czekoladowym + candy bar' },
          { category: 'Napoje', name: 'Soki tłoczone, woda, napoje gazowane, kawa premium, herbaty ziołowe' }
        ]
      },
      {
        id: 'p1-platyna',
        name: 'Pakiet VIP Platynowy',
        pricePerPerson: 350,
        minGuests: 60,
        durationHours: 12,
        depositPercent: 25,
        features: ['Wszystko z Pakietu Złotego', 'Nocleg dla Pary Młodej / Jubilata gratis', 'Drink bar z barmanem na 4h', 'Ogród z grillem live-cooking'],
        menu: [
          { category: 'Zupa', name: 'Konsommé wołowe z pierożkami faszerowanymi dziczyzną' },
          { category: 'Danie Główne', name: 'Stek z polędwicy wołowej z masełkiem ziołowym i pieczonymi ziemniakami fondant' },
          { category: 'Zimna Płyta', name: 'Krewetki na maśle czosnkowym, deska wędlin dojrzewających, carpaccio z buraka' },
          { category: 'Dania Gorące Nocne', name: 'Strogonow wołowy, żurek staropolski na wędzonce' },
          { category: 'Desery & Tort', name: 'Customized Cake Design + Monodesery artystyczne' },
          { category: 'Napoje', name: 'Full Open Bar bezalkoholowy i alkoholowy wg ustaleń' }
        ]
      }
    ]
  },
  {
    id: 'v2',
    name: 'Rezydencja Cristal & Spa',
    category: 'Hotel **** & Sala Bankietowa',
    city: 'Warszawa',
    region: 'Mazowieckie',
    address: 'ul. Wał Miedzeszyński 200, Warszawa',
    rating: 4.8,
    reviewCount: 94,
    maxGuests: 250,
    minGuests: 50,
    priceFrom: 260,
    images: [
      'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Nowoczesna sala bankietowa ze szklanymi ścianami i widokiem na zielone tereny. Oferujemy najwyższy standard obsługi, kryształowe żyrandole oraz zaplecze hotelowe ze Spa.',
    amenities: ['Klimatyzacja strefowa', 'Ogród z oczkiem wodnym', 'Hotel 60 pokoi', 'Parking 120 aut', 'Oświetlenie LED RGB', 'Winda dla niepełnosprawnych'],
    contactPhone: '+48 22 890 11 22',
    contactEmail: 'eventy@cristalhotel.pl',
    managerId: 'mgr2',
    cancellationPolicy: 'Zaliczka zwrotna do 45 dni przed wydarzeniem.',
    blockedDates: ['2026-08-08', '2026-08-22'],
    availableDates: ['2026-08-01', '2026-08-15', '2026-08-29', '2026-09-05', '2026-09-12', '2026-09-26'],
    packages: [
      {
        id: 'p2-srebrny',
        name: 'Pakiet Silver Business / Family',
        pricePerPerson: 260,
        minGuests: 40,
        durationHours: 8,
        depositPercent: 20,
        features: ['Wykwintny obiad 3-daniowy', 'Zimna płyta 8 pozycji', 'Open bar bezalkoholowy', 'Strefa foto z tłem ścianki'],
        menu: [
          { category: 'Zupa', name: 'Aromatyczna zupa krem z pieczonej papryki i pomidorów z batatami' },
          { category: 'Danie Główne', name: 'Filet z kurczaka supreme w sosie kurkowym, ziemniaki gratin, baby marchewka' },
          { category: 'Zimna Płyta', name: 'Tortille z łososiem i szpinakiem, deska serów pleśniowych, minitarty z ciasta francuskiego' },
          { category: 'Desery & Tort', name: 'Panna cotta z musem malinowym, mini serniczki' },
          { category: 'Napoje', name: 'Kawa z ekspresu kolbowego, selekcja herbat Richmont, soki 100%' }
        ]
      },
      {
        id: 'p2-zloty',
        name: 'Pakiet Gold Gala',
        pricePerPerson: 320,
        minGuests: 60,
        durationHours: 10,
        depositPercent: 20,
        features: ['Obiad serwowany 4-daniowy', 'Bogatki bufet zimny & ciepły', '2 dania nocne', 'Prosecco welcome drink dla każdego'],
        menu: [
          { category: 'Zupa', name: 'Krem z białych warzyw z oliwą truflową i chipsami z jarmużu' },
          { category: 'Danie Główne', name: 'Polędwica wieprzowa sous-vide w sosie z zielonego pieprzu, gnocchi szpinakowe' },
          { category: 'Zimna Płyta', name: 'Carpaccio z łososia, tatar z tuńczyka, szaszłyki z rozmarynem, sałatka cezar z krewetkami' },
          { category: 'Dania Gorące Nocne', name: 'Boeuf Bourguignon, zupa tajska z kurczakiem' },
          { category: 'Desery & Tort', name: 'Autorski tort musowy + stół ze słodkościami (Candy Bar)' },
          { category: 'Napoje', name: 'Soki, napoje gazowane, nielimitowane napoje gorące, powitalny kieliszek Prosecco' }
        ]
      }
    ]
  },
  {
    id: 'v3',
    name: 'Willa Marina nad Morzem',
    category: 'Restauracja & Ogród',
    city: 'Gdańsk',
    region: 'Pomorskie',
    address: 'ul. Nadmorska 5, Gdańsk Jelitkowo',
    rating: 4.9,
    reviewCount: 86,
    maxGuests: 120,
    minGuests: 25,
    priceFrom: 195,
    images: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Niezwykłe miejsce zaledwie 100 metrów od plaży. Wyjątkowy klimat morski, świeże ryby, styl morski boho oraz przepiękny taras na zachody słońca.',
    amenities: ['Widok na morze / Taras', 'Klimatyzacja', 'Plażowa strefa chillout', 'Noclegi 20 pokoi', 'Parking dla gości', 'Zgoda na zwierzęta'],
    contactPhone: '+48 58 555 22 11',
    contactEmail: 'kontakt@willamarina.pl',
    managerId: 'mgr3',
    cancellationPolicy: 'Elastyczne warunki anulacji z możliwością przełożenia terminu.',
    blockedDates: ['2026-08-15'],
    availableDates: ['2026-08-01', '2026-08-08', '2026-08-22', '2026-08-29', '2026-09-05', '2026-09-12'],
    packages: [
      {
        id: 'p3-boho',
        name: 'Pakiet Morska Bryza',
        pricePerPerson: 195,
        minGuests: 25,
        durationHours: 7,
        depositPercent: 15,
        features: ['Menu rybne lub mięsne', 'Grill na tarasie', 'Welcome drink (Lemonade / Spritz)', 'Muzyka z nagłośnienia'],
        menu: [
          { category: 'Zupa', name: 'Kremowa zupa rybna z dorszem i nutą trawy cytrynowej' },
          { category: 'Danie Główne', name: 'Filet z łososia na parze z sos z pieczonego czosnku, pieczone ziemniaczki' },
          { category: 'Zimna Płyta', name: 'Śledziki po kaszubsku, tartinki z pastą z wędzonego makreli, sałatka grecka' },
          { category: 'Desery & Tort', name: 'Szarlotka na ciepło z lodami waniliowymi' },
          { category: 'Napoje', name: 'Domowa lemodada cytrusowa, woda z miętą, kawa i herbata' }
        ]
      },
      {
        id: 'p3-premium',
        name: 'Pakiet Zachód Słońca VIP',
        pricePerPerson: 250,
        minGuests: 35,
        durationHours: 9,
        depositPercent: 20,
        features: ['Obiad 3-daniowy', 'Bufet owoców morza', 'Live cooking grilla', 'Leżaki i strefa chillout na plaży'],
        menu: [
          { category: 'Zupa', name: 'Chłodnik litewski z jajkiem i krewetkami' },
          { category: 'Danie Główne', name: 'Stek z miętusa w panierce ziołowej + grillowana karkówka w marynacie miodowej' },
          { category: 'Zimna Płyta', name: 'Deska serów regionalnych pomorskich, kalmary w chrupiącym cieście, sałatka z melonem i prosciutto' },
          { category: 'Dania Gorące Nocne', name: 'Barszczyk czerwony z pasztecikiem rybnym lub mięsnym' },
          { category: 'Desery & Tort', name: 'Tort bezowy z malinami i marakują' },
          { category: 'Napoje', name: 'Open bar bezalkoholowy, kawa, herbaty, soki fresh' }
        ]
      }
    ]
  },
  {
    id: 'v4',
    name: 'Pałac Pod Różami',
    category: 'Pałac & Park',
    city: 'Wrocław',
    region: 'Dolnośląskie',
    address: 'ul. Pałacowa 1, Kobierzyce / Wrocław',
    rating: 5.0,
    reviewCount: 142,
    maxGuests: 300,
    minGuests: 60,
    priceFrom: 290,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'XIX-wieczny zabytkowy pałac z francuskim parkiem i fontanną. Ekskluzywne wnętrza na bajkowe wesela i wielkie gale firmowe.',
    amenities: ['Zabytkowy Park 5ha', 'Klimatyzowane Sale Pałacowe', 'Apartament dla Pary Młodej', 'Parking 150 aut', 'Lądowisko dla śmigłowców'],
    contactPhone: '+48 71 340 88 00',
    contactEmail: 'biuro@palacpodrozami.pl',
    managerId: 'mgr4',
    cancellationPolicy: 'Anulacja zgodnie z warunkami umowy pałacowej.',
    blockedDates: ['2026-08-01', '2026-08-08'],
    availableDates: ['2026-08-15', '2026-08-22', '2026-08-29', '2026-09-05', '2026-09-12'],
    packages: [
      {
        id: 'p4-krolewski',
        name: 'Pakiet Królewski Pałacowy',
        pricePerPerson: 290,
        minGuests: 60,
        durationHours: 10,
        depositPercent: 20,
        features: ['Obiad 4-daniowy serwowany', 'Pokaz sztucznych ogni / zimnych ogni', 'Czerwony dywan i powitanie Prosecco', 'Opiekun wydarzenia'],
        menu: [
          { category: 'Zupa', name: 'Krem z prawdziwków z łezką śmietany i oliwą truflową' },
          { category: 'Danie Główne', name: 'Pieczone udo kaczki w jabłkach i majeranku, pyzy drożdżowe, modra kapusta' },
          { category: 'Zimna Płyta', name: 'Pasztet z dzika z konfiturą z żurawiny, wędzone wędliny pałacowe, roladki ze szpinakiem' },
          { category: 'Dania Gorące Nocne', name: 'Zupa gulaszowa po węgiersku, zrazy wołowe w sosie grzybowym' },
          { category: 'Desery & Tort', name: 'Tort angielski z dekoracją z żywych róż' },
          { category: 'Napoje', name: 'Soki tłoczone z pałacowego sadu, woda, kawa, selekcja herbat' }
        ]
      }
    ]
  },
  {
    id: 'vL1',
    name: 'Restauracja Zacisze Leszno',
    category: 'Restauracja & Ogród Zimowy',
    city: 'Leszno',
    region: 'Wielkopolskie',
    address: 'ul. Cicha 4, Leszno',
    rating: 4.7,
    reviewCount: 45,
    maxGuests: 40,
    minGuests: 15,
    priceFrom: 160,
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Kameralna restauracja w sercu Leszna, idealna na małe przyjęcia rodzinne i obiady poślubne. Ogród zimowy zapewnia klimat o każdej porze roku.',
    amenities: ['Ogród zimowy', 'Klimatyzacja', 'Parking', 'Muzyka w tle'],
    contactPhone: '+48 65 520 12 34',
    contactEmail: 'kontakt@zaciszeleszno.pl',
    managerId: 'mgrL1',
    cancellationPolicy: 'Bezpłatna anulacja do 14 dni przed terminem.',
    blockedDates: ['2026-08-10'],
    availableDates: ['2026-08-01', '2026-08-15', '2026-08-22'],
    packages: [
      {
        id: 'pL1-standard',
        name: 'Pakiet Rodzinny',
        pricePerPerson: 160,
        minGuests: 15,
        durationHours: 6,
        depositPercent: 10,
        features: ['Obiad 2-daniowy', 'Deser', 'Napoje ciepłe bez limitu'],
        menu: []
      }
    ]
  },
  {
    id: 'vL2',
    name: 'Winiarnia Pod Starą Lipą',
    category: 'Winiarnia & Bistro',
    city: 'Leszno',
    region: 'Wielkopolskie',
    address: 'ul. Stare Miasto 12, Leszno',
    rating: 4.9,
    reviewCount: 32,
    maxGuests: 25,
    minGuests: 10,
    priceFrom: 180,
    images: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Wyjątkowe, piwniczne wnętrza z cegły. Specjalizujemy się w kolacjach degustacyjnych i kameralnych jubileuszach w stylu slow-food.',
    amenities: ['Klimatyczne piwnice', 'Sommelier na życzenie', 'Catering autorski'],
    contactPhone: '+48 65 529 88 77',
    contactEmail: 'wino@podstaralipa.pl',
    managerId: 'mgrL2',
    cancellationPolicy: 'Zaliczka bezzwrotna.',
    blockedDates: [],
    availableDates: ['2026-08-07', '2026-08-14', '2026-08-21'],
    packages: [
      {
        id: 'pL2-wino',
        name: 'Wieczór z Winem',
        pricePerPerson: 220,
        minGuests: 10,
        durationHours: 5,
        depositPercent: 20,
        features: ['Degustacja 5 win', 'Przekąski tapas', 'Danie główne'],
        menu: []
      }
    ]
  },
  {
    id: 'vL3',
    name: 'Bistro Klimat',
    category: 'Restauracja Nowoczesna',
    city: 'Rydzyna',
    region: 'Wielkopolskie',
    address: 'Rynek 15, Rydzyna',
    rating: 4.6,
    reviewCount: 58,
    maxGuests: 35,
    minGuests: 12,
    priceFrom: 145,
    images: [
      'https://images.unsplash.com/photo-1550966842-30c29a0d0613?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Nowoczesne bistro tuż przy Zamku w Rydzynie. Jasne wnętrza, dużo roślin i świeże, lokalne produkty.',
    amenities: ['Widok na zamek', 'Taras letni', 'Wi-Fi'],
    contactPhone: '+48 65 526 11 22',
    contactEmail: 'biuro@bistroklimat.pl',
    managerId: 'mgrL3',
    cancellationPolicy: 'Możliwość zmiany terminu do 7 dni przed.',
    blockedDates: ['2026-08-15'],
    availableDates: ['2026-08-08', '2026-08-22', '2026-08-29'],
    packages: [
      {
        id: 'pL3-bistro',
        name: 'Lekki Event',
        pricePerPerson: 145,
        minGuests: 12,
        durationHours: 4,
        depositPercent: 15,
        features: ['Bufet sałatkowy', '2 dania ciepłe', 'Lemoniada'],
        menu: []
      }
    ]
  },
  {
    id: 'vL4',
    name: 'Gościniec Wielkopolski',
    category: 'Karczma & Noclegi',
    city: 'Święciechowa',
    region: 'Wielkopolskie',
    address: 'ul. Leszczyńska 2, Święciechowa',
    rating: 4.5,
    reviewCount: 76,
    maxGuests: 60,
    minGuests: 20,
    priceFrom: 130,
    images: [
      'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Tradycyjna gościnność i staropolska kuchnia. Idealne miejsce na chrzciny i komunie w domowej atmosferze.',
    amenities: ['Noclegi', 'Plac zabaw', 'Duży parking'],
    contactPhone: '+48 65 533 00 11',
    contactEmail: 'gosciniec@swieciechowa.pl',
    managerId: 'mgrL4',
    cancellationPolicy: 'Zwrot zaliczki przy anulacji 30 dni przed.',
    blockedDates: ['2026-08-16'],
    availableDates: ['2026-08-02', '2026-08-09', '2026-08-23'],
    packages: [
      {
        id: 'pL4-tradycja',
        name: 'Pakiet Biesiadny',
        pricePerPerson: 130,
        minGuests: 20,
        durationHours: 8,
        depositPercent: 10,
        features: ['Obiad staropolski', 'Wiejski stół', 'Ciasta domowe'],
        menu: []
      }
    ]
  },
  {
    id: 'vL5',
    name: 'Kawiarnia & Restauracja Retro',
    category: 'Restauracja Stylowa',
    city: 'Leszno',
    region: 'Wielkopolskie',
    address: 'ul. Słowiańska 22, Leszno',
    rating: 4.8,
    reviewCount: 67,
    maxGuests: 30,
    minGuests: 8,
    priceFrom: 175,
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Wnętrza inspirowane latami 20. XX wieku. Eleganckie miejsce na kameralne spotkania przy muzyce jazzowej i wykwintnej kawie.',
    amenities: ['Pianino', 'Klimatyzacja', 'VIP Room'],
    contactPhone: '+48 65 520 77 66',
    contactEmail: 'retro@leszno.pl',
    managerId: 'mgrL5',
    cancellationPolicy: 'Indywidualne ustalenia.',
    blockedDates: [],
    availableDates: ['2026-08-05', '2026-08-12', '2026-08-19'],
    packages: [
      {
        id: 'pL5-retro',
        name: 'Stylowe Spotkanie',
        pricePerPerson: 175,
        minGuests: 8,
        durationHours: 5,
        depositPercent: 20,
        features: ['Finger foods', 'Danie główne', 'Barista service'],
        menu: []
      }
    ]
  },
  {
    id: 'vL6',
    name: 'Karczma U Sołtysa',
    category: 'Restauracja Regionalna',
    city: 'Wilkowice',
    region: 'Wielkopolskie',
    address: 'ul. Główna 45, Wilkowice',
    rating: 4.4,
    reviewCount: 89,
    maxGuests: 50,
    minGuests: 20,
    priceFrom: 120,
    images: [
      'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Swojskie jadło w najlepszym wydaniu. Organizujemy biesiady z pieczonym prosiakiem i lokalnymi trunkami.',
    amenities: ['Altana grillowa', 'Muzyka na żywo', 'Miejsce na ognisko'],
    contactPhone: '+48 65 528 22 33',
    contactEmail: 'karczma@wilkowice.pl',
    managerId: 'mgrL6',
    cancellationPolicy: 'Elastyczna.',
    blockedDates: ['2026-08-20'],
    availableDates: ['2026-08-01', '2026-08-15', '2026-08-29'],
    packages: [
      {
        id: 'pL6-biesiada',
        name: 'Pakiet Swojski',
        pricePerPerson: 120,
        minGuests: 20,
        durationHours: 10,
        depositPercent: 10,
        features: ['Dania z grilla', 'Przekąski regionalne', 'Piwo rzemieślnicze'],
        menu: []
      }
    ]
  },
  {
    id: 'vL7',
    name: 'Sekrety Kuchni - Restauracja Butikowa',
    category: 'Fine Dining',
    city: 'Leszno',
    region: 'Wielkopolskie',
    address: 'ul. Narutowicza 5, Leszno',
    rating: 4.9,
    reviewCount: 28,
    maxGuests: 20,
    minGuests: 6,
    priceFrom: 280,
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Kameralna restauracja typu fine dining. Tylko kilka stolików, autorskie menu szefa kuchni i najwyższa jakość składników.',
    amenities: ['Osobisty kelner', 'Menu degustacyjne', 'Selekcja win'],
    contactPhone: '+48 65 525 44 33',
    contactEmail: 'sekrety@kuchnia.pl',
    managerId: 'mgrL7',
    cancellationPolicy: 'Płatność z góry przy rezerwacji.',
    blockedDates: [],
    availableDates: ['2026-08-06', '2026-08-13', '2026-08-20'],
    packages: [
      {
        id: 'pL7-gourmet',
        name: 'Sekretny Wieczór',
        pricePerPerson: 350,
        minGuests: 6,
        durationHours: 4,
        depositPercent: 100,
        features: ['Menu 7 dań', 'Pairing win', 'Spotkanie z szefem'],
        menu: []
      }
    ]
  },
  {
    id: 'vL8',
    name: 'Rezydencja Małe Leszno',
    category: 'Apartamenty & Eventy',
    city: 'Leszno',
    region: 'Wielkopolskie',
    address: 'ul. Leśna 1, Leszno (Grzybowo)',
    rating: 4.7,
    reviewCount: 41,
    maxGuests: 45,
    minGuests: 15,
    priceFrom: 190,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Elegancka willa położona na obrzeżach miasta. Oferuje prywatność, piękny ogród i luksusowe warunki na wyłączność.',
    amenities: ['Basen letni', 'Ogród z leżakami', 'Apartamenty', 'Sauna'],
    contactPhone: '+48 65 527 00 99',
    contactEmail: 'rezydencja@maleleszno.pl',
    managerId: 'mgrL8',
    cancellationPolicy: 'Anulacja do 60 dni bez kosztów.',
    blockedDates: ['2026-08-08', '2026-08-09'],
    availableDates: ['2026-08-01', '2026-08-15', '2026-08-22'],
    packages: [
      {
        id: 'pL8-willa',
        name: 'Garden Party VIP',
        pricePerPerson: 190,
        minGuests: 15,
        durationHours: 12,
        depositPercent: 25,
        features: ['Bufet BBQ', 'Nocleg dla 10 osób', 'Basen'],
        menu: []
      }
    ]
  },
  {
    id: 'vL9',
    name: 'Smaki Regionu',
    category: 'Sala Bankietowa Intymna',
    city: 'Leszno',
    region: 'Wielkopolskie',
    address: 'ul. Poznańska 88, Leszno',
    rating: 4.3,
    reviewCount: 52,
    maxGuests: 55,
    minGuests: 20,
    priceFrom: 135,
    images: [
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Nowoczesna, mniejsza sala bankietowa z oddzielnym wejściem. Idealna na kameralne wesela i jubileusze z parkietem do tańca.',
    amenities: ['Nagłośnienie', 'Efekty świetlne', 'Barek kawowy'],
    contactPhone: '+48 65 524 11 00',
    contactEmail: 'biuro@smakiregionu.pl',
    managerId: 'mgrL9',
    cancellationPolicy: 'Standardowa.',
    blockedDates: ['2026-08-22'],
    availableDates: ['2026-08-01', '2026-08-08', '2026-08-15'],
    packages: [
      {
        id: 'pL9-wesele',
        name: 'Mini Wesele',
        pricePerPerson: 165,
        minGuests: 30,
        durationHours: 10,
        depositPercent: 15,
        features: ['Pełne menu', 'Dekoracje', 'DJ Service'],
        menu: []
      }
    ]
  },
  {
    id: 'vL10',
    name: 'Restauracja Liliowa',
    category: 'Restauracja Nad Jeziorem',
    city: 'Osieczna',
    region: 'Wielkopolskie',
    address: 'ul. Jeziorna 3, Osieczna',
    rating: 4.8,
    reviewCount: 63,
    maxGuests: 50,
    minGuests: 15,
    priceFrom: 185,
    images: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Malowniczo położona restauracja z widokiem na Jezioro Łoniewskie. Specjalność to kuchnia lekka i sezonowa oraz przyjęcia na tarasie.',
    amenities: ['Widok na jezioro', 'Pomost', 'Taras', 'Klimatyzacja'],
    contactPhone: '+48 65 532 55 44',
    contactEmail: 'biuro@liliowa.pl',
    managerId: 'mgrL10',
    cancellationPolicy: 'Możliwość anulacji do 21 dni.',
    blockedDates: ['2026-08-15'],
    availableDates: ['2026-08-01', '2026-08-08', '2026-08-22'],
    packages: [
      {
        id: 'pL10-lato',
        name: 'Letnie Przyjęcie',
        pricePerPerson: 185,
        minGuests: 15,
        durationHours: 7,
        depositPercent: 20,
        features: ['Obiad sezonowy', 'Taras na wyłączność', 'Spritz bar'],
        menu: []
      }
    ]
  },
];

export const INITIAL_BOOKINGS: BookingRequest[] = [
  {
    id: 'b101',
    venueId: 'v1',
    venueName: 'Dwór Parkowy Krowodrza',
    venueImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
    clientName: 'Katarzyna Nowak',
    clientEmail: 'katarzyna.nowak@gmail.com',
    clientPhone: '+48 601 234 567',
    eventType: 'wesele',
    date: '2026-08-22',
    guestsCount: 95,
    packageId: 'p1-zloty',
    packageName: 'Pakiet Złoty (Rekomendowany)',
    pricePerGuest: 280,
    estimatedTotal: 26600,
    depositAmount: 5320,
    status: 'Oczekuje',
    createdAt: '2026-07-26T14:30:00Z',
    specialRequests: 'Prosimy o stolik dla dzieci z animatorem oraz 5 posiłków wegetariańskich.'
  },
  {
    id: 'b102',
    venueId: 'v2',
    venueName: 'Rezydencja Cristal & Spa',
    venueImage: 'https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=1000&q=80',
    clientName: 'Piotr Wiśniewski',
    clientEmail: 'piotr.wisniewski@firmacorp.pl',
    clientPhone: '+48 502 987 654',
    eventType: 'firmowa',
    date: '2026-09-12',
    guestsCount: 120,
    packageId: 'p2-zloty',
    packageName: 'Pakiet Gold Gala',
    pricePerGuest: 320,
    estimatedTotal: 38400,
    depositAmount: 7680,
    status: 'Potwierdzona',
    createdAt: '2026-07-24T09:15:00Z',
    venueResponseNote: 'Rezerwacja zaakceptowana! Przesłaliśmy fakturę proforma na zaliczkę mailowo.'
  },
  {
    id: 'b103',
    venueId: 'v3',
    venueName: 'Willa Marina nad Morzem',
    venueImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=80',
    clientName: 'Anna Kowalska',
    clientEmail: 'ania.kowalska@o2.pl',
    clientPhone: '+48 790 111 222',
    eventType: 'chrzciny',
    date: '2026-08-08',
    guestsCount: 30,
    packageId: 'p3-boho',
    packageName: 'Pakiet Morska Bryza',
    pricePerGuest: 195,
    estimatedTotal: 5850,
    depositAmount: 877.5,
    status: 'Oczekuje',
    createdAt: '2026-07-27T06:10:00Z',
    specialRequests: 'Potrzebne 2 krzesełka dla niemowląt i kącik do przewijania.'
  }
];
