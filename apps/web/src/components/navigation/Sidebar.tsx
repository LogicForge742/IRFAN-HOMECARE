import React from "react";
import { NavLink } from "react-router-dom";
import {
  HeartPulse,
  LayoutDashboard,
  Calendar,
  CreditCard,
  Bell,
  User,
  Clock,
  FileText,
  Users,
  BarChart,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/features/auth/stores/auth-store";

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className = "", onNavigate }) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const getRoleNavItems = () => {
    switch (user?.role) {
      case "HEALTHCARE_PROFESSIONAL":
        return [
          { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
          { label: "My Schedule", to: "/schedule", icon: Clock },
          { label: "Patient Appointments", to: "/appointments", icon: Calendar },
          { label: "Consultation Records", to: "/consultations", icon: FileText },
          { label: "Profile", to: "/profile", icon: User },
        ];
      case "ADMIN":
        return [
          { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
          { label: "User Management", to: "/admin/users", icon: Users },
          { label: "Platform Metrics", to: "/admin/metrics", icon: BarChart },
          { label: "Appointments", to: "/appointments", icon: Calendar },
          { label: "Payments", to: "/payments", icon: CreditCard },
          { label: "Profile", to: "/profile", icon: User },
        ];
      case "PATIENT":
      default:
        return [
          { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
          { label: "Appointments", to: "/appointments", icon: Calendar },
          { label: "Payments & Receipts", to: "/payments", icon: CreditCard },
          { label: "Notifications", to: "/notifications", icon: Bell },
          { label: "Profile", to: "/profile", icon: User },
        ];
    }
  };

  const navItems = getRoleNavItems();

  return (
    <aside
      className={`w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between p-4 ${className}`}
    >
      <div className="space-y-6">
        {/* Brand */}
        <div className="flex items-center space-x-3 px-3 py-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl ring-1 ring-emerald-500/20">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-white tracking-wide">Irfan HomeCare</h1>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
              {user?.role?.replace("_", " ") || "PORTAL"}
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-600/15 text-emerald-400 font-semibold ring-1 ring-emerald-500/30"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer / User Profile Card */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <div className="flex items-center justify-between px-3 py-2 bg-slate-950/60 rounded-xl border border-slate-800">
          <div className="truncate">
            <p className="text-xs font-semibold text-slate-200 truncate">
              {user?.email}
            </p>
            <p className="text-[11px] text-slate-500 capitalize">
              {user?.role?.toLowerCase().replace("_", " ")}
            </p>
          </div>
          <button
            onClick={logout}
            title="Sign out"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
