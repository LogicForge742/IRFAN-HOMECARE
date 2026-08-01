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

        return {
            "id": notification.id,
            "title": notification.title,
            "message": notification.message,
            "notification_type": notification.notification_type,
            "is_read": notification.is_read,
            "created_at": notification.created_at.isoformat(),
        }

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
