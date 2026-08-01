import React, { useEffect, useState } from 'react';

export const UpdatePrompt: React.FC = () => {
  const [updateHandler, setUpdateHandler] = useState<any>(null);

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setUpdateHandler(() => customEvent.detail);
      }
    };
    window.addEventListener('pwa-update-ready', handleUpdate);
    return () => window.removeEventListener('pwa-update-ready', handleUpdate);
  }, []);

  if (!updateHandler) return null;

  const handleUpdate = () => {
    if (updateHandler) {
      updateHandler(true);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-slate-900/95 backdrop-blur-md border border-blue-500/30 text-white p-4 rounded-xl shadow-2xl flex flex-col gap-3 z-50 animate-bounce">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18v3" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold">Update Available</p>
          <p className="text-xs text-slate-400">A new version of Irfan HomeCare is ready.</p>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => setUpdateHandler(null)}
          className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
        >
          Later
        </button>
        <button
          onClick={handleUpdate}
          className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-all shadow-lg shadow-blue-600/20"
        >
          Update Now
        </button>
      </div>
    </div>
  );
};
