import React, { useState } from "react";
import { useAuditLogs, useArchiveLogs } from "../hooks/useAudit";
import { AuditFilters } from "../components/AuditFilters";
import { AuditTable } from "../components/AuditTable";
import { AuditTimeline } from "../components/AuditTimeline";
import type { AuditLog } from "../api/audit-api";

export const AuditPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [resource, setResource] = useState("");
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<"table" | "timeline">("table");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [archiveDate, setArchiveDate] = useState("");

  const { data, isLoading } = useAuditLogs({
    search: search || undefined,
    resource: resource || undefined,
    page,
    per_page: 15,
  });

  const archiveMutation = useArchiveLogs();

  const handleExport = async () => {
    try {
      const { auditApi } = await import("../api/audit-api");
      const blob = await auditApi.exportLogs();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `audit_logs_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  const handleArchive = async () => {
    if (!archiveDate) return;
    try {
      await archiveMutation.mutateAsync(new Date(archiveDate).toISOString());
      setShowArchiveModal(false);
    } catch (err) {
      console.error("Archiving failed:", err);
    }
  };

  const logs = data?.data?.items || [];
  const metadata = data?.data?.metadata;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">System Audit Logs</h1>
          <p className="text-sm text-slate-400 mt-1">
            Track and inspect all operations, security records, and transaction audits.
          </p>
        </div>
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              viewMode === "table" ? "bg-emerald-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
            }`}
          >
            Table View
          </button>
          <button
            onClick={() => setViewMode("timeline")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              viewMode === "timeline" ? "bg-emerald-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
            }`}
          >
            Timeline View
          </button>
        </div>
      </div>

      <AuditFilters
        search={search}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        resource={resource}
        onResourceChange={(val) => {
          setResource(val);
          setPage(1);
        }}
        onExport={handleExport}
        onArchive={() => setShowArchiveModal(true)}
      />

      {viewMode === "table" ? (
        <AuditTable logs={logs} loading={isLoading} onSelectLog={setSelectedLog} />
      ) : (
        <AuditTimeline logs={logs} loading={isLoading} />
      )}

      {metadata && metadata.pages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white rounded-lg disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          <span className="text-xs text-slate-400">
            Page {page} of {metadata.pages}
          </span>
          <button
            disabled={page === metadata.pages}
            onClick={() => setPage((p) => Math.min(metadata.pages, p + 1))}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white rounded-lg disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 max-w-2xl w-full rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white">Audit Log Details</h3>
                <p className="text-xs text-slate-400 mt-0.5">ID: {selectedLog.id}</p>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
              <div>
                <span className="text-xs text-slate-500 block">Timestamp</span>
                <span>{new Date(selectedLog.created_at).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">User ID</span>
                <span>{selectedLog.user_id}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Action</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-xs border border-emerald-500/20">
                  {selectedLog.action}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Resource</span>
                <span>
                  {selectedLog.resource} ({selectedLog.resource_id || "-"})
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-xs text-slate-500 block">IP Address & Agent</span>
                <span>
                  {selectedLog.ip_address || "-"} /{" "}
                  <span className="text-slate-400 text-xs">{selectedLog.user_agent || "-"}</span>
                </span>
              </div>
              {selectedLog.details && (
                <div className="col-span-2">
                  <span className="text-xs text-slate-500 block mb-1">Details Context</span>
                  <pre className="p-3 bg-slate-950/60 rounded-xl text-xs text-slate-400 overflow-x-auto font-mono">
                    {JSON.stringify(selectedLog.details, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Archive Logs Modal */}
      {showArchiveModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 max-w-md w-full rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Archive System Logs</h3>
            <p className="text-xs text-slate-400">
              Select a threshold date. All audit logs created prior to this date will be purged/archived.
            </p>
            <input
              type="date"
              value={archiveDate}
              onChange={(e) => setArchiveDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowArchiveModal(false)}
                className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                disabled={!archiveDate}
                onClick={handleArchive}
                className="px-3 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-500 text-white rounded-lg disabled:opacity-50"
              >
                Confirm Purge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
