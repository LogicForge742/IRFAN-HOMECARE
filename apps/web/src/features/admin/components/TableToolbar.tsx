import React from "react";
import { SearchBar } from "@/components/data-table/SearchBar";
import { PageSizeSelector } from "@/components/data-table/PageSizeSelector";

interface TableToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  perPage: number;
  onPerPageChange: (value: number) => void;
  searchPlaceholder?: string;
  children?: React.ReactNode;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({
  search,
  onSearchChange,
  perPage,
  onPerPageChange,
  searchPlaceholder = "Search records...",
  children,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 border border-b-0 border-slate-800 bg-slate-900/20 rounded-t-2xl">
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3">
        <SearchBar
          value={search}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
        {children}
      </div>

      <div className="flex items-center gap-2">
        <PageSizeSelector value={perPage} onChange={onPerPageChange} />
      </div>
    </div>
  );
};
export default TableToolbar;
