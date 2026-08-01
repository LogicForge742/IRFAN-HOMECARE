import { useUsers } from "../hooks/useAdmin";
import {
  UsersRound,
  ShieldCheck,
  ShieldX,
  Mail,
} from "lucide-react";

export default function AdminUsersPage() {
  const { data, isLoading } = useUsers();

  if (isLoading)
    return (
      <div className="p-8 text-center text-sm text-slate-400">
        Loading user records...
      </div>
    );

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "HEALTHCARE_PROFESSIONAL":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-2">
        <div className="flex items-center space-x-3 text-emerald-400">
          <UsersRound className="w-7 h-7" />
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            User Management
          </h1>
        </div>
        <p className="text-sm text-slate-400">
          Administer platform users, verify professionals, and manage account access
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-3 border-b border-slate-800 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
          <span>ID</span>
          <span>Email</span>
          <span>Role</span>
          <span>Verified</span>
        </div>

        {data?.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-4 border-b border-slate-800/50 hover:bg-slate-800/30 transition items-center"
          >
            <span className="text-xs text-slate-500 font-mono">#{user.id}</span>

            <span className="text-sm text-white font-medium flex items-center space-x-2">
              <Mail className="w-4 h-4 text-slate-500" />
              <span>{user.email}</span>
            </span>

            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getRoleBadge(user.role)}`}
            >
              {user.role}
            </span>

            {user.email_verified ? (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            ) : (
              <ShieldX className="w-4 h-4 text-rose-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
