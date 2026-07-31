import React from 'react';
import {
  Search,
  Scale,
  Bot,
  Calendar,
  Building2,
  DollarSign,
  UtensilsCrossed,
  CalendarDays,
} from 'lucide-react';

/** Client + manager tabs (manager ma osobny bottom nav) */
export type TabType =
  | 'search'
  | 'compare'
  | 'chat'
  | 'bookings'
  | 'admin'
  | 'adminCalendar'
  | 'adminPricing'
  | 'adminMenu';

export type AdminSection = 'requests' | 'calendar' | 'pricing' | 'menu';

export function tabToAdminSection(tab: TabType): AdminSection | null {
  switch (tab) {
    case 'admin':
      return 'requests';
    case 'adminCalendar':
      return 'calendar';
    case 'adminPricing':
      return 'pricing';
    case 'adminMenu':
      return 'menu';
    default:
      return null;
  }
}

export function isManagerTab(tab: TabType): boolean {
  return tabToAdminSection(tab) !== null;
}

interface Props {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  compareCount: number;
  pendingBookingsCount: number;
  role: 'client' | 'manager';
}

export const BottomNav: React.FC<Props> = ({
  activeTab,
  onSelectTab,
  compareCount,
  pendingBookingsCount,
  role,
}) => {
  const clientTabs = [
    {
      id: 'search' as TabType,
      label: 'Szukaj',
      icon: Search,
      badge: null as string | number | null,
    },
    {
      id: 'compare' as TabType,
      label: 'Porównaj',
      icon: Scale,
      badge: compareCount > 0 ? compareCount : null,
    },
    {
      id: 'chat' as TabType,
      label: 'Czat AI',
      icon: Bot,
      badge: 'AI' as string | number | null,
    },
    {
      id: 'bookings' as TabType,
      label: 'Rezerwacje',
      icon: Calendar,
      badge: null,
    },
  ];

  const managerTabs = [
    {
      id: 'admin' as TabType,
      label: 'Zapytania',
      icon: Building2,
      badge: pendingBookingsCount > 0 ? pendingBookingsCount : null,
    },
    {
      id: 'adminCalendar' as TabType,
      label: 'Kalendarz',
      icon: CalendarDays,
      badge: null as string | number | null,
    },
    {
      id: 'adminPricing' as TabType,
      label: 'Cennik',
      icon: DollarSign,
      badge: null,
    },
    {
      id: 'adminMenu' as TabType,
      label: 'Menu',
      icon: UtensilsCrossed,
      badge: null,
    },
  ];

  const tabs = role === 'manager' ? managerTabs : clientTabs;

  return (
    <nav className="relative z-40 w-full glass-nav px-2 py-2 border-t border-slate-700 bg-slate-900/95 backdrop-blur-md">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                isActive
                  ? 'text-brand-500 font-semibold scale-105'
                  : role === 'manager'
                    ? 'text-amber-500/70 hover:text-amber-400'
                    : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'
                  }`}
                />
                {tab.badge !== null && (
                  <span
                    className={`absolute -top-1.5 -right-2.5 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                      tab.badge === 'AI'
                        ? 'bg-amber-500 text-white animate-pulse shadow-xs'
                        : 'bg-brand-500 text-white shadow-xs'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 tracking-tight truncate max-w-full ${
                  isActive ? 'text-brand-500 font-extrabold' : ''
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-5 h-0.5 bg-brand-500 rounded-full shadow-xs shadow-brand-500" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
