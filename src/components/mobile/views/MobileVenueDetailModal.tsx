import React, { useState } from 'react';
import { Venue, OfferPackage } from '../../../types';
import { X, Star, MapPin, Users, Calendar, Check, Scale, Phone, Mail, ChevronRight, ShieldAlert, Sparkles, Utensils } from 'lucide-react';

interface Props {
  venue: Venue;
  onClose: () => void;
  onStartBooking: (venue: Venue, selectedPackage: OfferPackage, selectedDate?: string) => void;
  compareList: string[];
  onToggleCompare: (venueId: string) => void;
}

export const MobileVenueDetailModal: React.FC<Props> = ({
  venue,
  onClose,
  onStartBooking,
  compareList,
  onToggleCompare
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<OfferPackage>(venue.packages[0]);
  const [selectedDate, setSelectedDate] = useState<string>(venue.availableDates[0] || '');
  const [activeTab, setActiveTab] = useState<'packages' | 'menu' | 'dates' | 'about'>('packages');

  const isComparing = compareList.includes(venue.id);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg overflow-y-auto max-w-md mx-auto animate-fade-in">
      {/* Header Bar */}
      <div className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-slate-300 hover:text-white text-xs font-semibold bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800"
        >
          ✕ Zamknij
        </button>
        <span className="text-xs font-bold text-slate-300 truncate max-w-[180px]">{venue.name}</span>
        <button
          onClick={() => onToggleCompare(venue.id)}
          className={`p-2 rounded-full border text-xs ${
            isComparing ? 'bg-amber-500/20 border-amber-500 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          <Scale className="w-4 h-4" />
        </button>
      </div>

      <div className="pb-28">
        {/* Photo Gallery Carousel */}
        <div className="relative h-64 w-full bg-slate-950">
          <img
            src={venue.images[activeImageIdx]}
            alt={venue.name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {venue.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === activeImageIdx ? 'w-6 bg-brand-400' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>

          <div className="absolute bottom-3 left-4 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-amber-400 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{venue.rating}</span>
            <span className="text-slate-400 font-normal">({venue.reviewCount} opinii)</span>
          </div>
        </div>

        {/* Venue Title & Info */}
        <div className="p-4">
          <div className="flex items-center gap-2">
            <span className="bg-brand-500/20 text-brand-300 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border border-brand-500/30">
              {venue.category}
            </span>
            <span className="text-xs text-slate-400">miasto {venue.city}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">{venue.name}</h2>
          <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span>{venue.address}</span>
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 my-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Cena od</span>
              <p className="text-sm font-extrabold text-brand-400 mt-0.5">{venue.priceFrom} zł <span className="text-[9px] font-normal text-slate-400">/ os.</span></p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Pojemność</span>
              <p className="text-sm font-extrabold text-amber-400 mt-0.5">do {venue.maxGuests} osób</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Zaliczka</span>
              <p className="text-sm font-extrabold text-slate-200 mt-0.5">{selectedPackage.depositPercent}%</p>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-slate-800 mb-4">
            <button
              onClick={() => setActiveTab('packages')}
              className={`flex-1 py-2.5 text-xs font-bold border-b-2 text-center transition-colors ${
                activeTab === 'packages' ? 'border-brand-400 text-brand-400' : 'border-transparent text-slate-400'
              }`}
            >
              Pakieti & Cennik
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`flex-1 py-2.5 text-xs font-bold border-b-2 text-center transition-colors ${
                activeTab === 'menu' ? 'border-brand-400 text-brand-400' : 'border-transparent text-slate-400'
              }`}
            >
              Szczegółowe Menu
            </button>
            <button
              onClick={() => setActiveTab('dates')}
              className={`flex-1 py-2.5 text-xs font-bold border-b-2 text-center transition-colors ${
                activeTab === 'dates' ? 'border-brand-400 text-brand-400' : 'border-transparent text-slate-400'
              }`}
            >
              Terminy ({venue.availableDates.length})
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 py-2.5 text-xs font-bold border-b-2 text-center transition-colors ${
                activeTab === 'about' ? 'border-brand-400 text-brand-400' : 'border-transparent text-slate-400'
              }`}
            >
              O Lokalu
            </button>
          </div>

          {/* Tab 1: Packages */}
          {activeTab === 'packages' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-400 mb-2">
                Wybierz pakiet ustandaryzowany do porównania z innymi lokalami:
              </div>
              {venue.packages.map((pkg) => {
                const isSelected = selectedPackage.id === pkg.id;
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-brand-500 shadow-lg shadow-brand-500/10 ring-1 ring-brand-500/50'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-extrabold text-white text-sm flex items-center gap-2">
                          {pkg.name}
                          {isSelected && <span className="bg-brand-500 text-slate-950 text-[9px] font-extrabold px-1.5 py-0.5 rounded">WYBRANY</span>}
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">Czas trwania: {pkg.durationHours}h • Min. {pkg.minGuests} osób</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-brand-400">{pkg.pricePerPerson} zł</span>
                        <span className="block text-[10px] text-slate-400">/ osoba</span>
                      </div>
                    </div>

                    <ul className="mt-3 space-y-1.5 text-xs text-slate-300 border-t border-slate-800/80 pt-2.5">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tab 2: Detailed Menu */}
          {activeTab === 'menu' && (
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
                <span className="text-xs text-slate-300 font-semibold">Menu dla pakietu:</span>
                <span className="text-xs font-bold text-brand-400">{selectedPackage.name} ({selectedPackage.pricePerPerson} zł/os.)</span>
              </div>

              {selectedPackage.menu.map((item, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3">
                  <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-0.5">{item.name}</h4>
                  {item.description && <p className="text-[11px] text-slate-400 mt-0.5">{item.description}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Dates */}
          {activeTab === 'dates' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-400">
                Wolne terminy potwierdzone przez lokal w systemie PartySpot:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {venue.availableDates.map((d) => {
                  const isDateSelected = selectedDate === d;
                  return (
                    <button
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isDateSelected
                          ? 'bg-brand-500/20 border-brand-500 text-brand-300 font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-[10px] text-slate-400 font-semibold">Wolna Sobota</div>
                      <div className="text-xs mt-0.5">{d}</div>
                    </button>
                  );
                })}
              </div>

              {venue.blockedDates.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider block mb-1">
                    Terminy Zajęte / Zarezerwowane
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {venue.blockedDates.map(bd => (
                      <span key={bd} className="bg-slate-950 text-slate-500 line-through text-xs px-2.5 py-1 rounded-lg border border-slate-800">
                        {bd}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: About & Amenities */}
          {activeTab === 'about' && (
            <div className="space-y-4 text-xs text-slate-300">
              <p className="leading-relaxed bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                {venue.description}
              </p>

              <div>
                <h4 className="font-bold text-white text-sm mb-2">Wyposażenie i udogodnienia</h4>
                <div className="grid grid-cols-2 gap-2">
                  {venue.amenities.map((am, idx) => (
                    <div key={idx} className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      <span>{am}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <h4 className="font-bold text-white text-xs">Zasady anulacji</h4>
                <p className="text-slate-400">{venue.cancellationPolicy}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto glass-nav p-3 border-t border-slate-800 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <span className="text-[10px] text-slate-400 uppercase font-semibold block">Pakiet: {selectedPackage.name}</span>
          <div className="text-base font-extrabold text-white flex items-baseline gap-1">
            <span>{selectedPackage.pricePerPerson} zł</span>
            <span className="text-xs font-normal text-slate-400">/ os.</span>
          </div>
        </div>

        <button
          onClick={() => onStartBooking(venue, selectedPackage, selectedDate)}
          className="flex-1 py-3 px-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-brand-500/20 active:scale-95 transition-all flex items-center justify-center gap-1.5"
        >
          <span>Zarezerwuj termin</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
