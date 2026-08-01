import { useNotifications, useMarkAsRead } from "../hooks/useNotifications";
import {
  Bell,
  CalendarCheck,
  CreditCard,
  FileText,
  Settings,
  CheckCheck,
  Circle,
} from "lucide-react";

export default function NotificationsPage() {
  const { data, isLoading } = useNotifications();
  const markMutation = useMarkAsRead();

  if (isLoading)
    return (
      <div className="p-8 text-center text-sm text-slate-400">
        Loading notifications...
      </div>
    );

  const unreadCount = data?.filter((n) => !n.is_read).length || 0;

  const getIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <CalendarCheck className="w-5 h-5 text-blue-400" />;
      case "payment":
        return <CreditCard className="w-5 h-5 text-emerald-400" />;
      case "record":
        return <FileText className="w-5 h-5 text-amber-400" />;
      default:
        return <Settings className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-emerald-400">
            <Bell className="w-7 h-7" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Notifications
            </h1>
          </div>
          {unreadCount > 0 && (
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
              {unreadCount} Unread
            </span>
          )}
        </div>
        <p className="text-sm text-slate-400">
          Appointment confirmations, payment receipts, and system alerts
        </p>
      </div>

      <div className="space-y-2">
        {data?.map((notification) => (
          <div
            key={notification.id}
            className={`border rounded-2xl p-4 shadow-xl flex items-start space-x-4 transition cursor-pointer ${
              notification.is_read
                ? "bg-slate-900 border-slate-800 opacity-70"
                : "bg-slate-900 border-slate-700 hover:border-emerald-500/30"
            }`}
            onClick={() => {
              if (!notification.is_read) {
                markMutation.mutate(notification.id);
              }
            }}
          >
            <div className="pt-0.5">{getIcon(notification.type)}</div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <span>{notification.title}</span>
                  {!notification.is_read && (
                    <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400" />
                  )}
                </h3>
                <span className="text-[10px] text-slate-500 whitespace-nowrap">
                  {new Date(notification.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {notification.message}
              </p>
            </div>

            {notification.is_read && (
              <CheckCheck className="w-4 h-4 text-slate-600 flex-shrink-0 mt-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
