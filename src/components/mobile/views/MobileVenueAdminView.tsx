import React, { useState } from 'react';
import {
  Venue,
  BookingRequest,
  MenuDishChoiceGroup,
  MenuItem,
  MenuCategory,
} from '../../../types';
import {
  Calendar,
  CheckCircle2,
  Check,
  X,
  Pencil,
  Eye,
  EyeOff,
  Plus,
  UtensilsCrossed,
} from 'lucide-react';
import type { AdminSection } from '../BottomNav';

interface Props {
  venue: Venue;
  bookings: BookingRequest[];
  /** Sekcja sterowana z dolnego BottomNav (tryb manager) */
  section: AdminSection;
  onAcceptBooking: (bookingId: string, note?: string) => void;
  onRejectBooking: (bookingId: string, note?: string) => void;
  onUpdateVenuePrice: (venueId: string, packageId: string, newPrice: number) => void;
  onUpdatePackageMenu: (
    venueId: string,
    packageId: string,
    choiceGroups: MenuDishChoiceGroup[]
  ) => void;
  onToggleDateAvailability: (venueId: string, date: string) => void;
}

const DEFAULT_CATEGORY: MenuCategory = 'Danie Główne';

export const MobileVenueAdminView: React.FC<Props> = ({
  venue,
  bookings,
  section: activeTab,
  onAcceptBooking,
  onRejectBooking,
  onUpdateVenuePrice,
  onUpdatePackageMenu,
  onToggleDateAvailability,
}) => {
  const [responseNotes, setResponseNotes] = useState<{ [key: string]: string }>({});
  const [editingPricePkgId, setEditingPricePkgId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  const [menuPkgId, setMenuPkgId] = useState<string>(venue.packages[0]?.id ?? '');
  const [editingDishKey, setEditingDishKey] = useState<string | null>(null);
  const [editDishName, setEditDishName] = useState('');
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);

  const venueBookings = bookings.filter((b) => b.venueId === venue.id);
  const pendingRequests = venueBookings.filter((b) => b.status === 'Oczekuje');
  const confirmedRequests = venueBookings.filter((b) => b.status === 'Potwierdzona');

  const menuPackage =
    venue.packages.find((p) => p.id === menuPkgId) ?? venue.packages[0];
  const choiceGroups = menuPackage?.choiceGroups ?? [];

  const handleAccept = (bookingId: string) => {
    const note =
      responseNotes[bookingId] ||
      'Dziękujemy! Rezerwacja została zaakceptowana. Przesłaliśmy szczegóły płatności zaliczki.';
    onAcceptBooking(bookingId, note);
  };

  const handleReject = (bookingId: string) => {
    const note =
      responseNotes[bookingId] ||
      'Przepraszamy, ten termin jest już niedostępny lub sala jest zarezerwowana na inne wydarzenie.';
    onRejectBooking(bookingId, note);
  };

  const commitChoiceGroups = (next: MenuDishChoiceGroup[]) => {
    if (!menuPackage) return;
    onUpdatePackageMenu(venue.id, menuPackage.id, next);
  };

  const patchDish = (
    groupId: string,
    dishId: string,
    patch: Partial<MenuItem>
  ) => {
    commitChoiceGroups(
      choiceGroups.map((g) =>
        g.id !== groupId
          ? g
          : {
              ...g,
              dishes: g.dishes.map((d) =>
                d.id === dishId ? { ...d, ...patch } : d
              ),
            }
      )
    );
  };

  const toggleDishHidden = (groupId: string, dish: MenuItem) => {
    if (!dish.id) return;
    patchDish(groupId, dish.id, { hidden: !dish.hidden });
  };

  const saveDishName = (groupId: string, dishId: string) => {
    const name = editDishName.trim();
    if (name) patchDish(groupId, dishId, { name });
    setEditingDishKey(null);
  };

  const addDish = (groupId: string) => {
    const group = choiceGroups.find((g) => g.id === groupId);
    const category = group?.dishes[0]?.category ?? DEFAULT_CATEGORY;
    const newDish: MenuItem = {
      id: `custom-${Date.now()}`,
      category,
      name: 'Nowe danie',
      description: 'Dodane z panelu lokalu (mock).',
      hidden: false,
    };
    commitChoiceGroups(
      choiceGroups.map((g) =>
        g.id !== groupId ? g : { ...g, dishes: [...g.dishes, newDish] }
      )
    );
    setExpandedGroupId(groupId);
    setEditingDishKey(`${groupId}::${newDish.id}`);
    setEditDishName(newDish.name);
  };

  return (
    <div className="pb-24 pt-2">
      <div className="px-4 mb-4 bg-gradient-to-r from-amber-950/80 via-rose-950/50 to-orange-950/60 p-4 rounded-2xl border border-amber-600/50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-600/50 flex items-center justify-center text-amber-400 font-extrabold text-lg shadow-xs">
            🏢
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-amber-300 tracking-wider">
              Panel Menedżera Lokalu
            </span>
            <h2 className="text-base font-extrabold text-slate-100">{venue.name}</h2>
            <p className="text-[11px] text-slate-400 font-medium">
              {venue.city} • {venue.address}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-700 text-center">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Oczekujące</span>
            <p className="text-sm font-black text-amber-400">{pendingRequests.length}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Potwierdzone</span>
            <p className="text-sm font-black text-emerald-300">{confirmedRequests.length}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Cena od</span>
            <p className="text-sm font-black text-slate-100">{venue.priceFrom} zł</p>
          </div>
        </div>
      </div>

      {activeTab === 'requests' && (
        <div className="px-4 space-y-4">
          {pendingRequests.length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-xs bg-slate-900 rounded-2xl border border-slate-700 p-6 shadow-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              Brak nowych oczekujących zapytań! Wszystkie zgłoszenia zostały obsłużone.
            </div>
          ) : (
            pendingRequests.map((b) => (
              <div
                key={b.id}
                className="bg-slate-900 border border-amber-600/50 rounded-2xl p-4 shadow-md space-y-3 relative"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-amber-300 tracking-wider">
                      Nowe Zapytanie • {b.eventType}
                    </span>
                    <h3 className="text-sm font-extrabold text-slate-100 mt-0.5">{b.clientName}</h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {b.clientEmail} • {b.clientPhone}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-slate-100 block">{b.date}</span>
                    <span className="text-[10px] text-amber-300 font-bold">{b.guestsCount} osób</span>
                  </div>
                </div>

                <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700 text-xs flex justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block">Pakiet:</span>
                    <span className="font-bold text-slate-100">{b.packageName}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold block">Wartość:</span>
                    <span className="font-black text-brand-600">
                      {b.estimatedTotal.toLocaleString()} zł
                    </span>
                  </div>
                </div>

                {b.specialRequests && (
                  <div className="text-xs text-slate-300 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700">
                    <strong className="text-slate-400 text-[10px] uppercase font-bold block">
                      Uwagi klienta:
                    </strong>
                    „{b.specialRequests}”
                  </div>
                )}

                <div>
                  <input
                    type="text"
                    placeholder="Wpisz opcjonalną treść odpowiedzi do klienta..."
                    value={responseNotes[b.id] || ''}
                    onChange={(e) =>
                      setResponseNotes({ ...responseNotes, [b.id]: e.target.value })
                    }
                    className="w-full bg-slate-800/60 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-100 outline-none focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleReject(b.id)}
                    className="py-2.5 px-3 bg-rose-900/40 hover:bg-rose-100 text-rose-200 border border-rose-700/50 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Odrzuć termin</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAccept(b.id)}
                    className="py-2.5 px-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-brand-600/20 transition-transform active:scale-98"
                  >
                    <Check className="w-4 h-4" />
                    <span>Akceptuj Rezerwację</span>
                  </button>
                </div>
              </div>
            ))
          )}

          {confirmedRequests.length > 0 && (
            <div className="pt-4 border-t border-slate-700 space-y-3">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                Historia Potwierdzonych Rezerwacji ({confirmedRequests.length})
              </h4>
              {confirmedRequests.map((b) => (
                <div
                  key={b.id}
                  className="bg-slate-900 border border-slate-700 rounded-xl p-3 flex items-center justify-between shadow-xs"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-100">
                      {b.clientName} ({b.eventType})
                    </h4>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {b.date} • {b.guestsCount} osób • {b.estimatedTotal} zł
                    </p>
                  </div>
                  <span className="bg-emerald-900/40 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-700/50">
                    Potwierdzona
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'calendar' && (
        <div className="px-4 space-y-3">
          <div className="text-xs text-slate-400 font-medium mb-2">
            Zarządzaj dostępnością wolnych terminów. Kliknij, aby zablokować lub odblokować sobotę:
          </div>
          <div className="space-y-2">
            {[
              '2026-08-01',
              '2026-08-08',
              '2026-08-15',
              '2026-08-22',
              '2026-08-29',
              '2026-09-05',
              '2026-09-12',
            ].map((d) => {
              const isBlocked = venue.blockedDates.includes(d);
              return (
                <div
                  key={d}
                  onClick={() => onToggleDateAvailability(venue.id, d)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isBlocked
                      ? 'bg-slate-800 border-slate-700 text-slate-400'
                      : 'bg-emerald-900/40 border-emerald-700/50 text-emerald-900 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">Sobota, {d}</span>
                  </div>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      isBlocked
                        ? 'bg-rose-100 text-rose-200 border border-rose-700/50'
                        : 'bg-emerald-100 text-emerald-200'
                    }`}
                  >
                    {isBlocked ? 'Zajęty / Zablokowany' : 'WOLNY TERMIN'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'pricing' && (
        <div className="px-4 space-y-3">
          <div className="text-xs text-slate-400 font-medium mb-2">
            Edycja cennika pakietów (cena / osoba). Kartę dań edytujesz w zakładce Menu.
          </div>
          {venue.packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-slate-900 border border-slate-700 rounded-xl p-3 space-y-2 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-100 text-xs">{pkg.name}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {pkg.features.length} składników w cenie
                  </span>
                </div>
                {editingPricePkgId === pkg.id ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={tempPrice}
                      onChange={(e) => setTempPrice(parseInt(e.target.value) || 0)}
                      className="w-16 bg-slate-800/60 border border-brand-500 rounded p-1 text-xs text-slate-100 text-right font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateVenuePrice(venue.id, pkg.id, tempPrice);
                        setEditingPricePkgId(null);
                      }}
                      className="p-1 bg-brand-600 text-white rounded"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPricePkgId(pkg.id);
                      setTempPrice(pkg.pricePerPerson);
                    }}
                    className="text-right cursor-pointer group"
                  >
                    <span className="text-sm font-black text-brand-600 group-hover:underline">
                      {pkg.pricePerPerson} zł
                    </span>
                    <span className="text-[9px] text-slate-400 block font-medium">
                      / osoba (edytuj)
                    </span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'menu' && (
        <div className="px-4 space-y-3">
          <div className="flex items-start gap-2 bg-amber-900/40 border border-amber-700/50 rounded-xl p-3">
            <UtensilsCrossed className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-200 font-medium leading-snug">
              Zarządzanie kartą dań — edycja, ukrywanie i dodawanie pozycji. Klient widzi tylko
              dania oznaczone jako widoczne.
            </p>
          </div>

          <div>
            <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block mb-1.5">
              Pakiet
            </span>
            <div className="flex flex-wrap gap-1.5">
              {venue.packages.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => {
                    setMenuPkgId(pkg.id);
                    setEditingDishKey(null);
                    setExpandedGroupId(null);
                  }}
                  className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition-colors ${
                    menuPackage?.id === pkg.id
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-slate-900 text-slate-300 border-slate-700'
                  }`}
                >
                  {pkg.name}
                </button>
              ))}
            </div>
          </div>

          {!menuPackage || choiceGroups.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs bg-slate-900 rounded-2xl border border-slate-700 p-4">
              Ten pakiet nie ma jeszcze grup wyboru dań (`choiceGroups`).
            </div>
          ) : (
            choiceGroups.map((group) => {
              const isOpen = expandedGroupId === null ? true : expandedGroupId === group.id;
              return (
                <div
                  key={group.id}
                  className="bg-slate-900 border border-slate-700 rounded-xl shadow-xs overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedGroupId((prev) => (prev === group.id ? null : group.id))
                    }
                    className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-slate-800/60"
                  >
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-100">{group.title}</h4>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {group.dishes.length} pozycji ·{' '}
                        {group.dishes.filter((d) => !d.hidden).length} widocznych
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-brand-600">
                      {isOpen ? 'Zwiń' : 'Rozwiń'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-700 px-3 pb-3 space-y-2 pt-2">
                      {group.dishes.map((dish) => {
                        const dishKey = `${group.id}::${dish.id}`;
                        const isEditing = editingDishKey === dishKey;
                        return (
                          <div
                            key={dish.id ?? dish.name}
                            className={`rounded-xl border p-2.5 ${
                              dish.hidden
                                ? 'bg-slate-800/60 border-slate-700 opacity-80'
                                : 'bg-slate-900 border-slate-700'
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <div className="flex-1 min-w-0">
                                {isEditing && dish.id ? (
                                  <div className="flex items-center gap-1">
                                    <input
                                      value={editDishName}
                                      onChange={(e) => setEditDishName(e.target.value)}
                                      className="flex-1 bg-slate-800/60 border border-brand-400 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-100 outline-none"
                                      autoFocus
                                    />
                                    <button
                                      type="button"
                                      onClick={() => saveDishName(group.id, dish.id!)}
                                      className="p-1.5 bg-brand-600 text-white rounded-lg"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ) : (
                                  <p className="text-xs font-extrabold text-slate-100 truncate">
                                    {dish.name}
                                  </p>
                                )}
                                <div className="flex flex-wrap gap-1 mt-1">
                                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                    {dish.category}
                                  </span>
                                  <span
                                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                                      dish.hidden
                                        ? 'bg-slate-800 text-slate-400 border-slate-700'
                                        : 'bg-emerald-900/40 text-emerald-200 border-emerald-700/50'
                                    }`}
                                  >
                                    {dish.hidden ? 'Ukryte' : 'Widoczne dla gości'}
                                  </span>
                                  {(dish.tags ?? []).slice(0, 2).map((t) => (
                                    <span
                                      key={t}
                                      className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-900/40 text-brand-300 border border-brand-700/50"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  type="button"
                                  title="Edytuj nazwę"
                                  onClick={() => {
                                    if (!dish.id) return;
                                    setEditingDishKey(dishKey);
                                    setEditDishName(dish.name);
                                  }}
                                  className="p-1.5 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800/60"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  title={dish.hidden ? 'Pokaż gościom' : 'Ukryj przed gośćmi'}
                                  onClick={() => toggleDishHidden(group.id, dish)}
                                  className={`p-1.5 rounded-lg border ${
                                    dish.hidden
                                      ? 'border-slate-600 text-slate-400 bg-slate-800'
                                      : 'border-emerald-700/50 text-emerald-300 bg-emerald-900/40'
                                  }`}
                                >
                                  {dish.hidden ? (
                                    <EyeOff className="w-3.5 h-3.5" />
                                  ) : (
                                    <Eye className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() => addDish(group.id)}
                        className="w-full py-2 rounded-xl border border-dashed border-brand-600/50 text-brand-300 text-[11px] font-bold flex items-center justify-center gap-1.5 hover:bg-brand-900/40 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Dodaj danie do grupy
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
