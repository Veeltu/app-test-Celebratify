import React, { useState, useEffect } from 'react';
import { AuthUser } from '../../types';
import { BottomNav, TabType } from './BottomNav';
import { NotificationBanner, ToastNotification } from './NotificationBanner';
import { ShieldCheck, User, Sparkles, Smartphone, Monitor, Scale, Building2 } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  /** Modale / overlay — poza scrollowanym main (unikamy bug layoutu przy długiej liście). */
  overlay?: React.ReactNode;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  user: AuthUser | null;
  onOpenAuthModal: () => void;
  compareCount: number;
  pendingBookingsCount: number;
  notification: ToastNotification | null;
  onDismissNotification: () => void;
  role: 'client' | 'manager';
  onToggleRole: () => void;
}

export const MobileShell: React.FC<Props> = ({
  children,
  overlay,
  activeTab,
  onSelectTab,
  user,
  onOpenAuthModal,
  compareCount,
  pendingBookingsCount,
  notification,
  onDismissNotification,
  role,
  onToggleRole
}) => {
  const [currentTime, setCurrentTime] = useState('09:41');
  const [isSimulatorFrame, setIsSimulatorFrame] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center relative font-sans antialiased selection:bg-brand-500 selection:text-white">
      {/* Background ambient glow effect for desktop mode */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black -z-10 pointer-events-none" />
      <div className="fixed top-10 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="fixed bottom-10 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

      {/* Desktop Mode Toolbar Switcher */}
      <div className="hidden lg:flex fixed top-4 right-4 z-50 items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-800 shadow-2xl">
        <span className="text-xs font-semibold text-slate-400">Widok podglądu:</span>
        <button
          onClick={() => setIsSimulatorFrame(!isSimulatorFrame)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${isSimulatorFrame
              ? 'bg-brand-600 text-white shadow-md'
              : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Ramka Telefonu</span>
        </button>
        <button
          onClick={() => setIsSimulatorFrame(!isSimulatorFrame)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${!isSimulatorFrame
              ? 'bg-brand-600 text-white shadow-md'
              : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Pełny Ekran</span>
        </button>
      </div>

      {/* Main Container Phone Shell — flex col + stała wysokość obszaru treści */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col ${isSimulatorFrame
            ? 'max-w-md my-0 lg:my-6 rounded-none lg:rounded-[44px] border-0 lg:border-[10px] lg:border-slate-800 shadow-2xl overflow-hidden bg-slate-950 h-[100dvh] max-h-[100dvh] lg:min-h-[844px] lg:h-[844px] lg:max-h-[844px]'
            : 'max-w-md h-[100dvh] max-h-[100dvh] bg-slate-950 overflow-hidden'
          }`}
      >
        {/* Dynamic Mobile Notch / Island (for desktop simulator) */}
        <div className="hidden lg:flex flex-none items-center justify-between px-7 pt-3 pb-1 bg-slate-900 text-slate-200 text-[11px] font-semibold tracking-tight border-b border-slate-700 select-none">
          <span>{currentTime}</span>
          <div className="w-20 h-4 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-500" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>5G</span>
            <div className="w-4 h-2 bg-emerald-500 rounded-xs" />
          </div>
        </div>

        {/* Mobile Header Top Bar */}
        <header className="flex-none z-50 bg-slate-900/90 backdrop-blur-md px-4 py-2.5 border-b border-slate-700/80 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-500 to-amber-500 flex items-center justify-center shadow-md shadow-brand-500/20 font-black text-white text-sm">
              P
            </div>
            <div>
              <span className="font-extrabold text-slate-100 text-base tracking-tight flex items-center gap-1">
                Celebratify
              </span>
            </div>
          </div>

          {/* Controls: Role Switcher & Auth */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleRole}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold tracking-wider border transition-all flex items-center gap-1 ${role === 'manager'
                  ? 'bg-amber-900/40 text-amber-300 border-amber-600/60 shadow-xs'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
            >
              <Building2 className="w-3 h-3 text-amber-500" />
              <span>{role === 'manager' ? 'Tryb Lokalu' : 'Tryb Klienta'}</span>
            </button>

            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-2.5 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover border border-brand-500" />
              ) : (
                <User className="w-3.5 h-3.5 text-brand-500" />
              )}
              <span className="text-[11px] truncate max-w-[70px]">
                {user ? user.name.split(' ')[0] : 'Zaloguj'}
              </span>
            </button>
          </div>
        </header>

        {/* Notifications Toast Top Banner */}
        <NotificationBanner notification={notification} onDismiss={onDismissNotification} />

        {/* Treść (scroll) + warstwa overlay (modale) — wspólny relative box o stałej wysokości */}
        <div className="flex-1 relative min-h-0 w-full max-w-md mx-auto">
          <main className="absolute inset-0 overflow-y-auto no-scrollbar">
            {children}
          </main>
          {overlay}
        </div>

        {/* Bottom Navigation Bar */}
        <div className="flex-none z-50">
          <BottomNav
            activeTab={activeTab}
            onSelectTab={onSelectTab}
            compareCount={compareCount}
            pendingBookingsCount={pendingBookingsCount}
            role={role}
          />
        </div>
      </div>
    </div>
  );
};
