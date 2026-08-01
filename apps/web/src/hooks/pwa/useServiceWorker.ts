import { useEffect, useState } from 'react';
import { registerPWA } from '../../pwa/registerSW';

export function useServiceWorker() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [updateHandler, setUpdateHandler] = useState<any>(null);

  useEffect(() => {
    const handleUpdateReady = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setNeedRefresh(true);
        setUpdateHandler(() => customEvent.detail);
      }
    };

    window.addEventListener('pwa-update-ready', handleUpdateReady);
    
    const updateSW = registerPWA();
    if (updateSW) {
      setUpdateHandler(() => updateSW);
    }

    return () => {
      window.removeEventListener('pwa-update-ready', handleUpdateReady);
    };
  }, []);

  const updateServiceWorker = () => {
    if (updateHandler) {
      updateHandler(true);
    }
  };

  return {
    needRefresh,
    updateServiceWorker,
  };
}
