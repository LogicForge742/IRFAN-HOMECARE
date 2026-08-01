def apply_sorting(query, model, sort_by=None, sort_order="desc"):
    """
    Applies sorting parameters to an SQLAlchemy query.
    Falls back to created_at or id descending if no sort_by is specified.
    """
    is_desc = str(sort_order).lower() == "desc"

    if not sort_by:
        if hasattr(model, "created_at"):
            col = getattr(model, "created_at")
            query = query.order_by(col.desc() if is_desc else col.asc())
        elif hasattr(model, "id"):
            col = getattr(model, "id")
            query = query.order_by(col.desc() if is_desc else col.asc())
        return query

    # Handle standard columns
    if hasattr(model, sort_by):
        col = getattr(model, sort_by)
        if is_desc:
            query = query.order_by(col.desc())
        else:
            query = query.order_by(col.asc())
            
    return query
