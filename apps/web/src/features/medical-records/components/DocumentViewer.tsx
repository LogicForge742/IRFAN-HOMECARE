import type { MedicalDocument } from "@/types/medical-record";
import { FileDown, Paperclip } from "lucide-react";

export default function DocumentViewer({
  documents,
}: {
  documents: MedicalDocument[];
}) {
  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <a
          key={doc.id}
          href={doc.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 hover:border-emerald-500/50 hover:text-white transition group"
        >
          <div className="flex items-center space-x-2">
            <Paperclip className="w-4 h-4 text-emerald-400" />
            <span className="font-medium">{doc.filename}</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-[10px] text-slate-400">
              {doc.category}
            </span>
          </div>
          <FileDown className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
        </a>
      ))}
    </div>
  );
}
