import React, { useState } from 'react';
import { Venue, FilterState, EventType } from '../../../types';
import { MapPin, Calendar, Users, Sparkles, Scale, Check, ChevronRight, Star, Heart } from 'lucide-react';
import { getCityCoords } from '../../../data/cityCoords';
import { RADIUS_PRESETS_KM, distanceKm } from '../../../utils/geo';

interface Props {
  venues: Venue[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onSelectVenue: (venue: Venue) => void;
  compareList: string[]; // venue ids
  onToggleCompare: (venueId: string) => void;
  onOpenAIChat: () => void;
}

export const MobileSearchView: React.FC<Props> = ({
  venues,
  filters,
  onFilterChange,
  onSelectVenue,
  compareList,
  onToggleCompare,
  onOpenAIChat
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const cities = ['Wszystkie', 'Kraków', 'Warszawa', 'Gdańsk', 'Wrocław', 'Leszno'];
  const eventTypes: { id: EventType | 'wszystkie'; label: string; emoji: string }[] = [
    { id: 'wszystkie', label: 'Wszystkie', emoji: '✨' },
    { id: 'wesele', label: 'Wesele', emoji: '💍' },
    { id: 'chrzciny', label: 'Chrzciny', emoji: '👶' },
    { id: 'komunia', label: 'Komunia', emoji: '🕊️' },
    { id: 'urodziny', label: 'Urodziny / Rocznica', emoji: '🎂' },
    { id: 'firmowa', label: 'Impreza Firmowa', emoji: '🎉' }
  ];

  const origin = filters.city !== 'Wszystkie' ? getCityCoords(filters.city) : null;
  const radiusActive = Boolean(origin);

  const venueDistanceKm = (venue: Venue): number | null => {
    if (!origin) return null;
    return distanceKm(origin, { lat: venue.lat, lng: venue.lng });
  };

  const filteredVenues = venues
    .filter(venue => {
      if (origin) {
        const d = distanceKm(origin, { lat: venue.lat, lng: venue.lng });
        if (d > filters.radiusKm) return false;
      }
      if (filters.guests > 0 && venue.maxGuests < filters.guests) return false;
      if (filters.maxPricePerGuest > 0 && venue.priceFrom > filters.maxPricePerGuest) return false;
      if (filters.date && venue.blockedDates.includes(filters.date)) return false;
      return true;
    })
    .sort((a, b) => {
      if (!origin) return 0;
      return (
        distanceKm(origin, { lat: a.lat, lng: a.lng }) -
        distanceKm(origin, { lat: b.lat, lng: b.lng })
      );
    });

  return (
    <div className="pb-24 pt-2">
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-brand-600">Booking Imprez Okolicznościowych</span>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Znajdź idealny lokal</h1>
          </div>
          <button
            onClick={onOpenAIChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-brand-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold shadow-xs active:scale-95 transition-transform"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
            <span>Szukaj z AI</span>
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-md space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
              <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
              <select
                value={filters.city}
                onChange={(e) => onFilterChange({ ...filters, city: e.target.value })}
                className="bg-transparent text-xs font-semibold text-slate-800 w-full outline-none cursor-pointer"
              >
                {cities.map(c => <option key={c} value={c} className="bg-white text-slate-800">{c}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
              <Users className="w-4 h-4 text-amber-600 shrink-0" />
              <select
                value={filters.eventType}
                onChange={(e) => onFilterChange({ ...filters, eventType: e.target.value as any })}
                className="bg-transparent text-xs font-semibold text-slate-800 w-full outline-none cursor-pointer"
              >
                {eventTypes.map(e => <option key={e.id} value={e.id} className="bg-white text-slate-800">{e.emoji} {e.label}</option>)}
              </select>
            </div>
          </div>

          <div className={`flex items-center gap-1.5 ${radiusActive ? '' : 'opacity-45'}`}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 shrink-0">
              Promień
            </span>
            {RADIUS_PRESETS_KM.map((km) => {
              const selected = filters.radiusKm === km;
              return (
                <button
                  key={km}
                  type="button"
                  disabled={!radiusActive}
                  onClick={() => onFilterChange({ ...filters, radiusKm: km })}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-all ${
                    selected && radiusActive
                      ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  } disabled:cursor-not-allowed`}
                >
                  {km} km
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5 pb-0.5">
            {eventTypes.map(e => {
              const isSelected = filters.eventType === e.id;
              return (
                <button
                  key={e.id}
                  onClick={() => onFilterChange({ ...filters, eventType: e.id })}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 border ${
                    isSelected
                      ? 'bg-gradient-to-r from-brand-500 to-amber-500 text-white border-brand-500 shadow-sm scale-105'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <span>{e.emoji}</span>
                  <span>{e.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
              <Calendar className="w-4 h-4 text-brand-600 shrink-0" />
              <input
                type="date"
                value={filters.date}
                onChange={(e) => onFilterChange({ ...filters, date: e.target.value })}
                className="bg-transparent text-xs font-semibold text-slate-800 w-full outline-none"
              />
            </div>
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
              <span className="text-xs font-bold text-amber-700 shrink-0">Goście:</span>
              <input
                type="number"
                placeholder="np. 80"
                value={filters.guests || ''}
                onChange={(e) => onFilterChange({ ...filters, guests: parseInt(e.target.value) || 0 })}
                className="bg-transparent text-xs font-semibold text-slate-800 w-full outline-none placeholder-slate-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mb-4">
        <div
          onClick={onOpenAIChat}
          className="bg-gradient-to-r from-amber-50 via-rose-50/60 to-orange-50 border border-amber-200/80 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer hover:border-amber-400 transition-all shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-600 shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-amber-900">Asystent Konwersacyjny AI</h4>
              <p className="text-[11px] text-slate-600 font-medium">„Szukam sali na 80 osób pod Krakowem w czerwcu do 250 zł/os”</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-amber-600 shrink-0" />
        </div>
      </div>

      <div className="px-4 mb-2 flex items-center justify-between">
        <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
          Znalezione lokale ({filteredVenues.length})
        </span>
        {compareList.length > 0 && (
          <span className="text-xs text-brand-600 font-bold flex items-center gap-1">
            <Scale className="w-3.5 h-3.5" /> Do porównania: {compareList.length}/3
          </span>
        )}
      </div>

      <div className="px-4 space-y-4">
        {filteredVenues.map((venue) => {
          const isComparing = compareList.includes(venue.id);
          const isFav = favorites.includes(venue.id);
          const dist = venueDistanceKm(venue);
          return (
            <div
              key={venue.id}
              onClick={() => onSelectVenue(venue)}
              className="bg-white border border-slate-200 hover:border-brand-400 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer active:scale-[0.99] group relative"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={venue.images[0]}
                  alt={venue.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/30" />

                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                  {venue.category}
                </span>

                <button
                  onClick={(e) => toggleFavorite(venue.id, e)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-600 hover:text-rose-600 transition-colors shadow-sm"
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>

                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-bold text-amber-700 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{venue.rating}</span>
                  <span className="text-[10px] font-normal text-slate-500">({venue.reviewCount})</span>
                </div>

                <div className="absolute bottom-3 right-3 bg-brand-600/90 backdrop-blur-md px-3 py-1 rounded-lg border border-brand-500 text-white font-extrabold text-xs shadow-md">
                  od {venue.priceFrom} zł <span className="text-[10px] font-normal text-brand-100">/ os.</span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {venue.name}
                    </h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                      <span>{venue.address}</span>
                    </p>
                    {dist !== null && (
                      <p className="text-[11px] text-brand-700 font-semibold mt-1">
                        {Math.round(dist)} km od {filters.city}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-3 text-xs text-slate-700 border-t border-b border-slate-200 py-2">
                  <div className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    <span>do {venue.maxGuests} osób</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-300" />
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-600" />
                    <span>Wolne terminy: <strong className="text-emerald-600">{venue.availableDates.length}</strong></span>
                  </div>
                </div>

                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {venue.amenities.slice(0, 3).map((amenity, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded-md border border-slate-200">
                      {amenity}
                    </span>
                  ))}
                  {venue.amenities.length > 3 && (
                    <span className="text-[10px] text-slate-500 self-center font-medium">+ {venue.amenities.length - 3}</span>
                  )}
                </div>

                <div className="mt-3.5 pt-2 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleCompare(venue.id);
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                      isComparing
                        ? 'bg-amber-50 border-amber-300 text-amber-800'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>{isComparing ? 'Wybrano do porównania' : 'Porównaj ofertę'}</span>
                    {isComparing && <Check className="w-3.5 h-3.5 text-amber-600 ml-1" />}
                  </button>

                  <button className="py-2 px-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-md shadow-brand-600/20">
                    <span>Zobacz cennik</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
