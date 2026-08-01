import { registerSW } from 'virtual:pwa-register';

export function registerPWA() {
  if ('serviceWorker' in navigator) {
    const updateSW = registerSW({
      onNeedRefresh() {
        window.dispatchEvent(new CustomEvent('pwa-update-ready', { detail: updateSW }));
      },
      onOfflineReady() {
        console.log('App is ready to work offline.');
      },
    });
    return updateSW;
  }
  return () => {};
}
