import React, { useEffect, useMemo, useState } from 'react';
import { Venue, OfferPackage, MenuItem, MenuModifierGroup, MenuDishChoiceGroup } from '../../../types';
import { Star, MapPin, Check, Scale, ChevronRight, ChevronDown, Utensils, Plus } from 'lucide-react';
import { groupMenuByCategory, MENU_TAG_LABELS } from '../../../data/menuSamples';

interface Props {
  venue: Venue;
  onClose: () => void;
  onStartBooking: (venue: Venue, selectedPackage: OfferPackage, selectedDate?: string) => void;
  compareList: string[];
  onToggleCompare: (venueId: string) => void;
}

const TAG_STYLES: Record<string, string> = {
  wege: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  bezgluten: 'bg-sky-50 text-sky-700 border-sky-200',
  premium: 'bg-amber-50 text-amber-800 border-amber-200',
  'dla-dzieci': 'bg-violet-50 text-violet-700 border-violet-200',
  ostre: 'bg-rose-50 text-rose-700 border-rose-200',
};

function MenuTagBadges({ tags }: { tags?: MenuItem['tags'] }) {
  if (!tags?.length) return null;
  return (
    <div className="flex flex-wrap gap-1 mt-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${TAG_STYLES[tag] ?? 'bg-slate-50 text-slate-600 border-slate-200'}`}
        >
          {MENU_TAG_LABELS[tag]}
        </span>
      ))}
    </div>
  );
}

function modifierKey(packageId: string, itemIndex: string, groupId: string) {
  return `${packageId}::${itemIndex}::${groupId}`;
}

function DishModifiers({
  packageId,
  itemKey,
  groups,
  selections,
  onToggle,
  title,
}: {
  packageId: string;
  itemKey: string;
  groups: MenuModifierGroup[];
  selections: Record<string, string[]>;
  onToggle: (key: string, optionId: string, group: MenuModifierGroup) => void;
  /** np. nazwa dania — nagłówek „Dodatki do: …” */
  title?: string;
}) {
  const [open, setOpen] = useState(false);

  const selectedCount = groups.reduce((n, group) => {
    const key = modifierKey(packageId, itemKey, group.id);
    const selected = selections[key] ?? [];
    const exclusiveIds = new Set(group.options.filter((o) => o.clearsOthers).map((o) => o.id));
    const real = selected.filter((id) => !exclusiveIds.has(id));
    return n + real.length;
  }, 0);

  const onlyExclusive = groups.some((group) => {
    const key = modifierKey(packageId, itemKey, group.id);
    const selected = selections[key] ?? [];
    if (selected.length === 0) return false;
    return selected.every((id) => group.options.find((o) => o.id === id)?.clearsOthers);
  });

  const headerLabel = title ? `Dodatki do: ${title}` : 'Dodatki';

  return (
    <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-slate-50 transition-colors"
      >
        <Plus className="w-3.5 h-3.5 text-brand-600 shrink-0" />
        <span className="flex-1 min-w-0 text-[10px] font-black uppercase tracking-wider text-slate-600 truncate">
          {headerLabel}
        </span>
        {onlyExclusive && (
          <span className="shrink-0 text-[9px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
            bez dodatków
          </span>
        )}
        {selectedCount > 0 && (
          <span className="shrink-0 text-[9px] font-bold text-brand-700 bg-brand-50 border border-brand-200 px-1.5 py-0.5 rounded">
            {selectedCount} wybrane
          </span>
        )}
        <ChevronDown
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-2.5 border-t border-slate-100 pt-2.5">
          {groups.map((group) => {
            const key = modifierKey(packageId, itemKey, group.id);
            const selected = selections[key] ?? [];
            const max = group.maxSelect ?? 1;
            return (
              <div key={group.id}>
                <div className="flex items-center gap-1 mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-600">
                    {group.title}
                  </span>
                  {max > 1 && (
                    <span className="text-[9px] text-slate-400 font-medium">(do {max})</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.options.map((opt) => {
                    const isOn = selected.includes(opt.id);
                    const isExclusive = !!opt.clearsOthers;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggle(key, opt.id, group);
                        }}
                        className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition-colors text-left ${
                          isOn
                            ? isExclusive
                              ? 'bg-slate-700 text-white border-slate-700 shadow-sm'
                              : 'bg-brand-600 text-white border-brand-600 shadow-sm'
                            : isExclusive
                              ? 'bg-white text-slate-600 border-slate-300 border-dashed hover:border-slate-400'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-brand-300'
                        }`}
                      >
                        {opt.label}
                        {opt.priceExtra != null && opt.priceExtra > 0 && (
                          <span className={`ml-1 ${isOn ? 'text-brand-100' : 'text-brand-600'}`}>
                            +{opt.priceExtra} zł
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DishChoiceSection({
  group,
  selectedId,
  onSelect,
  packageId,
  modifierSelections,
  onToggleModifier,
}: {
  group: MenuDishChoiceGroup;
  selectedId: string | undefined;
  onSelect: (dishId: string) => void;
  packageId: string;
  modifierSelections: Record<string, string[]>;
  onToggleModifier: (key: string, optionId: string, group: MenuModifierGroup) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedDish = group.dishes.find((d) => d.id === selectedId) ?? group.dishes[0];

  return (
    <div className="space-y-2">
      <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-slate-50 transition-colors"
        >
          {selectedDish?.imageUrl ? (
            <img
              src={selectedDish.imageUrl}
              alt=""
              className="w-11 h-11 rounded-lg object-cover shrink-0 bg-slate-100"
            />
          ) : (
            <div className="w-11 h-11 rounded-lg bg-brand-50 flex items-center justify-center shrink-0">
              <Utensils className="w-4 h-4 text-brand-600" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-black uppercase tracking-wider text-brand-700">
              {group.title}
            </div>
            <div className="text-xs font-extrabold text-slate-900 truncate mt-0.5">
              {selectedDish?.name ?? 'Wybierz danie'}
            </div>
            {!open && (
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                Dotknij, aby zmienić
              </div>
            )}
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div className="border-t border-slate-100 px-2.5 pb-2.5 pt-2 space-y-2">
            <p className="text-[11px] text-slate-500 font-medium px-0.5">
              Wybierz jedno danie — lista zwinie się po wyborze.
            </p>
            {group.dishes.map((dish) => {
              const isOn = dish.id === selectedDish?.id;
              return (
                <button
                  key={dish.id}
                  type="button"
                  onClick={() => {
                    if (dish.id) onSelect(dish.id);
                    setOpen(false);
                  }}
                  className={`w-full text-left rounded-xl border overflow-hidden transition-all ${
                    isOn
                      ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500/30 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-brand-300'
                  }`}
                >
                  <div className="flex">
                    {dish.imageUrl && (
                      <img
                        src={dish.imageUrl}
                        alt={dish.name}
                        className="w-20 h-20 object-cover shrink-0 bg-slate-100"
                      />
                    )}
                    <div className="p-3 flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          className={`text-xs font-extrabold leading-snug ${
                            isOn ? 'text-brand-900' : 'text-slate-900'
                          }`}
                        >
                          {dish.name}
                        </h4>
                        {isOn && (
                          <span className="shrink-0 bg-brand-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded">
                            WYBRANE
                          </span>
                        )}
                      </div>
                      {dish.description && (
                        <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                          {dish.description}
                        </p>
                      )}
                      <MenuTagBadges tags={dish.tags} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selectedDish?.modifiers && selectedDish.modifiers.length > 0 && (
        <DishModifiers
          key={selectedDish.id}
          packageId={packageId}
          itemKey={`choice:${selectedDish.id}`}
          groups={selectedDish.modifiers}
          selections={modifierSelections}
          onToggle={onToggleModifier}
          title={selectedDish.name}
        />
      )}
    </div>
  );
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
  const [modifierSelections, setModifierSelections] = useState<Record<string, string[]>>({});
  /** choiceGroupId → wybrane dish.id (np. pieczen ALBO pierogi) */
  const [dishChoices, setDishChoices] = useState<Record<string, string>>({});

  const isComparing = compareList.includes(venue.id);
  const menuGroups = groupMenuByCategory(selectedPackage.menu.filter((m) => !m.hidden));
  const choiceGroups = (selectedPackage.choiceGroups ?? [])
    .map((g) => ({ ...g, dishes: g.dishes.filter((d) => !d.hidden) }))
    .filter((g) => g.dishes.length > 0);

  useEffect(() => {
    setSelectedPackage((prev) => {
      const pkg = venue.packages.find((p) => p.id === prev.id) ?? venue.packages[0];
      return pkg ?? prev;
    });
  }, [venue]);

  useEffect(() => {
    const next: Record<string, string> = {};
    for (const g of (selectedPackage.choiceGroups ?? [])
      .map((g) => ({ ...g, dishes: g.dishes.filter((d) => !d.hidden) }))
      .filter((g) => g.dishes.length > 0)) {
      const first = g.dishes[0]?.id;
      if (first) next[g.id] = first;
    }
    setDishChoices((prev) => {
      const merged = { ...next };
      for (const [gid, dishId] of Object.entries(prev)) {
        const g = (selectedPackage.choiceGroups ?? []).find((x) => x.id === gid);
        if (g?.dishes.some((d) => d.id === dishId && !d.hidden)) {
          merged[gid] = dishId;
        }
      }
      return merged;
    });
  }, [selectedPackage]);

  const modifiersExtraTotal = useMemo(() => {
    let sum = 0;
    const resolveItem = (itemKey: string): MenuItem | undefined => {
      if (itemKey.startsWith('choice:')) {
        const dishId = itemKey.slice('choice:'.length);
        for (const g of choiceGroups) {
          const d = g.dishes.find((x) => x.id === dishId);
          if (d) return d;
        }
        return undefined;
      }
      for (const { category, items } of menuGroups) {
        for (let idx = 0; idx < items.length; idx++) {
          if (`${category}-${idx}` === itemKey) return items[idx];
        }
      }
      return undefined;
    };
    for (const [key, optionIds] of Object.entries(modifierSelections)) {
      if (!key.startsWith(`${selectedPackage.id}::`)) continue;
      const [, itemKey, groupId] = key.split('::');
      const item = resolveItem(itemKey);
      const group = item?.modifiers?.find((g) => g.id === groupId);
      if (!group) continue;
      for (const oid of optionIds) {
        const opt = group.options.find((o) => o.id === oid);
        if (!opt || opt.clearsOthers) continue;
        if (opt.priceExtra) sum += opt.priceExtra;
      }
    }
    return sum;
  }, [modifierSelections, selectedPackage.id, dishChoices, menuGroups, choiceGroups]);

  const openFullMenu = (pkg: OfferPackage) => {
    setSelectedPackage(pkg);
    setActiveTab('menu');
  };

  const toggleModifier = (key: string, optionId: string, group: MenuModifierGroup) => {
    setModifierSelections((prev) => {
      const current = prev[key] ?? [];
      const option = group.options.find((o) => o.id === optionId);
      const exclusiveIds = new Set(
        group.options.filter((o) => o.clearsOthers).map((o) => o.id)
      );
      const maxSelect = group.maxSelect ?? 1;

      if (current.includes(optionId)) {
        return { ...prev, [key]: current.filter((id) => id !== optionId) };
      }

      if (option?.clearsOthers) {
        return { ...prev, [key]: [optionId] };
      }

      let next = current.filter((id) => !exclusiveIds.has(id));
      if (maxSelect <= 1) {
        return { ...prev, [key]: [optionId] };
      }
      if (next.length >= maxSelect) {
        next = [...next.slice(1), optionId];
      } else {
        next = [...next, optionId];
      }
      return { ...prev, [key]: next };
    });
  };

  return (
    <div className="absolute inset-0 z-40 bg-white flex flex-col animate-fade-in h-full">
      <div className="flex-none bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-200 flex items-center justify-between z-30">
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-slate-700 hover:text-slate-900 text-xs font-semibold bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm active:scale-95"
        >
          ✕ Zamknij
        </button>
        <span className="text-xs font-bold text-slate-800 truncate max-w-[150px]">{venue.name}</span>
        <button
          onClick={() => onToggleCompare(venue.id)}
          className={`p-2 rounded-full border text-xs transition-colors ${
            isComparing ? 'bg-amber-50 border-amber-500 text-amber-600' : 'bg-white border-slate-200 text-slate-500 shadow-sm'
          }`}
        >
          <Scale className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        <div className="relative h-64 w-full bg-slate-100 flex-none">
          <img
            src={venue.images[activeImageIdx]}
            alt={venue.name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-black/10" />

          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {venue.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === activeImageIdx ? 'w-6 bg-brand-600' : 'w-1.5 bg-white/70 shadow-sm'
                }`}
              />
            ))}
          </div>

          <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-amber-600 flex items-center gap-1 shadow-sm border border-slate-100">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{venue.rating}</span>
            <span className="text-slate-500 font-normal">({venue.reviewCount} opinii)</span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2">
            <span className="bg-brand-50 text-brand-700 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border border-brand-200">
              {venue.category}
            </span>
            <span className="text-xs text-slate-500 font-medium">miasto {venue.city}</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mt-1">{venue.name}</h2>
          <p className="text-xs text-slate-600 flex items-center gap-1 mt-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
            <span>{venue.address}</span>
          </p>

          <div className="grid grid-cols-3 gap-2 my-4">
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center shadow-sm">
              <span className="text-[10px] text-slate-500 uppercase font-bold text-center block tracking-tight">Cena od</span>
              <p className="text-xs font-extrabold text-brand-700 mt-0.5 whitespace-nowrap">{venue.priceFrom} zł <span className="text-[8px] font-normal text-slate-500">/ os.</span></p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center shadow-sm">
              <span className="text-[10px] text-slate-500 uppercase font-bold text-center block tracking-tight">Pojemność</span>
              <p className="text-xs font-extrabold text-amber-700 mt-0.5">do {venue.maxGuests} os.</p>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5 text-center shadow-sm">
              <span className="text-[10px] text-slate-500 uppercase font-bold text-center block tracking-tight">Zaliczka</span>
              <p className="text-xs font-extrabold text-slate-800 mt-0.5">{selectedPackage.depositPercent}%</p>
            </div>
          </div>

          <div className="flex border-b border-slate-200 mb-4 sticky top-0 bg-white z-20 pt-1">
            <button
              onClick={() => setActiveTab('packages')}
              className={`flex-1 py-2 text-[11px] font-bold border-b-2 text-center transition-colors ${
                activeTab === 'packages' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400'
              }`}
            >
              Pakiety
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`flex-1 py-2 text-[11px] font-bold border-b-2 text-center transition-colors ${
                activeTab === 'menu' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400'
              }`}
            >
              Menu
            </button>
            <button
              onClick={() => setActiveTab('dates')}
              className={`flex-1 py-2 text-[11px] font-bold border-b-2 text-center transition-colors ${
                activeTab === 'dates' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400'
              }`}
            >
              Terminy
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 py-2 text-[11px] font-bold border-b-2 text-center transition-colors ${
                activeTab === 'about' ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-400'
              }`}
            >
              O Lokalu
            </button>
          </div>

          {activeTab === 'packages' && (
            <div className="space-y-3">
              {venue.packages.map((pkg) => {
                const isSelected = selectedPackage.id === pkg.id;
                const preview = (pkg.choiceGroups ?? []).flatMap((g) =>
                  g.dishes
                    .filter((d) => !d.hidden)
                    .slice(0, 1)
                    .map((d) => ({
                      category: g.title.replace(/^Wybierz\s+/i, ''),
                      name: d.name,
                    }))
                ).slice(0, 5);
                const hasMods =
                  (pkg.choiceGroups?.some((g) =>
                    g.dishes.some((d) => !d.hidden && d.modifiers?.length)
                  ) ?? false) ||
                  pkg.menu.some((m) => !m.hidden && m.modifiers && m.modifiers.length > 0);
                const choiceLabels = (pkg.choiceGroups ?? [])
                  .map((g) => g.title.replace(/^Wybierz\s+/i, ''))
                  .join(' · ');
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-brand-50 border-brand-500 shadow-md ring-1 ring-brand-500/30'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-extrabold text-sm flex items-center gap-2 ${isSelected ? 'text-brand-900' : 'text-slate-900'}`}>
                          {pkg.name}
                          {isSelected && <span className="bg-brand-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">WYBRANY</span>}
                        </h4>
                        <p className={`text-[11px] mt-0.5 font-medium ${isSelected ? 'text-brand-700' : 'text-slate-500'}`}>Czas: {pkg.durationHours}h • Min. {pkg.minGuests} osób</p>
                      </div>
                      <div className="text-right ml-2">
                        <span className={`text-base font-black ${isSelected ? 'text-brand-800' : 'text-brand-600'}`}>{pkg.pricePerPerson} zł</span>
                        <span className={`block text-[9px] font-bold ${isSelected ? 'text-brand-700' : 'text-slate-500'}`}>/ os.</span>
                      </div>
                    </div>

                    <ul className={`mt-3 space-y-1.5 text-[11px] border-t pt-2.5 ${isSelected ? 'text-brand-800 border-brand-200' : 'text-slate-700 border-slate-100'}`}>
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-brand-700' : 'text-brand-600'}`} />
                          <span className="font-medium">{feat}</span>
                        </li>
                      ))}
                      {hasMods && (
                        <li className="flex items-center gap-2">
                          <Plus className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-brand-700' : 'text-brand-600'}`} />
                          <span className="font-medium">
                            {choiceLabels
                              ? `Wybór w kategoriach: ${choiceLabels}`
                              : 'Możliwość wyboru dodatków do dań'}
                          </span>
                        </li>
                      )}
                    </ul>

                    {preview.length > 0 && (
                      <div className={`mt-3 pt-2.5 border-t ${isSelected ? 'border-brand-200' : 'border-slate-100'}`}>
                        <div className="flex items-center gap-1.5 mb-2">
                          <Utensils className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-700' : 'text-slate-500'}`} />
                          <span className={`text-[10px] font-black uppercase tracking-wider ${isSelected ? 'text-brand-800' : 'text-slate-500'}`}>
                            Skrót menu
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {preview.map((item, i) => (
                            <li key={i} className={`text-[11px] font-medium flex items-start gap-1.5 ${isSelected ? 'text-brand-900' : 'text-slate-700'}`}>
                              <span className="text-slate-400 shrink-0">•</span>
                              <span>
                                <span className="text-slate-500 font-bold text-[9px] uppercase">{item.category}: </span>
                                {item.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openFullMenu(pkg);
                          }}
                          className={`mt-2.5 text-[11px] font-bold flex items-center gap-1 ${
                            isSelected ? 'text-brand-700' : 'text-brand-600'
                          }`}
                        >
                          Pełne menu pakietu
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
                <span className="text-[11px] text-slate-700 font-bold uppercase tracking-tight">Pakiet: {selectedPackage.name}</span>
                <div className="text-right">
                  <span className="text-xs font-black text-brand-700 block">{selectedPackage.pricePerPerson} zł/os.</span>
                  {modifiersExtraTotal > 0 && (
                    <span className="text-[9px] font-bold text-amber-700">+ dodatki ~{modifiersExtraTotal} zł/os.</span>
                  )}
                </div>
              </div>

              {venue.packages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                  {venue.packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold border transition-colors ${
                        selectedPackage.id === pkg.id
                          ? 'bg-brand-600 text-white border-brand-600'
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      {pkg.name.replace(/Pakiet\s+/i, '')}
                    </button>
                  ))}
                </div>
              )}

              {choiceGroups.length === 0 && menuGroups.length === 0 && (
                <p className="text-xs text-slate-500 font-medium text-center py-6">Brak pozycji menu dla tego pakietu.</p>
              )}

              {choiceGroups.map((group) => (
                <DishChoiceSection
                  key={`${selectedPackage.id}-${group.id}`}
                  group={group}
                  selectedId={dishChoices[group.id] ?? group.dishes[0]?.id}
                  onSelect={(dishId) =>
                    setDishChoices((prev) => ({ ...prev, [group.id]: dishId }))
                  }
                  packageId={selectedPackage.id}
                  modifierSelections={modifierSelections}
                  onToggleModifier={toggleModifier}
                />
              ))}

              {menuGroups.map(({ category, items }) => (
                <div key={category}>
                  <h3 className="text-[10px] font-black uppercase tracking-wider text-amber-700 mb-2 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5" />
                    {category}
                  </h3>
                  <div className="space-y-2.5">
                    {items.map((item, idx) => {
                      const itemKey = `${category}-${idx}`;
                      return (
                        <div key={itemKey} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                          <div className="flex">
                            {item.imageUrl && (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-20 h-20 object-cover shrink-0 bg-slate-100"
                              />
                            )}
                            <div className="p-3 flex-1 min-w-0">
                              <h4 className="text-xs font-extrabold text-slate-900 leading-snug">{item.name}</h4>
                              {item.description && (
                                <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">{item.description}</p>
                              )}
                              <MenuTagBadges tags={item.tags} />
                              {item.allergens && item.allergens.length > 0 && (
                                <p className="text-[9px] text-slate-400 mt-1.5 font-medium">
                                  Alergeny: {item.allergens.join(', ')}
                                </p>
                              )}
                            </div>
                          </div>
                          {item.modifiers && item.modifiers.length > 0 && (
                            <div className="px-3 pb-3">
                              <DishModifiers
                                packageId={selectedPackage.id}
                                itemKey={itemKey}
                                groups={item.modifiers}
                                selections={modifierSelections}
                                onToggle={toggleModifier}
                                title={item.name}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'dates' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {venue.availableDates.map((d) => {
                  const isDateSelected = selectedDate === d;
                  return (
                    <button
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`p-3 rounded-xl border text-left transition-all shadow-sm ${
                        isDateSelected
                          ? 'bg-brand-50 border-brand-500 text-brand-700 font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-brand-400'
                      }`}
                    >
                      <div className="text-[9px] text-slate-500 font-bold uppercase tracking-tight">Sobota</div>
                      <div className="text-xs mt-0.5 font-bold">{d}</div>
                    </button>
                  );
                })}
              </div>

              {venue.blockedDates.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <span className="text-[9px] uppercase font-black text-rose-600 tracking-wider block mb-2">
                    Terminy Zajęte
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {venue.blockedDates.map(bd => (
                      <span key={bd} className="bg-slate-50 text-slate-400 line-through text-[10px] px-2.5 py-1 rounded-lg border border-slate-200 font-bold">
                        {bd}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4 text-xs text-slate-700">
              <p className="leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100 shadow-sm font-medium">
                {venue.description}
              </p>

              <div>
                <h4 className="font-extrabold text-slate-900 text-[10px] uppercase tracking-wider mb-2">Wyposażenie i udogodnienia</h4>
                <div className="grid grid-cols-2 gap-2">
                  {venue.amenities.map((am, idx) => (
                    <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center gap-2 shadow-sm">
                      <Check className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                      <span className="text-[11px] font-bold text-slate-800">{am}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-none bg-white p-3 border-t border-slate-200 flex items-center gap-3 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-40">
        <div className="flex-1 min-w-0">
          <span className="text-[9px] text-slate-500 uppercase font-black block truncate">Pakiet: {selectedPackage.name}</span>
          <div className="text-lg font-black text-slate-900 flex items-baseline gap-1">
            <span>{selectedPackage.pricePerPerson + modifiersExtraTotal} zł</span>
            <span className="text-[10px] font-bold text-slate-500">/ os.</span>
          </div>
          {modifiersExtraTotal > 0 && (
            <span className="text-[9px] text-amber-700 font-bold">w tym dodatki +{modifiersExtraTotal} zł</span>
          )}
        </div>

        <button
          onClick={() => onStartBooking(venue, selectedPackage, selectedDate)}
          className="flex-1 py-3.5 px-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-black text-xs rounded-xl shadow-lg shadow-brand-500/30 active:scale-95 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
        >
          <span>Rezerwuj</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
