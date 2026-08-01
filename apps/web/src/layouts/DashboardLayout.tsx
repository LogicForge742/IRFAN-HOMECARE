import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/navigation/Sidebar";
import { Navbar } from "@/components/navigation/Navbar";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { useNotificationsSocket } from "@/realtime/useNotificationsSocket";

export const DashboardLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize real-time notification socket listener
  useNotificationsSocket();


  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden md:flex h-screen sticky top-0" />

      {/* Mobile Slide-out Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
