import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import type { SortOrder } from "@/types/common/sorting";

interface UseSortingOptions {
  defaultSortBy?: string;
  defaultSortOrder?: SortOrder;
  syncWithUrl?: boolean;
}

export function useSorting(options: UseSortingOptions = {}) {
  const { defaultSortBy, defaultSortOrder = "desc", syncWithUrl = true } = options;
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = syncWithUrl
    ? searchParams.get("sort_by") || defaultSortBy || ""
    : defaultSortBy || "";

  const sortOrder = syncWithUrl
    ? (searchParams.get("sort_order") as SortOrder) || defaultSortOrder
    : defaultSortOrder;

  const toggleSort = useCallback(
    (column: string) => {
      if (!syncWithUrl) return;

      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (sortBy === column) {
          const nextOrder = sortOrder === "asc" ? "desc" : "asc";
          next.set("sort_order", nextOrder);
        } else {
          next.set("sort_by", column);
          next.set("sort_order", "asc");
        }
        next.set("page", "1"); // Reset page
        return next;
      });
    },
    [syncWithUrl, sortBy, sortOrder, setSearchParams]
  );

  return {
    sortBy,
    sortOrder,
    toggleSort,
  };
}
export default useSorting;
