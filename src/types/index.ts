export type EventType = 'wesele' | 'chrzciny' | 'komunia' | 'urodziny' | 'firmowa' | 'inne';

export type BookingStatus = 'Oczekuje' | 'Potwierdzona' | 'Odrzucona' | 'Anulowana';

export type MenuItemTag = 'wege' | 'bezgluten' | 'premium' | 'dla-dzieci' | 'ostre';

export type MenuCategory =
  | 'Danie Główne'
  | 'Zupa'
  | 'Zimna Płyta'
  | 'Desery & Tort'
  | 'Napoje'
  | 'Dania Gorące Nocne';

export interface MenuModifierOption {
  id: string;
  label: string;
  /** Dopłata w zł / os. — 0 lub brak = w cenie pakietu */
  priceExtra?: number;
  /** Wybór kasuje pozostałe w grupie (np. „Bez dodatków”); nie liczy się do dopłat */
  clearsOthers?: boolean;
}

/** Grupa wyboru przy daniu (np. dodatek do dania głównego) */
export interface MenuModifierGroup {
  id: string;
  title: string;
  options: MenuModifierOption[];
  /** Max wybranych opcji; domyślnie 1 (single choice) */
  maxSelect?: number;
}

export interface MenuItem {
  /** Wymagane, gdy danie jest opcją w choiceGroups */
  id?: string;
  category: MenuCategory;
  name: string;
  description?: string;
  tags?: MenuItemTag[];
  imageUrl?: string;
  allergens?: string[];
  /** Opcje modyfikacji proponowane przez restaurację (np. dodatek, sos) */
  modifiers?: MenuModifierGroup[];
  /** Ukryte przed klientem (panel menedżera) */
  hidden?: boolean;
}

/**
 * Wybór jednego dania z kilku propozycji restauracji
 * (np. pieczeń z dodatkami ALBO pierogi z farszem).
 */
export interface MenuDishChoiceGroup {
  id: string;
  title: string;
  dishes: MenuItem[];
}

export interface OfferPackage {
  id: string;
  name: string; // e.g. "Pakiet Srebrny", "Pakiet Złoty", "Pakiet Platynowy"
  pricePerPerson: number; // zł / os.
  minGuests: number;
  durationHours: number;
  features: string[]; // e.g. "3 dania gorące", "Napoje bez limitu", "Klimatyzacja", "Miejsce na DJ"
  menu: MenuItem[];
  /** Wybór dania głównego (lub innej pozycji) — user wybiera jedno z dishes */
  choiceGroups?: MenuDishChoiceGroup[];
  depositPercent: number; // e.g. 20%
}

export interface Venue {
  id: string;
  name: string;
  category: string; // 'Restauracja' | 'Dom Weselny' | 'Sala Bankietowa' | 'Karczma' | 'Hotel ****'
  city: string;
  region: string;
  address: string;
  rating: number;
  reviewCount: number;
  maxGuests: number;
  minGuests: number;
  priceFrom: number; // Lowest package price per person
  images: string[];
  description: string;
  amenities: string[]; // ['Klimatyzacja', 'Ogród / Taras', 'Noclegi dla gości', 'Parking 50+ aut', 'Nagłośnienie', 'Plac zabaw']
  packages: OfferPackage[];
  availableDates: string[]; // ['2026-08-15', '2026-08-22', '2026-09-05', ...]
  blockedDates: string[];
  contactPhone: string;
  contactEmail: string;
  managerId: string;
  cancellationPolicy: string;
}

export interface BookingRequest {
  id: string;
  venueId: string;
  venueName: string;
  venueImage: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventType: EventType;
  date: string;
  guestsCount: number;
  packageId: string;
  packageName: string;
  pricePerGuest: number;
  estimatedTotal: number;
  depositAmount: number;
  status: BookingStatus;
  createdAt: string;
  specialRequests?: string;
  venueResponseNote?: string;
}

export interface FilterState {
  city: string;
  eventType: EventType | 'wszystkie';
  date: string;
  guests: number;
  maxPricePerGuest: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedVenueIds?: string[];
  appliedFilters?: Partial<FilterState>;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'manager';
  avatar?: string;
  managedVenueId?: string;
  provider: 'google' | 'apple' | 'demo';
}
