export type SortOrder = "asc" | "desc";

export interface SortParams {
  sort_by?: string;
  sort_order?: SortOrder;
}
