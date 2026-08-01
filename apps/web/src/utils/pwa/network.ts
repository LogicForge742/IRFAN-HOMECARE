export interface NetworkInformation extends EventTarget {
  readonly downlink: number;
  readonly effectiveType: '2g' | '3g' | '4g' | 'slow-2g';
  readonly rtt: number;
  readonly saveData: boolean;
  onchange: EventListener;
}

export function getNetworkSpeed() {
  if (typeof navigator !== 'undefined' && 'connection' in navigator) {
    const conn = (navigator as any).connection as NetworkInformation;
    return {
      downlink: conn.downlink,
      effectiveType: conn.effectiveType,
      rtt: conn.rtt,
      saveData: conn.saveData,
    };
  }
  return null;
}

export async function pingLatency(url = '/api/health'): Promise<number> {
  const start = performance.now();
  try {
    await fetch(url, { method: 'HEAD', cache: 'no-store' });
    return performance.now() - start;
  } catch {
    return Infinity;
  }
}
