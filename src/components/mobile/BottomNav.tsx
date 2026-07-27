import React from 'react';
import { Search, Scale, Bot, Calendar, Building2 } from 'lucide-react';

export type TabType = 'search' | 'compare' | 'chat' | 'bookings' | 'admin';

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
  role
}) => {
  const tabs = [
    {
      id: 'search' as TabType,
      label: 'Szukaj',
      icon: Search,
      badge: null
    },
    {
      id: 'compare' as TabType,
      label: 'Porównaj',
      icon: Scale,
      badge: compareCount > 0 ? compareCount : null
    },
    {
      id: 'chat' as TabType,
      label: 'Czat AI',
      icon: Bot,
      badge: 'AI'
    },
    {
      id: 'bookings' as TabType,
      label: 'Rezerwacje',
      icon: Calendar,
      badge: null
    },
    {
      id: 'admin' as TabType,
      label: role === 'manager' ? 'Panel Lokalu' : 'Dla Lokalu',
      icon: Building2,
      badge: pendingBookingsCount > 0 ? pendingBookingsCount : null,
      highlight: role === 'manager'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto glass-nav px-3 py-2 border-t border-slate-200">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-brand-600 font-semibold scale-105'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                {tab.badge !== null && (
                  <span className={`absolute -top-1.5 -right-2.5 text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                    tab.badge === 'AI' 
                      ? 'bg-amber-500 text-white animate-pulse shadow-xs' 
                      : 'bg-brand-500 text-white shadow-xs'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${isActive ? 'text-brand-600 font-extrabold' : 'text-slate-500'}`}>
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
