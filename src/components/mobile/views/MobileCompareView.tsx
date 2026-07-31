import React from 'react';
import { Venue, OfferPackage } from '../../../types';
import { Scale, Check, X, ChevronRight, Users, Calendar, Sparkles, Trash2 } from 'lucide-react';

interface Props {
  compareVenues: Venue[];
  onRemoveFromCompare: (venueId: string) => void;
  onSelectVenue: (venue: Venue) => void;
  onStartBooking: (venue: Venue, selectedPackage: OfferPackage) => void;
}

export const MobileCompareView: React.FC<Props> = ({
  compareVenues,
  onRemoveFromCompare,
  onSelectVenue,
  onStartBooking
}) => {
  if (compareVenues.length === 0) {
    return (
      <div className="p-6 text-center py-20">
        <div className="w-16 h-16 rounded-full bg-amber-900/40 border border-amber-700/50 flex items-center justify-center mx-auto text-amber-400 mb-4 shadow-sm">
          <Scale className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-extrabold text-slate-100">Brak lokali w porównywarce</h3>
        <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto font-medium">
          Przeglądaj katalog i kliknij „Porównaj”, aby zestawić 2 do 3 ofert obok siebie w standaryzowanym układzie „jabłka do jabłek”.
        </p>
      </div>
    );
  }

  const comparisonFeatures = [
    'Klimatyzacja',
    'Ogród / Taras',
    'Noclegi dla gości',
    'Parking 50+ aut',
    'Scena dla zespołu / DJ',
    'Plac zabaw dla dzieci'
  ];

  return (
    <div className="pb-24 pt-2">
      {/* Header */}
      <div className="px-4 mb-4 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-extrabold tracking-wider uppercase text-amber-400">Standardyzacja Ofert</span>
          <h2 className="text-xl font-extrabold text-slate-100">Porównywarka Oferty</h2>
        </div>
        <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
          Wybrano {compareVenues.length}/3
        </span>
      </div>

      {/* Horizontal Matrix Table */}
      <div className="overflow-x-auto px-4 no-scrollbar">
        <div className="min-w-[500px] grid grid-cols-3 gap-3">
          {compareVenues.map((venue) => {
            const defaultPkg = venue.packages[0];
            return (
              <div key={venue.id} className="bg-slate-900 border border-slate-700 rounded-2xl p-3 flex flex-col justify-between relative shadow-md">
                <button
                  onClick={() => onRemoveFromCompare(venue.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-800/90 text-slate-400 hover:text-rose-600 hover:bg-rose-900/40 shadow-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                {/* Top Section */}
                <div>
                  <img
                    src={venue.images[0]}
                    alt={venue.name}
                    className="w-full h-24 object-cover rounded-xl mb-2"
                  />
                  <span className="text-[9px] font-extrabold text-brand-600 uppercase">{venue.city}</span>
                  <h3 className="text-xs font-extrabold text-slate-100 line-clamp-1">{venue.name}</h3>

                  {/* Price */}
                  <div className="mt-2 bg-slate-800/60 p-2 rounded-xl text-center border border-slate-700">
                    <span className="text-[9px] text-slate-400 block uppercase font-bold">Cena startowa</span>
                    <span className="text-sm font-black text-brand-600">{venue.priceFrom} zł</span>
                    <span className="text-[9px] text-slate-400 font-medium"> / os.</span>
                  </div>

                  {/* Matrix Details */}
                  <div className="mt-3 space-y-2 text-[11px] text-slate-300 border-t border-slate-700 pt-2">
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase font-bold">Max Liczba Gości</span>
                      <span className="font-semibold text-slate-100">{venue.maxGuests} osób</span>
                    </div>

                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase font-bold">Wpłata zaliczki</span>
                      <span className="font-bold text-amber-300">{defaultPkg.depositPercent}% kwoty</span>
                    </div>

                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase font-bold">Pakiety menu</span>
                      <span className="font-semibold text-slate-100">{venue.packages.length} warianty</span>
                    </div>
                  </div>

                  {/* Feature Checkmarks */}
                  <div className="mt-3 pt-2 border-t border-slate-700 space-y-1.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Wyposażenie:</span>
                    {comparisonFeatures.map((feat) => {
                      const hasFeature = venue.amenities.some(a => a.toLowerCase().includes(feat.toLowerCase().slice(0, 5)));
                      return (
                        <div key={feat} className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-400 font-medium truncate max-w-[90px]">{feat}</span>
                          {hasFeature ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-4 space-y-1.5">
                  <button
                    onClick={() => onSelectVenue(venue)}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-[11px] font-extrabold transition-colors border border-slate-700"
                  >
                    Zobacz ofertę
                  </button>
                  <button
                    onClick={() => onStartBooking(venue, defaultPkg)}
                    className="w-full py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-[11px] font-bold shadow-md shadow-brand-600/20"
                  >
                    Rezerwuj
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
