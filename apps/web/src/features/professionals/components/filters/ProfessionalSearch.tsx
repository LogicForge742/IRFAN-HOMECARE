import React from "react";
import { SearchBar } from "@/components/data-table/SearchBar";

interface ProfessionalSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProfessionalSearch: React.FC<ProfessionalSearchProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-full">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
        Search Keyword
      </label>
      <SearchBar
        value={value}
        onChange={onChange}
        placeholder="Search by name, bio, specialization..."
      />
    </div>
  );
};
export default ProfessionalSearch;
