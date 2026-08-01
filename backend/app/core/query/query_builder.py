from app.core.query.filters import apply_filters
from app.core.query.search import apply_search
from app.core.query.sorting import apply_sorting
from app.core.query.pagination import paginate

def build_query(query, model, params, search_fields=None):
    """
    Extracts search, sorting, and pagination parameters from params,
    filters the rest, and applies them all to the SQLAlchemy query.
    Returns a dictionary with items and pagination metadata.
    """
    params = params or {}

    # Extract query keys
    search_query = params.get("search") or params.get("query")
    sort_by = params.get("sort_by")
    sort_order = params.get("sort_order", "desc")
    page = params.get("page", 1)
    per_page = params.get("per_page", 10)

    # Exclude keywords to leave pure filtering fields
    exclude_keys = ["search", "query", "sort_by", "sort_order", "page", "per_page"]
    filters_dict = {k: v for k, v in params.items() if k not in exclude_keys}

    # Apply operations
    query = apply_search(query, model, search_query, search_fields)
    query = apply_filters(query, model, filters_dict)
    query = apply_sorting(query, model, sort_by, sort_order)

    # Paginate results
    return paginate(query, page, per_page)
