function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export class PushNotificationService {
  private static readonly VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY || '';

  static async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      throw new Error('Notifications not supported by this browser.');
    }
    return Notification.requestPermission();
  }

  static async getSubscription(): Promise<PushSubscription | null> {
    const registration = await navigator.serviceWorker.ready;
    return registration.pushManager.getSubscription();
  }

  static async subscribeUser(): Promise<PushSubscription> {
    if (!this.VAPID_PUBLIC_KEY) {
      throw new Error('VAPID public key is missing.');
    }
    const registration = await navigator.serviceWorker.ready;
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(this.VAPID_PUBLIC_KEY),
    };
    return registration.pushManager.subscribe(subscribeOptions);
  }

  static async unsubscribeUser(): Promise<boolean> {
    const subscription = await this.getSubscription();
    if (subscription) {
      return subscription.unsubscribe();
    }
    return false;
  }
}
