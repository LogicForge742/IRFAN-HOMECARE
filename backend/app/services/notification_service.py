from app.models.notification import Notification
from app.repositories.notification_repository import NotificationRepository


class NotificationService:

    @staticmethod
    def create_notification(
        user_id,
        title,
        message,
        notification_type,
    ):

        notification = Notification(
            user_id=user_id,
            title=title,
            message=message,
            notification_type=notification_type,
        )

        NotificationRepository.create(notification)

        notification_data = {
            "id": notification.id,
            "title": notification.title,
            "notification_type": notification.notification_type,
            "message": notification.message,
            "is_read": notification.is_read,
            "created_at": notification.created_at.isoformat(),
        }

        # Emit SocketIO event to the user's specific room
        try:
            from app.socket.socketio import socketio
            socketio.emit(
                "notification",
                notification_data,
                room=f"user_{user_id}",
            )
        except Exception as e:
            import logging
            logging.getLogger(__name__).error(f"Failed to emit WebSocket notification: {str(e)}")

        return notification_data


    @staticmethod
    def get_user_notifications(user_id):

        notifications = NotificationRepository.get_by_user(user_id)

        return [
            {
                "id": notification.id,
                "title": notification.title,
                "message": notification.message,
                "notification_type": notification.notification_type,
                "is_read": notification.is_read,
                "created_at": notification.created_at.isoformat(),
            }
            for notification in notifications
        ]

    @staticmethod
    def mark_as_read(notification_id):

        notification = NotificationRepository.get_by_id(notification_id)

        if not notification:
            raise ValueError("Notification not found.")

        notification.is_read = True

        NotificationRepository.update()

        return {
            "id": notification.id,
            "is_read": notification.is_read,
        }
