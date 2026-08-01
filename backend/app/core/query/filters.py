def apply_filters(query, model, filters_dict):
    """
    Applies filtering parameters dynamically to an SQLAlchemy query.
    Supports exact match, date ranges, and custom operators via suffixes.
    """
    if not filters_dict:
        return query

    for key, value in filters_dict.items():
        if value is None or value == "":
            continue

        # Handle explicit date range filters
        if key == "date_from":
            if hasattr(model, "appointment_date"):
                query = query.filter(model.appointment_date >= value)
            elif hasattr(model, "created_at"):
                query = query.filter(model.created_at >= value)
            continue
        elif key == "date_to":
            if hasattr(model, "appointment_date"):
                query = query.filter(model.appointment_date <= value)
            elif hasattr(model, "created_at"):
                query = query.filter(model.created_at <= value)
            continue

        # Handle operators via suffixes: _gte, _lte, _gt, _lt, _in
        if key.endswith("_gte"):
            col_name = key[:-4]
            if hasattr(model, col_name):
                query = query.filter(getattr(model, col_name) >= value)
            continue
        elif key.endswith("_lte"):
            col_name = key[:-4]
            if hasattr(model, col_name):
                query = query.filter(getattr(model, col_name) <= value)
            continue
        elif key.endswith("_gt"):
            col_name = key[:-3]
            if hasattr(model, col_name):
                query = query.filter(getattr(model, col_name) > value)
            continue
        elif key.endswith("_lt"):
            col_name = key[:-3]
            if hasattr(model, col_name):
                query = query.filter(getattr(model, col_name) < value)
            continue
        elif key.endswith("_in"):
            col_name = key[:-3]
            if hasattr(model, col_name) and isinstance(value, (list, tuple)):
                query = query.filter(getattr(model, col_name).in_(value))
            continue

        # Default exact match if the attribute exists on the model
        if hasattr(model, key):
            query = query.filter(getattr(model, key) == value)

    return query
