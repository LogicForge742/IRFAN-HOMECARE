import { useEffect, useState } from 'react';
import { PushNotificationService } from './push-service';

export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
      PushNotificationService.getSubscription().then((sub) => {
        setIsSubscribed(!!sub);
      });
    }
  }, []);

  const subscribe = async () => {
    setLoading(true);
    try {
      const status = await PushNotificationService.requestPermission();
      setPermission(status);
      if (status === 'granted') {
        await PushNotificationService.subscribeUser();
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    setLoading(true);
    try {
      const success = await PushNotificationService.unsubscribeUser();
      if (success) {
        setIsSubscribed(false);
      }
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    permission,
    isSubscribed,
    loading,
    subscribe,
    unsubscribe,
  };
}
