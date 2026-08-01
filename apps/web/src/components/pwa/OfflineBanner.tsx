import React from 'react';
import { useOnlineStatus } from '../../hooks/pwa/useOnlineStatus';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-slate-900/95 backdrop-blur-md border border-amber-500/30 text-white p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-pulse z-50">
      <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-3.536 5 5 0 011.414-3.536m0 0L4.929 2.1M9.172 9.172L2.1 2.1" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold">Offline Mode</p>
        <p className="text-xs text-slate-400">Viewing cached data. Functions requiring network are limited.</p>
      </div>
    </div>
  );
};
