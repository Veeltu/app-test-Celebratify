import React, { useEffect } from 'react';
import { Bell, CheckCircle2, XCircle, Sparkles, X } from 'lucide-react';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'error';
  timestamp: string;
}

interface Props {
  notification: ToastNotification | null;
  onDismiss: () => void;
}

export const NotificationBanner: React.FC<Props> = ({ notification, onDismiss }) => {
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification, onDismiss]);

  if (!notification) return null;

  return (
    <div className="fixed top-2 left-3 right-3 z-50 animate-bounce-short">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-brand-500/40 rounded-2xl p-3.5 shadow-xl text-slate-100 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-brand-900/40 text-brand-400 shrink-0 mt-0.5 border border-brand-700/50">
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : notification.type === 'error' ? (
            <XCircle className="w-5 h-5 text-rose-400" />
          ) : (
            <Sparkles className="w-5 h-5 text-amber-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h4 className="text-[10px] font-extrabold text-slate-400 tracking-wide uppercase flex items-center gap-1.5">
              <Bell className="w-3 h-3 text-brand-500 animate-pulse" /> Powiadomienie PartySpot
            </h4>
            <span className="text-[10px] text-slate-500 font-medium">{notification.timestamp}</span>
          </div>
          <p className="text-xs font-extrabold text-slate-100 mt-0.5">{notification.title}</p>
          <p className="text-xs text-slate-400 font-medium mt-0.5 line-clamp-2">{notification.message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-slate-500 hover:text-slate-200 p-1 shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
