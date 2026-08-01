export const OFFLINE_CACHE_NAME = 'irfan-offline-cache-v1';

export function initOfflineHandlers() {
  if (typeof window !== 'undefined') {
    window.addEventListener('offline', () => {
      console.warn('Network connection lost. Running in offline mode.');
    });
    window.addEventListener('online', () => {
      console.info('Network connection restored.');
    });
  }
}
