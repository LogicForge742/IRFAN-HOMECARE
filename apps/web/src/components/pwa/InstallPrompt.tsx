import React from 'react';
import { useInstallPrompt } from '../../hooks/pwa/useInstallPrompt';

export const InstallPrompt: React.FC = () => {
  const { isInstallable, installApp, dismissPrompt } = useInstallPrompt();

  if (!isInstallable) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-slate-900/95 backdrop-blur-md border border-emerald-500/30 text-white p-4 rounded-xl shadow-2xl flex flex-col gap-3 z-50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold">Install Irfan HomeCare</p>
          <p className="text-xs text-slate-400">Add to your home screen for quick offline access.</p>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <button
          onClick={dismissPrompt}
          className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
        >
          Dismiss
        </button>
        <button
          onClick={installApp}
          className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition-all shadow-lg shadow-emerald-600/20"
        >
          Install
        </button>
      </div>
    </div>
  );
};
