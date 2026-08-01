export interface PaginationMetadata {
  total: number;
  page: number;
  per_page: number;
  pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  metadata: PaginationMetadata;
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
}
