import React from "react";
import { Mail, Shield, UserX, UserCheck } from "lucide-react";
import type { OrganizationMember } from "@/types/organization";

interface MemberTableProps {
  members: OrganizationMember[];
  onRemoveMember?: (userId: string) => void;
  isRemoving?: boolean;
}

export const MemberTable: React.FC<MemberTableProps> = ({
  members,
  onRemoveMember,
  isRemoving = false,
}) => {
  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case "owner":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "admin":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }
  };

  if (members.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-900/60 border border-slate-800/80 rounded-2xl">
        <UserCheck className="w-8 h-8 text-slate-600 mx-auto mb-2" />
        <p className="text-sm font-semibold text-slate-300">No Members Enrolled</p>
        <p className="text-xs text-slate-500">
          Add users to this organization to grant them multi-tenant access.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-3 border-b border-slate-800 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
        <span>User / Email</span>
        <span>Role</span>
        <span>Action</span>
      </div>

      <div className="divide-y divide-slate-800/50">
        {members.map((member) => {
          const userName =
            member.user?.first_name || member.user?.last_name
              ? `${member.user.first_name || ""} ${member.user.last_name || ""}`.trim()
              : "Organization Member";
          const userEmail = member.user?.email || member.user_id;

          return (
            <div
              key={member.id}
              className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-4 hover:bg-slate-800/30 transition items-center"
            >
              <div className="flex items-center space-x-3 truncate">
                <div className="p-2 bg-slate-800 rounded-xl text-slate-300">
                  <Mail className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="truncate">
                  <p className="text-sm font-medium text-white truncate">{userName}</p>
                  <p className="text-xs text-slate-400 font-mono truncate">{userEmail}</p>
                </div>
              </div>

              <div className="flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getRoleBadge(
                    member.role
                  )}`}
                >
                  {member.role}
                </span>
              </div>

              <div>
                {onRemoveMember && (
                  <button
                    onClick={() => onRemoveMember(member.user_id || member.id)}
                    disabled={isRemoving}
                    title="Remove member"
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                  >
                    <UserX className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
