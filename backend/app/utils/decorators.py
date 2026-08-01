from functools import wraps

from flask import jsonify
from flask_jwt_extended import get_jwt_identity

from app.models.user import User


def roles_required(*allowed_roles):
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            user_id = get_jwt_identity()

            user = User.query.get(user_id)

            if user is None:
                return jsonify({"message": "User not found"}), 404

            if not user.is_active:
                return jsonify({"message": "Account is inactive"}), 403

            if user.role not in allowed_roles:
                return (
                    jsonify(
                        {"message": "You are not authorized to perform this action"}
                    ),
                    403,
                )

            return fn(*args, **kwargs)

        return wrapper

    return decorator
