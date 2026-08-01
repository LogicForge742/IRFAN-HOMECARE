from app.celery_app import celery
from app.services.notification_service import NotificationService


@celery.task(
    bind=True,
    max_retries=3,
)
def create_notification_task(
    self,
    user_id,
    title,
    message,
    notification_type="general",
):
    """
    Background task for notification creation.
    """
    return NotificationService.create_notification(
        user_id=user_id,
        title=title,
        message=message,
        notification_type=notification_type,
    )
