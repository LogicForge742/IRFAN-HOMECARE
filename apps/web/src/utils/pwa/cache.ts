export async function clearOldCaches(keepCacheNames: string[]): Promise<void> {
  if ('caches' in window) {
    const keys = await caches.keys();
    await Promise.all(
      keys.map((key) => {
        if (!keepCacheNames.includes(key)) {
          console.info(`Clearing old cache storage: ${key}`);
          return caches.delete(key);
        }
        return Promise.resolve(false);
      })
    );
  }
}

export async function getCacheSize(cacheName: string): Promise<number> {
  if (!('caches' in window)) return 0;
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    return keys.length;
  } catch {
    return 0;
  }
}
