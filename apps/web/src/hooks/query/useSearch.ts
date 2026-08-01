import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "@/utils/query/debounce";

interface UseSearchOptions {
  debounceDelay?: number;
  syncWithUrl?: boolean;
}

export function useSearch(options: UseSearchOptions = {}) {
  const { debounceDelay = 300, syncWithUrl = true } = options;
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialValue = () => {
    if (syncWithUrl) {
      return searchParams.get("search") || searchParams.get("query") || "";
    }
    return "";
  };

  const [searchValue, setSearchValue] = useState(getInitialValue);

  // Debounced search-params updater
  const debouncedUpdateUrl = useCallback(
    debounce((value: string) => {
      if (syncWithUrl) {
        setSearchParams((prev) => {
          const next = new URLSearchParams(prev);
          if (value) {
            next.set("search", value);
          } else {
            next.delete("search");
            next.delete("query");
          }
          next.set("page", "1"); // Reset to page 1 on new search
          return next;
        });
      }
    }, debounceDelay),
    [syncWithUrl, setSearchParams, debounceDelay]
  );

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    debouncedUpdateUrl(value);
  };

  // Keep in sync with external search param changes (e.g. back navigation)
  useEffect(() => {
    if (syncWithUrl) {
      const urlVal = searchParams.get("search") || searchParams.get("query") || "";
      if (urlVal !== searchValue) {
        setSearchValue(urlVal);
      }
    }
  }, [searchParams, syncWithUrl, searchValue]);

  return {
    search: searchValue,
    setSearch: handleSearchChange,
  };
}
export default useSearch;
