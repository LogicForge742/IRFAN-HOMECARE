import React from "react";
import { Pagination } from "@/components/data-table/Pagination";

interface TablePaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  onPageChange: (page: number) => void;
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  totalPages,
  totalItems,
  perPage,
  onPageChange,
}) => {
  return (
    <div className="border border-t-0 border-slate-800 rounded-b-2xl bg-slate-900/10">
      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        perPage={perPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};
export default TablePagination;
