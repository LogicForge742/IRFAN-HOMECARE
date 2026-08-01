import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { usePagination } from "./usePagination";
import { useSearch } from "./useSearch";
import { useSorting } from "./useSorting";
import type { SortOrder } from "@/types/common/sorting";
import type { FilterParams } from "@/types/common/filter";

interface UseFiltersOptions {
  defaultPage?: number;
  defaultPerPage?: number;
  defaultSortBy?: string;
  defaultSortOrder?: SortOrder;
  syncWithUrl?: boolean;
}

export function useFilters(options: UseFiltersOptions = {}) {
  const {
    defaultPage,
    defaultPerPage,
    defaultSortBy,
    defaultSortOrder,
    syncWithUrl = true,
  } = options;

  const [searchParams, setSearchParams] = useSearchParams();

  const { page, perPage, setPage, setPerPage } = usePagination({
    defaultPage,
    defaultPerPage,
    syncWithUrl,
  });

  const { search, setSearch } = useSearch({
    syncWithUrl,
  });

  const { sortBy, sortOrder, toggleSort } = useSorting({
    defaultSortBy,
    defaultSortOrder,
    syncWithUrl,
  });

  // Extract all other parameters as filters
  const filters = useMemo(() => {
    const filterObj: FilterParams = {};
    if (!syncWithUrl) return filterObj;

    const exclude = ["page", "per_page", "search", "query", "sort_by", "sort_order"];
    searchParams.forEach((value, key) => {
      if (!exclude.includes(key)) {
        filterObj[key] = value;
      }
    });

    return filterObj;
  }, [searchParams, syncWithUrl]);

  const setFilter = useCallback(
    (key: string, value: any) => {
      if (!syncWithUrl) return;

      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value === undefined || value === null || value === "" || value === "ALL") {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
        next.set("page", "1"); // Reset page
        return next;
      });
    },
    [syncWithUrl, setSearchParams]
  );

  const clearFilters = useCallback(() => {
    if (!syncWithUrl) return;

    setSearchParams((prev) => {
      const next = new URLSearchParams();
      const pageVal = prev.get("page");
      const perPageVal = prev.get("per_page");
      const sortByVal = prev.get("sort_by");
      const sortOrderVal = prev.get("sort_order");

      if (pageVal) next.set("page", pageVal);
      if (perPageVal) next.set("per_page", perPageVal);
      if (sortByVal) next.set("sort_by", sortByVal);
      if (sortOrderVal) next.set("sort_order", sortOrderVal);

      return next;
    });
  }, [syncWithUrl, setSearchParams]);

  // Combine parameters to send to the API client
  const queryParams = useMemo(() => {
    return {
      page,
      per_page: perPage,
      search,
      sort_by: sortBy || undefined,
      sort_order: sortOrder,
      ...filters,
    };
  }, [page, perPage, search, sortBy, sortOrder, filters]);

  return {
    page,
    perPage,
    setPage,
    setPerPage,
    search,
    setSearch,
    sortBy,
    sortOrder,
    toggleSort,
    filters,
    setFilter,
    clearFilters,
    queryParams,
  };
}
export default useFilters;
