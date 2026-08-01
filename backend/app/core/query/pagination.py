def paginate(query, page=1, per_page=10):
    """
    Applies offset and limit pagination to an SQLAlchemy query.
    Returns a dict with items and pagination metadata.
    """
    page = int(page) if page else 1
    per_page = int(per_page) if per_page else 10

    if page < 1:
        page = 1
    if per_page < 1:
        per_page = 10
    elif per_page > 100:
        per_page = 100

    total = query.count()
    items = query.offset((page - 1) * per_page).limit(per_page).all()
    pages = (total + per_page - 1) // per_page if total > 0 else 0

    return {
        "items": items,
        "metadata": {
            "total": total,
            "page": page,
            "per_page": per_page,
            "pages": pages,
            "has_next": page < pages,
            "has_prev": page > 1,
        }
    }
