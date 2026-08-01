import React from "react";

interface FilterDropdownOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label?: string;
  value: string;
  options: FilterDropdownOption[];
  onChange: (value: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-3 py-2 border border-slate-800 bg-slate-900 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default FilterDropdown;
