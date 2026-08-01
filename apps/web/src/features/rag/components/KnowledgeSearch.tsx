import React, { useState } from "react";

interface KnowledgeSearchProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

export const KnowledgeSearch: React.FC<KnowledgeSearchProps> = ({ onSearch, loading }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center bg-slate-900 border border-slate-800 rounded-xl p-2 shadow-lg"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a medical guideline or system protocol query..."
        className="w-full pl-4 pr-12 py-3 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={loading || !query.trim()}
        className="absolute right-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors"
      >
        {loading ? "Searching..." : "Ask"}
      </button>
    </form>
  );
};
