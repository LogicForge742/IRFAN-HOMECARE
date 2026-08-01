import React, { useState } from "react";
import { UploadCloud, File, Check } from "lucide-react";

export default function FileUpload() {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
        <UploadCloud className="w-4 h-4 text-emerald-400" />
        <span>Attach Medical Document / Lab Result</span>
      </label>

      <div className="relative border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-xl p-4 bg-slate-950 text-center cursor-pointer transition">
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
        {fileName ? (
          <div className="flex items-center justify-center space-x-2 text-xs text-emerald-400 font-semibold">
            <Check className="w-4 h-4" />
            <span>Attached: {fileName}</span>
          </div>
        ) : (
          <div className="space-y-1 text-slate-400">
            <File className="w-6 h-6 mx-auto text-slate-500" />
            <p className="text-xs font-medium">
              Click or drag file to attach clinical document (PDF, PNG, JPG)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
