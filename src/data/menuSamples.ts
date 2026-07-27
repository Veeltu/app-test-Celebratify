import { MenuItem, MenuModifierGroup, MenuDishChoiceGroup } from '../types';

/** Stock food photos (Unsplash) for menu cards */
export const MENU_IMG = {
  soup: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80',
  main: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
  salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80',
  dessert: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
  drink: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80',
  fish: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80',
  night: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80',
  pasta: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=400&q=80',
  steak: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=400&q=80',
  vegan: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80',
};

const PIEROGI_IMG =
  'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80';

/** Warianty zdjęć deserów (Unsplash) */
const DESSERT_IMG = {
  cake: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
  ice: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=400&q=80',
  parfait: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80',
  chocolate: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80',
  cheesecake: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80',
  apple: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=400&q=80',
  fruit: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=400&q=80',
  tiramisu: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=400&q=80',
};

/** Wspólne grupy dodatków — restauracja proponuje wybór przy daniu */
const OPT_BEZ_DODATKOW = {
  id: 'bez-dodatkow',
  label: 'Bez dodatków',
  clearsOthers: true as const,
};

export const MOD_DODATEK_GLOWNE: MenuModifierGroup = {
  id: 'dodatek-glowne',
  title: 'Dodatek do dania głównego',
  maxSelect: 2,
  options: [
    OPT_BEZ_DODATKOW,
    { id: 'ziemniaki', label: 'Ziemniaki z koperkiem' },
    { id: 'kopytka', label: 'Kopytka domowe' },
    { id: 'kasza', label: 'Kasza gryczana' },
    { id: 'ryz', label: 'Ryż basmati', priceExtra: 5 },
    { id: 'warzywa-grill', label: 'Warzywa grillowane', priceExtra: 8 },
  ],
};

export const MOD_SOS: MenuModifierGroup = {
  id: 'sos',
  title: 'Wybierz sos',
  maxSelect: 1,
  options: [
    { id: 'bez-sosu', label: 'Bez sosu', clearsOthers: true },
    { id: 'wlasny', label: 'Sos własny (w cenie)' },
    { id: 'grzybowy', label: 'Sos grzybowy', priceExtra: 6 },
    { id: 'pieprzowy', label: 'Sos z zielonego pieprzu', priceExtra: 8 },
    { id: 'zurawina', label: 'Żurawina / jabłko' },
  ],
};

export const MOD_DODATKI_EXTRA: MenuModifierGroup = {
  id: 'extra',
  title: 'Dodatkowe opcje',
  maxSelect: 3,
  options: [
    OPT_BEZ_DODATKOW,
    { id: 'surówka', label: 'Dodatkowa surówka', priceExtra: 4 },
    { id: 'salatka', label: 'Sałatka cezar mini', priceExtra: 9 },
    { id: 'chleb', label: 'Pieczywo rzemieślnicze', priceExtra: 3 },
  ],
};

export const MOD_RYBA: MenuModifierGroup = {
  id: 'dodatek-ryba',
  title: 'Dodatek do ryby',
  maxSelect: 2,
  options: [
    OPT_BEZ_DODATKOW,
    { id: 'ziemniaki', label: 'Ziemniaki pieczone' },
    { id: 'puree', label: 'Puree z kalafiora' },
    { id: 'ryz', label: 'Ryż jaśminowy' },
    { id: 'warzywa', label: 'Warzywa na parze', priceExtra: 5 },
  ],
};

export const MOD_PIEROGI: MenuModifierGroup = {
  id: 'farsz-pierogi',
  title: 'Wybierz farsz pierogów',
  maxSelect: 1,
  options: [
    { id: 'miesne', label: 'Mięsne' },
    { id: 'ruskie', label: 'Ruskie' },
    { id: 'kapusta', label: 'Kapusta z grzybami' },
    { id: 'szpinak', label: 'Szpinak i feta', priceExtra: 5 },
    { id: 'mix', label: 'Mix pół na pół', priceExtra: 4 },
  ],
};

export const MOD_PIEROGI_PODANIE: MenuModifierGroup = {
  id: 'podanie-pierogi',
  title: 'Sposób podania',
  maxSelect: 1,
  options: [
    { id: 'smazone', label: 'Smażone na maśle z cebulką' },
    { id: 'gotowane', label: 'Gotowane ze śmietaną' },
    { id: 'pieczone', label: 'Zapiekane z serem', priceExtra: 6 },
  ],
};

export const MODS_MIESO: MenuModifierGroup[] = [MOD_DODATEK_GLOWNE, MOD_SOS];
export const MODS_PREMIUM: MenuModifierGroup[] = [MOD_DODATEK_GLOWNE, MOD_SOS, MOD_DODATKI_EXTRA];
export const MODS_RYBA: MenuModifierGroup[] = [MOD_RYBA, MOD_SOS];
export const MODS_WEGE: MenuModifierGroup[] = [MOD_DODATEK_GLOWNE, MOD_DODATKI_EXTRA];
export const MODS_PIEROGI: MenuModifierGroup[] = [MOD_PIEROGI, MOD_PIEROGI_PODANIE];

export const MENU_CATEGORY_ORDER: MenuItem['category'][] = [
  'Zupa',
  'Danie Główne',
  'Zimna Płyta',
  'Dania Gorące Nocne',
  'Desery & Tort',
  'Napoje',
];

export const MENU_TAG_LABELS: Record<NonNullable<MenuItem['tags']>[number], string> = {
  wege: 'WEGE',
  bezgluten: 'BEZGLUTEN',
  premium: 'PREMIUM',
  'dla-dzieci': 'DLA DZIECI',
  ostre: 'OSTRE',
};

export function groupMenuByCategory(menu: MenuItem[]): { category: MenuItem['category']; items: MenuItem[] }[] {
  const map = new Map<MenuItem['category'], MenuItem[]>();
  for (const item of menu) {
    const list = map.get(item.category) ?? [];
    list.push(item);
    map.set(item.category, list);
  }
  return MENU_CATEGORY_ORDER.filter((c) => map.has(c)).map((category) => ({
    category,
    items: map.get(category)!,
  }));
}

export const DISH_PIECZEN: MenuItem = {
  id: 'pieczen-wieprzowa',
  category: 'Danie Główne',
  name: 'Pieczeń wieprzowa w sosie własnym',
  description: 'Tradycyjna pieczeń — wybierz dodatek i sos.',
  imageUrl: MENU_IMG.main,
  allergens: ['seler'],
  modifiers: MODS_MIESO,
};

export const DISH_PIEROGI: MenuItem = {
  id: 'pierogi',
  category: 'Danie Główne',
  name: 'Pierogi domowe',
  description: 'Porcja 10 szt. — wybierz farsz i sposób podania.',
  tags: ['dla-dzieci'],
  imageUrl: PIEROGI_IMG,
  allergens: ['gluten', 'jajko'],
  modifiers: MODS_PIEROGI,
};

export const DISH_RISOTTO: MenuItem = {
  id: 'risotto-grzyby',
  category: 'Danie Główne',
  name: 'Risotto z grzybami leśnymi',
  description: 'Kremowe risotto arborio, borowiki — opcja wegetariańska.',
  tags: ['wege'],
  imageUrl: MENU_IMG.vegan,
  allergens: ['mleko'],
  modifiers: MODS_WEGE,
};

export const DISH_POLEDWICZKI: MenuItem = {
  id: 'poledwiczki-kaczka',
  category: 'Danie Główne',
  name: 'Polędwiczki + pierś z kaczki',
  description: 'Dwa dania mięsne — wybierz dodatek i sos.',
  tags: ['premium'],
  imageUrl: MENU_IMG.steak,
  allergens: ['mleko'],
  modifiers: MODS_PREMIUM,
};

export const DISH_DORSZ: MenuItem = {
  id: 'dorsz-bezgluten',
  category: 'Danie Główne',
  name: 'Filet z dorsza (bezgluten)',
  description: 'Dorsz z pieca — wybierz dodatek do ryby.',
  tags: ['bezgluten'],
  imageUrl: MENU_IMG.fish,
  allergens: ['ryby'],
  modifiers: MODS_RYBA,
};

export const DISH_STEK: MenuItem = {
  id: 'stek-wolowy',
  category: 'Danie Główne',
  name: 'Stek z polędwicy wołowej',
  description: 'Masełko ziołowe — wybierz dodatek i sos.',
  tags: ['premium'],
  imageUrl: MENU_IMG.steak,
  allergens: ['mleko'],
  modifiers: MODS_PREMIUM,
};

export const DISH_LOSOS: MenuItem = {
  id: 'losos-para',
  category: 'Danie Główne',
  name: 'Filet z łososia na parze',
  description: 'Sos czosnkowy — wybierz dodatek do ryby.',
  tags: ['bezgluten'],
  imageUrl: MENU_IMG.fish,
  allergens: ['ryby'],
  modifiers: MODS_RYBA,
};

export const DISH_CURRY: MenuItem = {
  id: 'curry-wege',
  category: 'Danie Główne',
  name: 'Warzywne curry z ryżem',
  description: 'Sezonowe warzywa, mleczko kokosowe.',
  tags: ['wege'],
  imageUrl: MENU_IMG.vegan,
  modifiers: MODS_WEGE,
};

export const DISH_KURCZAK: MenuItem = {
  id: 'kurczak-smietana',
  category: 'Danie Główne',
  name: 'Pierś z kurczaka w sosie śmietanowym',
  description: 'Wybierz dodatek i sos.',
  imageUrl: MENU_IMG.main,
  allergens: ['mleko'],
  modifiers: MODS_MIESO,
};

export const DISH_GRILL: MenuItem = {
  id: 'pieczen-grill',
  category: 'Danie Główne',
  name: 'Pieczeń z grilla i kiełbaski',
  description: 'Mięsa z grilla — wybierz dodatek.',
  imageUrl: MENU_IMG.main,
  modifiers: MODS_MIESO,
};

export const DISH_SANDACZ: MenuItem = {
  id: 'sandacz',
  category: 'Danie Główne',
  name: 'Sandacz z masłem ziołowym',
  description: 'Lokalna ryba — wybierz dodatek.',
  tags: ['bezgluten'],
  imageUrl: MENU_IMG.fish,
  allergens: ['ryby', 'mleko'],
  modifiers: MODS_RYBA,
};

export const DISH_BURGER: MenuItem = {
  id: 'burger',
  category: 'Danie Główne',
  name: 'Burger wołowy z frytkami',
  description: 'Wybierz sos i dodatki.',
  imageUrl: MENU_IMG.main,
  allergens: ['gluten', 'jajko', 'mleko'],
  modifiers: [MOD_SOS, MOD_DODATKI_EXTRA],
};

export const DISH_BOWL: MenuItem = {
  id: 'bowl-quinoa',
  category: 'Danie Główne',
  name: 'Bowl z quinoa i warzywami',
  description: 'Opcja wege / bezgluten.',
  tags: ['wege', 'bezgluten'],
  imageUrl: MENU_IMG.vegan,
  modifiers: MODS_WEGE,
};

export const DISH_JAGNIE: MenuItem = {
  id: 'jagnie',
  category: 'Danie Główne',
  name: 'Jagnięcina z puree z selera',
  description: 'Sous-vide — wybierz dodatek i sos.',
  tags: ['premium'],
  imageUrl: MENU_IMG.steak,
  allergens: ['seler'],
  modifiers: MODS_PREMIUM,
};

export const DISH_MAKARON: MenuItem = {
  id: 'makaron-trufla',
  category: 'Danie Główne',
  name: 'Makaron z truflą i grzybami',
  description: 'Tagliatelle — wybierz sos.',
  tags: ['wege', 'premium'],
  imageUrl: MENU_IMG.pasta,
  allergens: ['gluten', 'jajko', 'mleko'],
  modifiers: [MOD_SOS, MOD_DODATKI_EXTRA],
};

export const DISH_BBQ: MenuItem = {
  id: 'bufet-bbq',
  category: 'Danie Główne',
  name: 'Bufet BBQ: karkówka, kurczak, warzywa',
  description: 'Live cooking — wybierz sos i dodatek.',
  imageUrl: MENU_IMG.main,
  modifiers: [MOD_SOS, MOD_DODATEK_GLOWNE],
};


function choiceGroup(id: string, title: string, dishes: MenuItem[]): MenuDishChoiceGroup {
  return { id, title, dishes };
}

const choiceGlowne = (id: string, dishes: MenuItem[]) =>
  choiceGroup(id, 'Wybierz danie główne', dishes);

export const MOD_ZUPA_DODATEK: MenuModifierGroup = {
  id: 'zupa-dodatek',
  title: 'Dodatek do zupy',
  maxSelect: 2,
  options: [
    { id: 'bez', label: 'Bez dodatków', clearsOthers: true },
    { id: 'grzanki', label: 'Grzanki czosnkowe', priceExtra: 3 },
    { id: 'smietana', label: 'Śmietana', priceExtra: 2 },
    { id: 'ziola', label: 'Świeże zioła' },
  ],
};

export const MOD_DESER: MenuModifierGroup = {
  id: 'deser-opcja',
  title: 'Wariant deseru',
  maxSelect: 1,
  options: [
    { id: 'klasyczny', label: 'Wersja klasyczna' },
    { id: 'bezcukru', label: 'Bez cukru', priceExtra: 4 },
    { id: 'bezgluten', label: 'Bezglutenowy', priceExtra: 6 },
  ],
};

export const MOD_NAPOJ: MenuModifierGroup = {
  id: 'napoj-opcja',
  title: 'Wariant napoju',
  maxSelect: 1,
  options: [
    { id: 'standard', label: 'Standard' },
    { id: 'premium', label: 'Wersja premium', priceExtra: 8 },
    { id: 'bezcukru', label: 'Bez cukru' },
  ],
};

export const MOD_ZIMNA: MenuModifierGroup = {
  id: 'zimna-opcja',
  title: 'Uzupełnienie bufetu',
  maxSelect: 2,
  options: [
    OPT_BEZ_DODATKOW,
    { id: 'oliwki', label: 'Oliwki', priceExtra: 4 },
    { id: 'pieczywo', label: 'Pieczywo dodatkowe', priceExtra: 3 },
    { id: 'maslo', label: 'Masło ziołowe', priceExtra: 2 },
  ],
};

export const MOD_NOCNE: MenuModifierGroup = {
  id: 'nocne-opcja',
  title: 'Dodatek do dania nocnego',
  maxSelect: 2,
  options: [
    OPT_BEZ_DODATKOW,
    { id: 'chleb', label: 'Chleb wiejski' },
    { id: 'chrzan', label: 'Chrzan / musztarda' },
    { id: 'surówka', label: 'Surówka', priceExtra: 3 },
  ],
};

export const DISH_ROSOL: MenuItem = {
  id: 'zupa-rosol',
  category: 'Zupa',
  name: 'Rosół królewski z makaronem',
  description: 'Klarowny bulion — wybierz dodatek.',
  imageUrl: MENU_IMG.soup,
  allergens: ['gluten', 'jajko'],
  modifiers: [MOD_ZUPA_DODATEK],
};

export const DISH_KREM_BOROWIK: MenuItem = {
  id: 'zupa-krem-borowik',
  category: 'Zupa',
  name: 'Krem z borowików',
  description: 'Aromatyczny krem z leśnych grzybów.',
  tags: ['premium'],
  imageUrl: MENU_IMG.soup,
  allergens: ['gluten', 'mleko'],
  modifiers: [MOD_ZUPA_DODATEK],
};

export const DISH_KREM_POMIDOR: MenuItem = {
  id: 'zupa-krem-pomidor',
  category: 'Zupa',
  name: 'Krem z pomidorów z bazylią',
  description: 'Pieczone pomidory, świeża bazylia.',
  tags: ['wege'],
  imageUrl: MENU_IMG.soup,
  allergens: ['gluten', 'mleko'],
  modifiers: [MOD_ZUPA_DODATEK],
};

export const DISH_ZUREK: MenuItem = {
  id: 'zupa-zurek',
  category: 'Zupa',
  name: 'Żurek staropolski',
  description: 'Na zakwasie, kiełbasa, jajko.',
  imageUrl: MENU_IMG.soup,
  allergens: ['gluten', 'jajko'],
  modifiers: [MOD_ZUPA_DODATEK],
};

export const DISH_ZUPA_RYBNA: MenuItem = {
  id: 'zupa-rybna',
  category: 'Zupa',
  name: 'Kremowa zupa rybna',
  description: 'Bulion rybny z dorszem.',
  imageUrl: MENU_IMG.soup,
  allergens: ['ryby'],
  modifiers: [MOD_ZUPA_DODATEK],
};

export const DISH_CHLODNIK: MenuItem = {
  id: 'zupa-chlodnik',
  category: 'Zupa',
  name: 'Chłodnik z botwiny',
  description: 'Sezonowy chłodnik, jajko, koper.',
  tags: ['wege'],
  imageUrl: MENU_IMG.soup,
  allergens: ['jajko', 'mleko'],
  modifiers: [MOD_ZUPA_DODATEK],
};

export const DISH_KONSOMME: MenuItem = {
  id: 'zupa-konsomme',
  category: 'Zupa',
  name: 'Konsommé z pierożkami',
  description: 'Klarowny bulion, pierożki.',
  tags: ['premium'],
  imageUrl: MENU_IMG.soup,
  allergens: ['gluten'],
  modifiers: [MOD_ZUPA_DODATEK],
};

export const DISH_POLMISEK: MenuItem = {
  id: 'zimna-polmisek',
  category: 'Zimna Płyta',
  name: 'Półmisek wędlin i serów',
  description: 'Wędliny staropolskie, deska serów.',
  imageUrl: MENU_IMG.salad,
  allergens: ['mleko', 'ryby'],
  modifiers: [MOD_ZIMNA],
};

export const DISH_BUFET_PREMIUM: MenuItem = {
  id: 'zimna-bufet-premium',
  category: 'Zimna Płyta',
  name: 'Bufet Premium: łosoś, tatar, sałatki',
  description: 'Wykwintny bufet zimny.',
  imageUrl: MENU_IMG.salad,
  allergens: ['ryby', 'jajko'],
  modifiers: [MOD_ZIMNA],
};

export const DISH_SLEDZIKI: MenuItem = {
  id: 'zimna-sledziki',
  category: 'Zimna Płyta',
  name: 'Śledziki i tartinki z makreli',
  description: 'Klasika nadmorska.',
  imageUrl: MENU_IMG.salad,
  allergens: ['ryby', 'mleko'],
  modifiers: [MOD_ZIMNA],
};

export const DISH_WIEJSKI: MenuItem = {
  id: 'zimna-wiejski',
  category: 'Zimna Płyta',
  name: 'Wiejski stół',
  description: 'Smalec, ogórki, chleb razowy.',
  imageUrl: MENU_IMG.salad,
  allergens: ['gluten'],
  modifiers: [MOD_ZIMNA],
};

export const DISH_TAPAS: MenuItem = {
  id: 'zimna-tapas',
  category: 'Zimna Płyta',
  name: 'Tapas i deska serów',
  description: 'Oliwki, chorizo, sery dojrzewające.',
  tags: ['premium'],
  imageUrl: MENU_IMG.salad,
  allergens: ['gluten', 'mleko'],
  modifiers: [MOD_ZIMNA],
};

export const DISH_SALATKI: MenuItem = {
  id: 'zimna-salatki',
  category: 'Zimna Płyta',
  name: 'Bufet sałatkowy / dipy',
  description: 'Sałatki sezonowe, dressingi house.',
  tags: ['wege'],
  imageUrl: MENU_IMG.salad,
  allergens: ['gluten'],
  modifiers: [MOD_ZIMNA],
};

export const DISH_KREWETKI: MenuItem = {
  id: 'zimna-krewetki',
  category: 'Zimna Płyta',
  name: 'Krewetki i carpaccio z buraka',
  description: 'Krewetki na maśle czosnkowym.',
  tags: ['premium'],
  imageUrl: MENU_IMG.salad,
  allergens: ['skorupiaki', 'mleko'],
  modifiers: [MOD_ZIMNA],
};

export const DISH_PUCHARKI: MenuItem = {
  id: 'deser-pucharki',
  category: 'Desery & Tort',
  name: 'Pucharki lodowe z owocami',
  description: 'Lody, owoce sezonowe.',
  tags: ['dla-dzieci'],
  imageUrl: DESSERT_IMG.ice,
  allergens: ['mleko'],
  modifiers: [MOD_DESER],
};

export const DISH_TORT: MenuItem = {
  id: 'deser-tort',
  category: 'Desery & Tort',
  name: 'Tort okolicznościowy + candy bar',
  description: 'Truskawka lub czekolada.',
  tags: ['premium'],
  imageUrl: DESSERT_IMG.cake,
  allergens: ['gluten', 'mleko', 'jajko'],
  modifiers: [MOD_DESER],
};

export const DISH_SZARLOTKA: MenuItem = {
  id: 'deser-szarlotka',
  category: 'Desery & Tort',
  name: 'Szarlotka na ciepło z lodami',
  description: 'Domowa szarlotka.',
  imageUrl: DESSERT_IMG.apple,
  allergens: ['gluten', 'mleko'],
  modifiers: [MOD_DESER],
};

export const DISH_SERNIK: MenuItem = {
  id: 'deser-sernik',
  category: 'Desery & Tort',
  name: 'Sernik na zimno z owocami',
  description: 'Lekki sernik.',
  tags: ['dla-dzieci'],
  imageUrl: DESSERT_IMG.cheesecake,
  allergens: ['mleko', 'jajko'],
  modifiers: [MOD_DESER],
};

export const DISH_FONDANT: MenuItem = {
  id: 'deser-fondant',
  category: 'Desery & Tort',
  name: 'Fondant czekoladowy',
  description: 'Ciepły środek, lody pistacjowe.',
  tags: ['premium'],
  imageUrl: DESSERT_IMG.chocolate,
  allergens: ['gluten', 'mleko', 'jajko'],
  modifiers: [MOD_DESER],
};

export const DISH_CIASTA: MenuItem = {
  id: 'deser-ciasta',
  category: 'Desery & Tort',
  name: 'Ciasta domowe',
  description: 'Szarlotka, sernik, makowiec.',
  tags: ['dla-dzieci'],
  imageUrl: DESSERT_IMG.cake,
  allergens: ['gluten', 'mleko', 'jajko'],
  modifiers: [MOD_DESER],
};

export const DISH_MUS: MenuItem = {
  id: 'deser-mus',
  category: 'Desery & Tort',
  name: 'Mus z truskawek',
  description: 'Lekki mus, świeże owoce.',
  tags: ['wege'],
  imageUrl: DESSERT_IMG.parfait,
  allergens: ['mleko'],
  modifiers: [MOD_DESER],
};

export const DISH_TIRAMISU: MenuItem = {
  id: 'deser-tiramisu',
  category: 'Desery & Tort',
  name: 'Deconstructed tiramisu',
  description: 'Espresso, mascarpone, kakao.',
  tags: ['premium'],
  imageUrl: DESSERT_IMG.tiramisu,
  allergens: ['mleko', 'jajko', 'gluten'],
  modifiers: [MOD_DESER],
};

export const DISH_OWOCE_GRILL: MenuItem = {
  id: 'deser-owoce-grill',
  category: 'Desery & Tort',
  name: 'Owoce grillowane z lodami',
  description: 'Brzoskwinie i ananas.',
  tags: ['dla-dzieci'],
  imageUrl: DESSERT_IMG.fruit,
  allergens: ['mleko'],
  modifiers: [MOD_DESER],
};

export const DISH_NAPOJE_STD: MenuItem = {
  id: 'napoje-standard',
  category: 'Napoje',
  name: 'Napoje bez limitu',
  description: 'Soki, woda, kawa, herbata.',
  imageUrl: MENU_IMG.drink,
  modifiers: [MOD_NAPOJ],
};

export const DISH_NAPOJE_PREMIUM: MenuItem = {
  id: 'napoje-premium',
  category: 'Napoje',
  name: 'Open bar bezalkoholowy premium',
  description: 'Soki tłoczone, kawa specialty.',
  imageUrl: MENU_IMG.drink,
  modifiers: [MOD_NAPOJ],
};

export const DISH_NAPOJE_FULL: MenuItem = {
  id: 'napoje-full-bar',
  category: 'Napoje',
  name: 'Full Open Bar',
  description: 'Bar bezalkoholowy i alkoholowy.',
  tags: ['premium'],
  imageUrl: MENU_IMG.drink,
  modifiers: [MOD_NAPOJ],
};

export const DISH_LEMONIADA: MenuItem = {
  id: 'napoje-lemoniada',
  category: 'Napoje',
  name: 'Domowa lemoniada i kawa',
  description: 'Lemoniada cytrusowa, woda z miętą.',
  imageUrl: MENU_IMG.drink,
  modifiers: [MOD_NAPOJ],
};

export const DISH_WINO_DEG: MenuItem = {
  id: 'napoje-wino',
  category: 'Napoje',
  name: 'Degustacja / pairing win',
  description: 'Dobór sommeliera.',
  tags: ['premium'],
  imageUrl: MENU_IMG.drink,
  modifiers: [MOD_NAPOJ],
};

export const DISH_SPRITZ: MenuItem = {
  id: 'napoje-spritz',
  category: 'Napoje',
  name: 'Spritz bar + lemoniada',
  description: 'Bar bezalkoholowy na tarasie.',
  imageUrl: MENU_IMG.drink,
  modifiers: [MOD_NAPOJ],
};

export const DISH_BARSZCZ_NOC: MenuItem = {
  id: 'nocne-barszcz',
  category: 'Dania Gorące Nocne',
  name: 'Barszcz z krokietem + kitka',
  description: 'Klasyka weselna po północy.',
  imageUrl: MENU_IMG.night,
  allergens: ['gluten'],
  modifiers: [MOD_NOCNE],
};

export const DISH_STROGONOW: MenuItem = {
  id: 'nocne-strogonow',
  category: 'Dania Gorące Nocne',
  name: 'Strogonow wołowy i żurek',
  description: 'Dwa dania nocne przy stole.',
  imageUrl: MENU_IMG.night,
  allergens: ['gluten', 'mleko'],
  modifiers: [MOD_NOCNE],
};

export const DISH_GULASZ_NOC: MenuItem = {
  id: 'nocne-gulasz',
  category: 'Dania Gorące Nocne',
  name: 'Zupa gulaszowa + zrazy',
  description: 'Rozgrzewające dania nocne.',
  imageUrl: MENU_IMG.night,
  allergens: ['gluten'],
  modifiers: [MOD_NOCNE],
};

export const CHOICE_KLASYCZNY = choiceGlowne('glowne-klasyczny', [DISH_PIECZEN, DISH_PIEROGI, DISH_RISOTTO]);
export const CHOICE_ZLOTY = choiceGlowne('glowne-zloty', [DISH_POLEDWICZKI, DISH_DORSZ, DISH_PIEROGI]);
export const CHOICE_VIP = choiceGlowne('glowne-vip', [DISH_STEK, DISH_PIEROGI, DISH_RISOTTO]);
export const CHOICE_MORSKI = choiceGlowne('glowne-morski', [DISH_LOSOS, DISH_CURRY, DISH_PIEROGI]);
export const CHOICE_KAMERALNY = choiceGlowne('glowne-kameralny', [DISH_KURCZAK, DISH_PIEROGI, DISH_RISOTTO]);
export const CHOICE_BIESIADNY = choiceGlowne('glowne-biesiadny', [DISH_GRILL, DISH_PIEROGI, DISH_PIECZEN]);
export const CHOICE_BISTRO = choiceGlowne('glowne-bistro', [DISH_BURGER, DISH_BOWL, DISH_PIEROGI]);
export const CHOICE_FINE = choiceGlowne('glowne-fine', [DISH_JAGNIE, DISH_MAKARON, DISH_DORSZ]);
export const CHOICE_BBQ = choiceGlowne('glowne-bbq', [DISH_BBQ, DISH_PIEROGI, DISH_KURCZAK]);
export const CHOICE_JEZIORO = choiceGlowne('glowne-jezioro', [DISH_SANDACZ, DISH_PIEROGI, DISH_CURRY]);
export const CHOICE_WINO = choiceGlowne('glowne-wino', [DISH_MAKARON, DISH_PIEROGI, DISH_STEK]);

/** Pełne zestawy wyboru (wszystkie kategorie) — używane w package.choiceGroups */
export const CHOICES_KLASYCZNY: MenuDishChoiceGroup[] = [
  choiceGroup('zupa-klasyczny', 'Wybierz zupę', [DISH_ROSOL, DISH_KREM_POMIDOR, DISH_ZUREK]),
  CHOICE_KLASYCZNY,
  choiceGroup('zimna-klasyczny', 'Wybierz zimną płytę', [DISH_POLMISEK, DISH_SALATKI, DISH_WIEJSKI]),
  choiceGroup('deser-klasyczny', 'Wybierz deser', [DISH_PUCHARKI, DISH_SZARLOTKA, DISH_SERNIK]),
  choiceGroup('napoje-klasyczny', 'Wybierz napoje', [DISH_NAPOJE_STD, DISH_LEMONIADA, DISH_NAPOJE_PREMIUM]),
];

export const CHOICES_ZLOTY: MenuDishChoiceGroup[] = [
  choiceGroup('zupa-zloty', 'Wybierz zupę', [DISH_KREM_BOROWIK, DISH_ROSOL, DISH_KONSOMME]),
  CHOICE_ZLOTY,
  choiceGroup('zimna-zloty', 'Wybierz zimną płytę', [DISH_BUFET_PREMIUM, DISH_POLMISEK, DISH_KREWETKI]),
  choiceGroup('nocne-zloty', 'Wybierz danie nocne', [DISH_BARSZCZ_NOC, DISH_STROGONOW, DISH_GULASZ_NOC]),
  choiceGroup('deser-zloty', 'Wybierz deser', [DISH_TORT, DISH_FONDANT, DISH_PUCHARKI]),
  choiceGroup('napoje-zloty', 'Wybierz napoje', [DISH_NAPOJE_PREMIUM, DISH_NAPOJE_STD, DISH_WINO_DEG]),
];

export const CHOICES_VIP: MenuDishChoiceGroup[] = [
  choiceGroup('zupa-vip', 'Wybierz zupę', [DISH_KONSOMME, DISH_KREM_BOROWIK, DISH_ROSOL]),
  CHOICE_VIP,
  choiceGroup('zimna-vip', 'Wybierz zimną płytę', [DISH_KREWETKI, DISH_BUFET_PREMIUM, DISH_TAPAS]),
  choiceGroup('nocne-vip', 'Wybierz danie nocne', [DISH_STROGONOW, DISH_BARSZCZ_NOC, DISH_GULASZ_NOC]),
  choiceGroup('deser-vip', 'Wybierz deser', [DISH_TORT, DISH_TIRAMISU, DISH_FONDANT]),
  choiceGroup('napoje-vip', 'Wybierz napoje', [DISH_NAPOJE_FULL, DISH_WINO_DEG, DISH_NAPOJE_PREMIUM]),
];

export const CHOICES_MORSKI: MenuDishChoiceGroup[] = [
  choiceGroup('zupa-morski', 'Wybierz zupę', [DISH_ZUPA_RYBNA, DISH_CHLODNIK, DISH_KREM_POMIDOR]),
  CHOICE_MORSKI,
  choiceGroup('zimna-morski', 'Wybierz zimną płytę', [DISH_SLEDZIKI, DISH_SALATKI, DISH_BUFET_PREMIUM]),
  choiceGroup('deser-morski', 'Wybierz deser', [DISH_SZARLOTKA, DISH_MUS, DISH_PUCHARKI]),
  choiceGroup('napoje-morski', 'Wybierz napoje', [DISH_LEMONIADA, DISH_SPRITZ, DISH_NAPOJE_STD]),
];

export const CHOICES_KAMERALNY: MenuDishChoiceGroup[] = [
  choiceGroup('zupa-kameralny', 'Wybierz zupę', [DISH_KREM_POMIDOR, DISH_ROSOL, DISH_CHLODNIK]),
  CHOICE_KAMERALNY,
  choiceGroup('deser-kameralny', 'Wybierz deser', [DISH_SERNIK, DISH_SZARLOTKA, DISH_MUS]),
  choiceGroup('napoje-kameralny', 'Wybierz napoje', [DISH_NAPOJE_STD, DISH_LEMONIADA, DISH_NAPOJE_PREMIUM]),
];

export const CHOICES_WINO: MenuDishChoiceGroup[] = [
  CHOICE_WINO,
  choiceGroup('zimna-wino', 'Wybierz zimną płytę', [DISH_TAPAS, DISH_POLMISEK, DISH_KREWETKI]),
  choiceGroup('deser-wino', 'Wybierz deser', [DISH_FONDANT, DISH_TIRAMISU, DISH_SERNIK]),
  choiceGroup('napoje-wino', 'Wybierz napoje', [DISH_WINO_DEG, DISH_NAPOJE_PREMIUM, DISH_NAPOJE_FULL]),
];

export const CHOICES_BISTRO: MenuDishChoiceGroup[] = [
  CHOICE_BISTRO,
  choiceGroup('zimna-bistro', 'Wybierz zimną płytę', [DISH_SALATKI, DISH_TAPAS, DISH_POLMISEK]),
  choiceGroup('deser-bistro', 'Wybierz deser', [DISH_PUCHARKI, DISH_SZARLOTKA, DISH_MUS]),
  choiceGroup('napoje-bistro', 'Wybierz napoje', [DISH_LEMONIADA, DISH_NAPOJE_STD, DISH_SPRITZ]),
];

export const CHOICES_BIESIADNY: MenuDishChoiceGroup[] = [
  choiceGroup('zupa-biesiadny', 'Wybierz zupę', [DISH_ZUREK, DISH_ROSOL, DISH_KREM_POMIDOR]),
  CHOICE_BIESIADNY,
  choiceGroup('zimna-biesiadny', 'Wybierz zimną płytę', [DISH_WIEJSKI, DISH_POLMISEK, DISH_SALATKI]),
  choiceGroup('deser-biesiadny', 'Wybierz deser', [DISH_CIASTA, DISH_SZARLOTKA, DISH_PUCHARKI]),
  choiceGroup('napoje-biesiadny', 'Wybierz napoje', [DISH_NAPOJE_STD, DISH_LEMONIADA, DISH_NAPOJE_PREMIUM]),
];

export const CHOICES_FINE: MenuDishChoiceGroup[] = [
  choiceGroup('zupa-fine', 'Wybierz zupę', [DISH_KONSOMME, DISH_KREM_BOROWIK, DISH_CHLODNIK]),
  CHOICE_FINE,
  choiceGroup('deser-fine', 'Wybierz deser', [DISH_TIRAMISU, DISH_FONDANT, DISH_TORT]),
  choiceGroup('napoje-fine', 'Wybierz napoje', [DISH_WINO_DEG, DISH_NAPOJE_FULL, DISH_NAPOJE_PREMIUM]),
];

export const CHOICES_BBQ: MenuDishChoiceGroup[] = [
  CHOICE_BBQ,
  choiceGroup('zimna-bbq', 'Wybierz zimną płytę', [DISH_SALATKI, DISH_WIEJSKI, DISH_POLMISEK]),
  choiceGroup('deser-bbq', 'Wybierz deser', [DISH_OWOCE_GRILL, DISH_SZARLOTKA, DISH_PUCHARKI]),
  choiceGroup('napoje-bbq', 'Wybierz napoje', [DISH_LEMONIADA, DISH_SPRITZ, DISH_NAPOJE_STD]),
];

export const CHOICES_JEZIORO: MenuDishChoiceGroup[] = [
  choiceGroup('zupa-jezioro', 'Wybierz zupę', [DISH_CHLODNIK, DISH_ZUPA_RYBNA, DISH_KREM_POMIDOR]),
  CHOICE_JEZIORO,
  choiceGroup('deser-jezioro', 'Wybierz deser', [DISH_MUS, DISH_SZARLOTKA, DISH_SERNIK]),
  choiceGroup('napoje-jezioro', 'Wybierz napoje', [DISH_SPRITZ, DISH_LEMONIADA, DISH_NAPOJE_STD]),
];

/** Stałe pozycje nieużywane — menu w pakietach jest puste, wszystko w choiceGroups */
export const MENU_KLASYCZNY: MenuItem[] = [];
export const MENU_ZLOTY: MenuItem[] = [];
export const MENU_VIP: MenuItem[] = [];
export const MENU_MORSKI: MenuItem[] = [];
export const MENU_KAMERALNY: MenuItem[] = [];
export const MENU_WINO: MenuItem[] = [];
export const MENU_BISTRO: MenuItem[] = [];
export const MENU_BIESIADNY: MenuItem[] = [];
export const MENU_FINE: MenuItem[] = [];
export const MENU_BBQ: MenuItem[] = [];
export const MENU_JEZIORO: MenuItem[] = [];
