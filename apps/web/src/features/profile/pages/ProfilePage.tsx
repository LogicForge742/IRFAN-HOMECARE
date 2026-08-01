import { useState } from "react";
import { useProfile, useUpdateProfile } from "../hooks/useProfile";
import {
  UserCircle,
  Mail,
  Phone,
  ShieldCheck,
  Save,
  Settings,
  KeyRound,
  Bell,
} from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const { data: user, isLoading } = useProfile();
  const updateMutation = useUpdateProfile();

  const [phone, setPhone] = useState("");

  if (isLoading)
    return (
      <div className="p-8 text-center text-sm text-slate-400">
        Loading profile...
      </div>
    );

  const handleSave = () => {
    updateMutation.mutate(
      { phone },
      {
        onSuccess() {
          toast.success("Profile updated successfully!");
        },
        onError() {
          toast.error("Failed to update profile");
        },
      }
    );
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-2">
        <div className="flex items-center space-x-3 text-emerald-400">
          <UserCircle className="w-7 h-7" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Account Profile
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Manage personal information, contact details, and account security settings
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
        <div className="flex items-center space-x-4 border-b border-slate-800 pb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {user?.email?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{user?.email}</h2>
            <p className="text-xs text-slate-400">User ID: {user?.id}</p>
            <span className="inline-flex items-center space-x-1 mt-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider border border-emerald-500/20">
              <ShieldCheck className="w-3 h-3" />
              <span>{user?.role}</span>
            </span>
          </div>
        </div>

        {/* Email (read-only) */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <Mail className="w-4 h-4 text-emerald-400" />
            <span>Email Address</span>
          </label>
          <input
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-500 cursor-not-allowed"
            value={user?.email || ""}
            disabled
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Phone Number</span>
          </label>
          <input
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder-slate-500"
            placeholder="e.g. +254 712 345 678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Verification Status */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400">Email verified:</span>
          {user?.email_verified ? (
            <span className="text-emerald-400 font-semibold">Yes ✓</span>
          ) : (
            <span className="text-rose-400 font-semibold">Not Verified</span>
          )}
        </div>

        <button
          className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-6 py-3 rounded-xl transition shadow-lg shadow-emerald-950/40 disabled:opacity-50"
          onClick={handleSave}
          disabled={updateMutation.isPending}
        >
          <Save className="w-4 h-4" />
          <span>
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </span>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center space-x-3 hover:border-slate-700 transition cursor-pointer">
          <KeyRound className="w-5 h-5 text-amber-400" />
          <div>
            <p className="text-sm font-semibold text-white">Change Password</p>
            <p className="text-[10px] text-slate-400">Update security credentials</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center space-x-3 hover:border-slate-700 transition cursor-pointer">
          <Bell className="w-5 h-5 text-blue-400" />
          <div>
            <p className="text-sm font-semibold text-white">Notifications</p>
            <p className="text-[10px] text-slate-400">Manage alert preferences</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center space-x-3 hover:border-slate-700 transition cursor-pointer">
          <Settings className="w-5 h-5 text-slate-400" />
          <div>
            <p className="text-sm font-semibold text-white">Preferences</p>
            <p className="text-[10px] text-slate-400">Language, theme & display</p>
          </div>
        </div>
      </div>
    </div>
  );
}
