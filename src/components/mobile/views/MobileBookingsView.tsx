import React from 'react';
import { BookingRequest } from '../../../types';
import { Calendar, Clock, CheckCircle2, XCircle, AlertTriangle, MapPin, Phone, Mail, ChevronRight, Ban } from 'lucide-react';

interface Props {
  bookings: BookingRequest[];
  onCancelBooking: (bookingId: string) => void;
  onExploreVenues: () => void;
}

export const MobileBookingsView: React.FC<Props> = ({ bookings, onCancelBooking, onExploreVenues }) => {
  if (bookings.length === 0) {
    return (
      <div className="p-6 text-center py-20">
        <div className="w-16 h-16 rounded-full bg-brand-50 border border-brand-200 flex items-center justify-center mx-auto text-brand-600 mb-4 shadow-sm">
          <Calendar className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900">Brak historii rezerwacji</h3>
        <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto font-medium">
          Nie wysłałeś jeszcze żadnego zapytania o termin. Przejrzyj lokalne restauracje i sale na imprezę.
        </p>
        <button
          onClick={onExploreVenues}
          className="mt-4 py-2.5 px-5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-600/20"
        >
          Przeglądaj lokale
        </button>
      </div>
    );
  }

  const getStatusBadge = (status: BookingRequest['status']) => {
    switch (status) {
      case 'Oczekuje':
        return (
          <span className="bg-amber-50 text-amber-800 border border-amber-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 animate-pulse">
            <Clock className="w-3 h-3 text-amber-600" /> OCZEKUJE NA LOKAL
          </span>
        );
      case 'Potwierdzona':
        return (
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> POTWIERDZONA!
          </span>
        );
      case 'Odrzucona':
        return (
          <span className="bg-rose-50 text-rose-800 border border-rose-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
            <XCircle className="w-3 h-3 text-rose-600" /> ODRZUCONA PRZEZ LOKAL
          </span>
        );
      case 'Anulowana':
        return (
          <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Ban className="w-3 h-3" /> ANULOWANA
          </span>
        );
    }
  };

  return (
    <div className="pb-24 pt-2">
      {/* Header */}
      <div className="px-4 mb-4">
        <span className="text-[11px] font-extrabold tracking-wider uppercase text-brand-600">Twoje Zgłoszenia</span>
        <h2 className="text-xl font-extrabold text-slate-900">Moje Rezerwacje ({bookings.length})</h2>
      </div>

      <div className="px-4 space-y-4">
        {bookings.map((b) => (
          <div key={b.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-md space-y-3 relative overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <img src={b.venueImage} alt={b.venueName} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{b.venueName}</h3>
                  <span className="text-[11px] text-slate-600 font-medium capitalize">
                    Wydarzenie: <strong className="text-slate-900">{b.eventType}</strong>
                  </span>
                </div>
              </div>
              {getStatusBadge(b.status)}
            </div>

            {/* Event Info Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Data i Termin</span>
                <span className="font-bold text-amber-800 text-xs flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" /> {b.date}
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Pakiet i Goście</span>
                <span className="font-bold text-slate-900 text-xs mt-0.5 block truncate">
                  {b.guestsCount} osób • {b.packageName}
                </span>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-500 font-medium block">Szacowana kwota całości:</span>
                <span className="font-black text-slate-900 text-sm">{b.estimatedTotal.toLocaleString()} zł</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 font-medium block">Wymagana zaliczka:</span>
                <span className="font-extrabold text-amber-800">{b.depositAmount.toLocaleString()} zł</span>
              </div>
            </div>

            {/* Special notes / response */}
            {b.venueResponseNote && (
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs text-emerald-900">
                <strong className="block font-bold mb-0.5 text-emerald-800">Wiadomość od Lokalu:</strong>
                <p className="text-[11px] text-emerald-900 font-medium">{b.venueResponseNote}</p>
              </div>
            )}

            {/* Cancel Action */}
            {b.status === 'Oczekuje' && (
              <div className="pt-1 text-right">
                <button
                  onClick={() => onCancelBooking(b.id)}
                  className="text-xs text-rose-700 hover:text-rose-800 font-extrabold px-3 py-1 rounded-lg bg-rose-50 border border-rose-200"
                >
                  Anuluj zgłoszenie
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
