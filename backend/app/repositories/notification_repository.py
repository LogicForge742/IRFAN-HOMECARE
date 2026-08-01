from app.extensions import db
from app.models.notification import Notification


class NotificationRepository:

    @staticmethod
    def create(notification):
        db.session.add(notification)
        db.session.commit()
        return notification

    @staticmethod
    def get_by_id(notification_id):
        return Notification.query.get(notification_id)

    @staticmethod
    def get_by_user(user_id):
        return (
            Notification.query.filter_by(user_id=user_id)
            .order_by(Notification.created_at.desc())
            .all()
        )

    @staticmethod
    def get_unread_by_user(user_id):
        return (
            Notification.query.filter_by(
                user_id=user_id,
                is_read=False,
            )
            .order_by(Notification.created_at.desc())
            .all()
        )

    @staticmethod
    def update():
        db.session.commit()

    @staticmethod
    def delete(notification):
        db.session.delete(notification)
        db.session.commit()
