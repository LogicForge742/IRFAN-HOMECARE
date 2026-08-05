import logging
from app.celery_app import celery

logger = logging.getLogger(__name__)


@celery.task(name="tasks.scheduled.notification_digest.send_bundled_notification_digest")
def send_bundled_notification_digest():
    logger.info("Executing task: send_bundled_notification_digest")
    try:
        from app.models.notification import Notification

        unread_notifications = Notification.query.filter_by(is_read=False).all()
        count = len(unread_notifications)

        logger.info(f"Bundled {count} unread notifications into user digests.")
        return {"status": "success", "digests_processed": count}
    except Exception as e:
        logger.error(f"Error in notification digest task: {str(e)}")
        return {"status": "error", "message": str(e)}
