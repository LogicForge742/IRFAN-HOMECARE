import React from "react";
import { Bell, Menu, User as UserIcon } from "lucide-react";
import { useAuthStore } from "@/features/auth/stores/auth-store";

interface NavbarProps {
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileMenu }) => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden sm:block">
          <span className="text-xs font-medium text-slate-400">Welcome,</span>
          <h2 className="text-sm font-bold text-white truncate max-w-[200px]">
            {user?.email}
          </h2>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications badge */}
        <button
          className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-slate-900"></span>
        </button>

        {/* User avatar indicator */}
        <div className="flex items-center space-x-2 pl-3 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs">
            {user?.email ? user.email.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-white truncate max-w-[120px]">
              {user?.email}
            </p>
            <p className="text-[10px] text-emerald-400 font-medium uppercase">
              {user?.role?.replace("_", " ")}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
