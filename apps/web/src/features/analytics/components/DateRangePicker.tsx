import React from "react";
import { Calendar } from "lucide-react";

interface DateRangePickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ value, onChange }) => {
  const options = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 3 Months" },
    { value: "180d", label: "Last 6 Months" },
    { value: "365d", label: "Last 12 Months" },
  ];

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Calendar className="h-4 w-4 text-slate-400" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-9 pr-8 py-2 border border-slate-800 bg-slate-900 text-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-all"
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
export default DateRangePicker;
