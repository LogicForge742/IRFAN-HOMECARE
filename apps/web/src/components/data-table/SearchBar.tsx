import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  placeholder = "Search...",
  onChange,
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalValue(val);
    onChange(val);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-slate-400" />
      </div>
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="block w-full pl-9 pr-10 py-2 border border-slate-800 bg-slate-905/90 text-white rounded-xl text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-white text-slate-400 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
export default SearchBar;
