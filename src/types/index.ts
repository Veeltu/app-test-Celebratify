export type EventType = 'wesele' | 'chrzciny' | 'komunia' | 'urodziny' | 'firmowa' | 'inne';

export type BookingStatus = 'Oczekuje' | 'Potwierdzona' | 'Odrzucona' | 'Anulowana';

export interface MenuItem {
  category: 'Danie Główne' | 'Zupa' | 'Zimna Płyta' | 'Desery & Tort' | 'Napoje' | 'Dania Gorące Nocne';
  name: string;
  description?: string;
}

export interface OfferPackage {
  id: string;
  name: string; // e.g. "Pakiet Srebrny", "Pakiet Złoty", "Pakiet Platynowy"
  pricePerPerson: number; // zł / os.
  minGuests: number;
  durationHours: number;
  features: string[]; // e.g. "3 dania gorące", "Napoje bez limitu", "Klimatyzacja", "Miejsce na DJ"
  menu: MenuItem[];
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
