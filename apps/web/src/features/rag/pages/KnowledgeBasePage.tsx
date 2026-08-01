import React, { useState } from "react";
import { useQueryKnowledgeBase, useIngestDocument } from "../hooks/useRAG";
import { KnowledgeSearch } from "../components/KnowledgeSearch";
import { AnswerPanel } from "../components/AnswerPanel";
import { toast } from "sonner";

export const KnowledgeBasePage: React.FC = () => {
  const [ingestTitle, setIngestTitle] = useState("");
  const [ingestText, setIngestText] = useState("");
  const [showIngest, setShowIngest] = useState(false);

  const queryMutation = useQueryKnowledgeBase();
  const ingestMutation = useIngestDocument();

  const handleSearch = (query: string) => {
    queryMutation.mutate(query, {
      onError: () => toast.error("Knowledge retrieval query failed."),
    });
  };

  const handleIngest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingestTitle || !ingestText) {
      toast.error("Please provide a title and content.");
      return;
    }
    ingestMutation.mutate(
      { title: ingestTitle, text: ingestText },
      {
        onSuccess: (data) => {
          toast.success(data.message || "Document indexed successfully!");
          setIngestTitle("");
          setIngestText("");
          setShowIngest(false);
        },
        onError: () => toast.error("Failed to ingest document."),
      }
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Clinical Knowledge Base</h1>
          <p className="text-sm text-slate-400 mt-1">
            Search medical guidelines, clinical SOPs, and home care directives in real-time.
          </p>
        </div>
        <button
          onClick={() => setShowIngest(!showIngest)}
          className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-colors"
        >
          {showIngest ? "Close Ingestion Form" : "Ingest New Guideline"}
        </button>
      </div>

      {showIngest && (
        <form
          onSubmit={handleIngest}
          className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 animate-slide-down"
        >
          <h3 className="text-sm font-bold text-white">Ingest Guideline Document</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Document Title</label>
              <input
                type="text"
                value={ingestTitle}
                onChange={(e) => setIngestTitle(e.target.value)}
                placeholder="e.g. Asthma Treatment Directives"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Document Content</label>
              <textarea
                value={ingestText}
                onChange={(e) => setIngestText(e.target.value)}
                placeholder="Enter markdown or plain text guidelines content to chunk and embed..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 text-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500 h-32 resize-none"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={ingestMutation.isPending}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            {ingestMutation.isPending ? "Indexing..." : "Index Document"}
          </button>
        </form>
      )}

      <KnowledgeSearch onSearch={handleSearch} loading={queryMutation.isPending} />

      <AnswerPanel
        answer={queryMutation.data?.data?.answer || ""}
        sources={queryMutation.data?.data?.sources || []}
        loading={queryMutation.isPending}
      />
    </div>
  );
};
