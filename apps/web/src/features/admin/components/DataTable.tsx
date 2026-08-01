import React from "react";
import { SortButton } from "@/components/data-table/SortButton";
import { LoadingSkeleton } from "@/components/data-table/LoadingSkeleton";
import { EmptyState } from "@/components/data-table/EmptyState";
import type { SortOrder } from "@/types/common/sorting";

export interface ColumnDef<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  sortBy?: string;
  sortOrder?: SortOrder;
  onSort?: (column: string) => void;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  onClearFilters?: () => void;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  isLoading,
  sortBy,
  sortOrder,
  onSort,
  emptyStateTitle,
  emptyStateDescription,
  onClearFilters,
}: DataTableProps<T>) {
  if (isLoading) {
    return <LoadingSkeleton rows={5} columns={columns.length} />;
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title={emptyStateTitle}
        description={emptyStateDescription}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <div className="overflow-x-auto border border-slate-800 bg-slate-900/40 rounded-2xl shadow-xl">
      <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-300 font-sans">
        <thead className="bg-slate-950/40 text-slate-400 text-xs font-semibold uppercase tracking-wider">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4">
                {col.sortable && onSort && sortBy && sortOrder ? (
                  <SortButton
                    column={col.key}
                    label={col.header}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSort={onSort}
                  />
                ) : (
                  <span>{col.header}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 bg-transparent">
          {data.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-slate-800/20 transition-colors"
            >
              {columns.map((col) => (
                <td key={`${row.id}-${col.key}`} className="px-6 py-4 whitespace-nowrap">
                  {col.render ? col.render(row) : String(row[col.key as keyof T] || "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default DataTable;
