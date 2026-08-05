import logging
from app.celery_app import celery

logger = logging.getLogger(__name__)


@celery.task(name="tasks.scheduled.inactive_accounts.check_and_notify_inactive_users")
def check_and_notify_inactive_users():
    logger.info("Executing task: check_and_notify_inactive_users")
    try:
        from app.models.user import User
        from datetime import datetime, timedelta

        threshold = datetime.utcnow() - timedelta(days=180)
        inactive_users = User.query.filter(User.updated_at <= threshold, User.is_active == True).all()

        count = len(inactive_users)
        logger.info(f"Identified {count} inactive accounts.")
        return {"status": "success", "inactive_count": count}
    except Exception as e:
        logger.error(f"Error in inactive accounts check: {str(e)}")
        return {"status": "error", "message": str(e)}
