import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

interface UsePaginationOptions {
  defaultPage?: number;
  defaultPerPage?: number;
  syncWithUrl?: boolean;
}

export function usePagination(options: UsePaginationOptions = {}) {
  const { defaultPage = 1, defaultPerPage = 10, syncWithUrl = true } = options;
  const [searchParams, setSearchParams] = useSearchParams();

  const page = syncWithUrl
    ? Number(searchParams.get("page")) || defaultPage
    : defaultPage;

  const perPage = syncWithUrl
    ? Number(searchParams.get("per_page")) || defaultPerPage
    : defaultPerPage;

  const setPage = useCallback(
    (newPage: number) => {
      if (syncWithUrl) {
        setSearchParams((prev) => {
          const next = new URLSearchParams(prev);
          next.set("page", String(newPage));
          return next;
        });
      }
    },
    [syncWithUrl, setSearchParams]
  );

  const setPerPage = useCallback(
    (newPerPage: number) => {
      if (syncWithUrl) {
        setSearchParams((prev) => {
          const next = new URLSearchParams(prev);
          next.set("per_page", String(newPerPage));
          next.set("page", "1"); // Reset to page 1 when page size changes
          return next;
        });
      }
    },
    [syncWithUrl, setSearchParams]
  );

  return {
    page,
    perPage,
    setPage,
    setPerPage,
  };
}
export default usePagination;
