import React from 'react';
import { AuthUser } from '../../../types';
import { X, CheckCircle, ShieldCheck, ArrowRight } from 'lucide-react';

interface Props {
  user: AuthUser | null;
  onLogin: (user: AuthUser) => void;
  onLogout: () => void;
  onClose: () => void;
}

export const MobileAuthModal: React.FC<Props> = ({ user, onLogin, onLogout, onClose }) => {
  const handleGoogleLogin = (role: 'client' | 'manager') => {
    const newUser: AuthUser = role === 'client' ? {
      id: 'usr_google_1',
      name: 'Jan Kowalski',
      email: 'jan.kowalski@gmail.com',
      role: 'client',
      provider: 'google',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
    } : {
      id: 'mgr1',
      name: 'Marek Stachowski (Menedżer)',
      email: 'marek@dworparkowy.pl',
      role: 'manager',
      managedVenueId: 'v1',
      provider: 'google',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80'
    };
    onLogin(newUser);
  };

  const handleAppleLogin = (role: 'client' | 'manager') => {
    const newUser: AuthUser = role === 'client' ? {
      id: 'usr_apple_1',
      name: 'Anna Wiśniewska',
      email: 'anna.w@icloud.com',
      role: 'client',
      provider: 'apple',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
    } : {
      id: 'mgr2',
      name: 'Ewa Grabowska (Cristal Spa)',
      email: 'ewa@cristalhotel.pl',
      role: 'manager',
      managedVenueId: 'v2',
      provider: 'apple'
    };
    onLogin(newUser);
  };

  return (
    <div className="absolute inset-0 z-40 bg-white/80 backdrop-blur-md flex items-end justify-center p-0 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-t-3xl w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 p-2 rounded-full bg-slate-100 shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 mx-auto flex items-center justify-center shadow-lg shadow-brand-500/20 mb-3">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Logowanie do PartySpot</h3>
          <p className="text-xs text-slate-500 mt-1">
            Zaloguj się przez Google lub Apple. Prowadzimy rejestr użytkowników.
          </p>
        </div>

        {user ? (
          <div className="space-y-4">
            <div className="bg-slate-50 border border-brand-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover border border-brand-400" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 font-bold flex items-center justify-center text-lg">
                  {user.name.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{user.name}</h4>
                  <CheckCircle className="w-4 h-4 text-brand-600 shrink-0" />
                </div>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold bg-brand-50 text-brand-700 rounded-md border border-brand-100">
                  Rola: {user.role === 'manager' ? 'Menedżer Lokalu' : 'Organizator Imprezy'}
                </span>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-rose-600 font-semibold rounded-xl text-sm transition-colors shadow-sm"
            >
              Wyloguj się
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Wybierz tryb logowania
            </div>

            {/* Google Client */}
            <button
              onClick={() => handleGoogleLogin('client')}
              className="w-full py-3 px-4 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-xl text-sm flex items-center justify-between shadow-sm border border-slate-200 transition-transform active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Zaloguj przez Google (Klient)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            {/* Apple Client */}
            <button
              onClick={() => handleAppleLogin('client')}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-black text-white font-semibold rounded-xl text-sm flex items-center justify-between transition-transform active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.54c.64-.78 1.08-1.85.96-2.94-.93.04-2.09.62-2.76 1.4-.59.68-1.11 1.77-.97 2.83 1.05.08 2.13-.51 2.77-1.29z"/>
                </svg>
                <span>Zaloguj przez Apple (Klient)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500 font-semibold">Dla Właściciela Lokalu</span>
              </div>
            </div>

            {/* Manager Login */}
            <button
              onClick={() => handleGoogleLogin('manager')}
              className="w-full py-3 px-4 bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold rounded-xl text-sm flex items-center justify-between border border-brand-200 transition-transform active:scale-[0.98] shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-base">🏢</span>
                <span>Zaloguj jako Menedżer Lokalu</span>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
