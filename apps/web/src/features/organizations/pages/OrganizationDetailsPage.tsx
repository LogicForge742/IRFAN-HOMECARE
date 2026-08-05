import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Building2,
  Globe,
  ArrowLeft,
  UserPlus,
  Mail,
  Shield,
  Loader2,
  CheckCircle2,
  Users,
} from "lucide-react";
import {
  useOrganization,
  useOrganizationMembers,
  useAddOrganizationMember,
  useRemoveOrganizationMember,
} from "../hooks/useOrganizations";
import { MemberTable } from "../components/MemberTable";
import { toast } from "sonner";

export const OrganizationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const orgId = id || "";

  const { data: org, isLoading: isOrgLoading } = useOrganization(orgId);
  const { data: members, isLoading: isMembersLoading } = useOrganizationMembers(orgId);

  const addMemberMutation = useAddOrganizationMember(orgId);
  const removeMemberMutation = useRemoveOrganizationMember(orgId);

  const [showAddModal, setShowAddModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState("member");

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail.trim()) return;

    try {
      await addMemberMutation.mutateAsync({
        user_identifier: userEmail.trim(),
        role,
      });
      toast.success(`Added ${userEmail} to organization!`);
      setUserEmail("");
      setShowAddModal(false);
    } catch {
      toast.error("Failed to add member to organization.");
    }
  };

  const handleRemoveMember = async (userId: string) => {
    try {
      await removeMemberMutation.mutateAsync(userId);
      toast.success("Member removed from organization.");
    } catch {
      toast.error("Failed to remove member.");
    }
  };

  if (isOrgLoading) {
    return (
      <div className="p-12 text-center text-sm text-slate-400">
        Loading organization details...
      </div>
    );
  }

  if (!org) {
    return (
      <div className="p-12 text-center space-y-4">
        <p className="text-base text-slate-300 font-semibold">Organization not found</p>
        <Link
          to="/admin/organizations"
          className="inline-flex items-center space-x-2 text-emerald-400 text-sm font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Organizations</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Back Button */}
      <Link
        to="/admin/organizations"
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Organizations</span>
      </Link>

      {/* Header Info Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl ring-1 ring-emerald-500/20">
              <Building2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {org.name}
                </h1>
                <span className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Active Isolation</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Organization ID: {org.id}</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center space-x-2 px-5 py-3 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition shadow-lg shadow-emerald-500/10 self-start md:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Member</span>
          </button>
        </div>

        {/* Metadata Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 space-y-1">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              URL Slug
            </span>
            <p className="text-sm font-mono text-emerald-400">{org.slug}</p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 space-y-1">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Custom Domain
            </span>
            <p className="text-sm font-medium text-white flex items-center space-x-2">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{org.domain || "No custom domain"}</span>
            </p>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/60 space-y-1">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Total Enrolled Members
            </span>
            <p className="text-sm font-bold text-white flex items-center space-x-2">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>{members?.length ?? org.member_count ?? 0}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Members Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Organization Members</h2>
            <p className="text-xs text-slate-400">
              Users enrolled in this organization with data access privileges.
            </p>
          </div>
        </div>

        {isMembersLoading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading members...</div>
        ) : (
          <MemberTable
            members={members || []}
            onRemoveMember={handleRemoveMember}
            isRemoving={removeMemberMutation.isPending}
          />
        )}
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <UserPlus className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white">Add Member to Organization</h2>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  User Email or ID *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="e.g. doctor@nairiclinic.ke"
                    required
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Organization Role
                </label>
                <div className="relative">
                  <Shield className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                    <option value="owner">Owner</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addMemberMutation.isPending || !userEmail.trim()}
                  className="flex items-center space-x-2 px-5 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 rounded-xl transition shadow-lg shadow-emerald-500/10"
                >
                  {addMemberMutation.isPending && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  <span>Enroll Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationDetailsPage;
