from sqlalchemy import or_

def apply_search(query, model, search_query, search_fields=None):
    """
    Applies a text search query across specified search fields using ILIKE.
    Supports both field name strings on the main model and direct SQLAlchemy attributes.
    """
    if not search_query or not search_fields:
        return query

    filters = []
    search_pattern = f"%{search_query}%"

    for field in search_fields:
        # Check if the field is a direct SQLAlchemy attribute (e.g. User.first_name)
        if hasattr(field, "ilike"):
            filters.append(field.ilike(search_pattern))
        elif isinstance(field, str):
            # Check if it is a string field name on the model
            if hasattr(model, field):
                filters.append(getattr(model, field).ilike(search_pattern))

    if filters:
        query = query.filter(or_(*filters))

    return query
