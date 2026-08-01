import React from "react";

interface PageSizeSelectorProps {
  value: number;
  options?: number[];
  onChange: (value: number) => void;
}

export const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({
  value,
  options = [5, 10, 25, 50],
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-slate-400">
      <span>Rows per page:</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="px-2 py-1 bg-slate-900 border border-slate-800 text-white rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer transition-colors"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
export default PageSizeSelector;
