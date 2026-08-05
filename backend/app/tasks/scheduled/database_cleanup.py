import logging
from app.celery_app import celery

logger = logging.getLogger(__name__)


@celery.task(name="tasks.scheduled.database_cleanup.cleanup_expired_data")
def cleanup_expired_data():
    logger.info("Executing task: cleanup_expired_data")
    try:
        from app.models.notification import Notification
        from datetime import datetime, timedelta

        threshold = datetime.utcnow() - timedelta(days=30)
        old_read_notifications = Notification.query.filter(
            Notification.is_read == True,
            Notification.created_at <= threshold,
        ).all()

        deleted_count = len(old_read_notifications)
        logger.info(f"Purged {deleted_count} old notifications.")
        return {"status": "success", "purged_records": deleted_count}
    except Exception as e:
        logger.error(f"Error in database cleanup: {str(e)}")
        return {"status": "error", "message": str(e)}
