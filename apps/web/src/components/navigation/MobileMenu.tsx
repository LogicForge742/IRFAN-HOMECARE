import React from "react";
import { X } from "lucide-react";
import { Sidebar } from "./Sidebar";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-64 max-w-xs bg-slate-900 shadow-2xl z-10 flex flex-col h-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
        <Sidebar className="w-full h-full border-r-0" onNavigate={onClose} />
      </div>
    </div>
  );
};
