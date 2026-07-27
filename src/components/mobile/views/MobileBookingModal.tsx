import React, { useState } from 'react';
import { Venue, OfferPackage, EventType, BookingRequest } from '../../../types';
import { X, Calendar, Users, CheckCircle, Info, ShieldCheck, ArrowRight, DollarSign } from 'lucide-react';

interface Props {
  venue: Venue;
  initialPackage: OfferPackage;
  initialDate?: string;
  onClose: () => void;
  onSubmitBooking: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export const MobileBookingModal: React.FC<Props> = ({
  venue,
  initialPackage,
  initialDate,
  onClose,
  onSubmitBooking
}) => {
  const [selectedPackage, setSelectedPackage] = useState<OfferPackage>(initialPackage);
  const [date, setDate] = useState<string>(initialDate || venue.availableDates[0] || '2026-08-22');
  const [guestsCount, setGuestsCount] = useState<number>(initialPackage.minGuests || 60);
  const [eventType, setEventType] = useState<EventType>('wesele');
  
  // Client Form
  const [clientName, setClientName] = useState('Jan Kowalski');
  const [clientEmail, setClientEmail] = useState('jan.kowalski@gmail.com');
  const [clientPhone, setClientPhone] = useState('+48 601 234 567');
  const [specialRequests, setSpecialRequests] = useState('');

  const estimatedTotal = guestsCount * selectedPackage.pricePerPerson;
  const depositAmount = (estimatedTotal * selectedPackage.depositPercent) / 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitBooking({
      venueId: venue.id,
      venueName: venue.name,
      venueImage: venue.images[0],
      clientName,
      clientEmail,
      clientPhone,
      eventType,
      date,
      guestsCount,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      pricePerGuest: selectedPackage.pricePerPerson,
      estimatedTotal,
      depositAmount,
      specialRequests
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md overflow-y-auto max-w-md mx-auto p-3 flex items-end sm:items-center justify-center animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl w-full p-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800/50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Rezerwacja Terminu</span>
          <h2 className="text-xl font-extrabold text-white">{venue.name}</h2>
          <p className="text-xs text-slate-400">{venue.city} • {venue.address}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Step 1: Package Selection */}
          <div>
            <label className="font-bold text-slate-300 block mb-1.5">Wybierz Pakiet Menu:</label>
            <div className="space-y-2">
              {venue.packages.map(pkg => (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    selectedPackage.id === pkg.id
                      ? 'bg-brand-500/20 border-brand-500 text-brand-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <div>
                    <span className="text-xs text-white block">{pkg.name}</span>
                    <span className="text-[10px] font-normal text-slate-400">Czas: {pkg.durationHours}h</span>
                  </div>
                  <span className="text-sm font-extrabold text-brand-400">{pkg.pricePerPerson} zł/os.</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Date & Guests */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-300 block mb-1">Data Imprezy:</label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-medium outline-none focus:border-brand-500"
              >
                {venue.availableDates.map(d => (
                  <option key={d} value={d} className="bg-slate-900">{d} (Wolny)</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Liczba Gości:</label>
              <input
                type="number"
                min={selectedPackage.minGuests}
                max={venue.maxGuests}
                value={guestsCount}
                onChange={(e) => setGuestsCount(parseInt(e.target.value) || selectedPackage.minGuests)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-medium outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Event Type */}
          <div>
            <label className="font-bold text-slate-300 block mb-1">Rodzaj Wydarzenia:</label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value as EventType)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-medium outline-none focus:border-brand-500"
            >
              <option value="wesele">Wesele</option>
              <option value="chrzciny">Chrzciny</option>
              <option value="komunia">Komunia</option>
              <option value="urodziny">Urodziny / Jubileusz</option>
              <option value="firmowa">Impreza Firmowa</option>
            </select>
          </div>

          {/* Contact Details */}
          <div className="border-t border-slate-800 pt-3 space-y-2">
            <span className="font-bold text-slate-300 block">Dane Rezerwującego:</span>
            <input
              type="text"
              placeholder="Imię i Nazwisko"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-brand-500"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="email"
                placeholder="Email"
                required
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-brand-500"
              />
              <input
                type="tel"
                placeholder="Telefon"
                required
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-brand-500"
              />
            </div>
            <textarea
              placeholder="Uwagi do lokalu (np. stolik dla dzieci, dania wege)..."
              rows={2}
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white outline-none focus:border-brand-500"
            />
          </div>

          {/* Cost Estimate Summary Card */}
          <div className="bg-slate-950 border border-brand-500/30 rounded-2xl p-3.5 space-y-1.5">
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Kalkulacja ({guestsCount} os. × {selectedPackage.pricePerPerson} zł):</span>
              <span className="font-bold text-white">{estimatedTotal.toLocaleString()} zł</span>
            </div>
            <div className="flex justify-between text-amber-300 text-xs font-bold">
              <span>Wymagana zaliczka ({selectedPackage.depositPercent}%):</span>
              <span>{depositAmount.toLocaleString()} zł</span>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-start gap-1.5">
              <Info className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
              <span>
                <strong>Brak natychmiastowej opłaty:</strong> Rezerwacja trafia do lokalu z prośbą o akceptację. Zaliczka płatna po potwierdzeniu przez menedżera lokalu.
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-extrabold text-sm rounded-xl shadow-xl shadow-brand-500/20 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Wyślij zgłoszenie rezerwacji</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
