import React, { useState, useEffect } from 'react';
import { AuthUser } from '../../types';
import { BottomNav, TabType } from './BottomNav';
import { NotificationBanner, ToastNotification } from './NotificationBanner';
import { ShieldCheck, User, Sparkles, Smartphone, Monitor, Scale, Building2 } from 'lucide-react';

interface Props {
  children: React.ReactNode;
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

      {/* Main Container Phone Shell */}
      <div
        className={`w-full transition-all duration-300 relative ${isSimulatorFrame
            ? 'max-w-md my-0 lg:my-6 rounded-none lg:rounded-[44px] border-0 lg:border-[10px] lg:border-slate-800 shadow-2xl overflow-hidden bg-slate-50 min-h-screen lg:min-h-[844px] lg:h-[844px]'
            : 'max-w-md min-h-screen bg-slate-50'
          }`}
      >
        {/* Dynamic Mobile Notch / Island (for desktop simulator) */}
        <div className="hidden lg:flex items-center justify-between px-7 pt-3 pb-1 bg-white text-slate-800 text-[11px] font-semibold tracking-tight border-b border-slate-200 select-none">
          <span>{currentTime}</span>
          <div className="w-20 h-4 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>5G</span>
            <div className="w-4 h-2 bg-emerald-500 rounded-xs" />
          </div>
        </div>

        {/* Mobile Header Top Bar */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-4 py-2.5 border-b border-slate-200/80 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-500 to-amber-500 flex items-center justify-center shadow-md shadow-brand-500/20 font-black text-white text-sm">
              P
            </div>
            <div>
              {/* <span className="font-extrabold text-slate-900 text-base tracking-tight flex items-center gap-1"> */}
              {/* Party<span className="gold-gradient-text">Spot</span> */}
              <span className="font-extrabold text-slate-900 text-base tracking-tight flex items-center gap-1">
                Celebratify
              </span>
            </div>
          </div>

          {/* Controls: Role Switcher & Auth */}
          <div className="flex items-center gap-2">
            <button
              onClick={onToggleRole}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold tracking-wider border transition-all flex items-center gap-1 ${role === 'manager'
                  ? 'bg-amber-50 text-amber-800 border-amber-300/80 shadow-xs'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
            >
              <Building2 className="w-3 h-3 text-amber-600" />
              <span>{role === 'manager' ? 'Tryb Lokalu' : 'Tryb Klienta'}</span>
            </button>

            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 transition-colors"
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover border border-brand-500" />
              ) : (
                <User className="w-3.5 h-3.5 text-brand-600" />
              )}
              <span className="text-[11px] truncate max-w-[70px]">
                {user ? user.name.split(' ')[0] : 'Zaloguj'}
              </span>
            </button>
          </div>
        </header>

        {/* Notifications Toast Top Banner */}
        <NotificationBanner notification={notification} onDismiss={onDismissNotification} />

        {/* Screen Content Body */}
        <main className="overflow-y-auto max-w-md mx-auto relative min-h-[calc(100vh-120px)] lg:min-h-[720px] lg:max-h-[720px] no-scrollbar">
          {children}
        </main>

        {/* Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={onSelectTab}
          compareCount={compareCount}
          pendingBookingsCount={pendingBookingsCount}
          role={role}
        />
      </div>
    </div>
  );
};
