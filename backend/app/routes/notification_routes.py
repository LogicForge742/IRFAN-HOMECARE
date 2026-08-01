from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.services.notification_service import NotificationService

notification_bp = Blueprint(
    "notifications",
    __name__,
    url_prefix="/api/notifications",
)


@notification_bp.get("/")
@jwt_required()
def get_notifications():

    user_id = get_jwt_identity()

    notifications = NotificationService.get_user_notifications(user_id)

    return jsonify({"data": notifications}), 200


@notification_bp.patch("/<notification_id>/read")
@jwt_required()
def mark_notification_as_read(
    notification_id,
):

    try:

        result = NotificationService.mark_as_read(notification_id)

        return (
            jsonify(
                {
                    "message": "Notification marked as read.",
                    "data": result,
                }
            ),
            200,
        )

    except ValueError as error:

        return jsonify({"message": str(error)}), 404
