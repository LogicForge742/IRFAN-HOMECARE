import logging
from app.celery_app import celery

logger = logging.getLogger(__name__)


@celery.task(name="tasks.scheduled.audit_archiver.archive_old_audit_logs")
def archive_old_audit_logs():
    logger.info("Executing task: archive_old_audit_logs")
    try:
        from app.models.audit_log import AuditLog
        from datetime import datetime, timedelta

        threshold = datetime.utcnow() - timedelta(days=90)
        logs_to_archive = AuditLog.query.filter(AuditLog.created_at <= threshold).all()

        archived_count = len(logs_to_archive)
        logger.info(f"Archived {archived_count} audit log records.")
        return {"status": "success", "archived_count": archived_count}
    except Exception as e:
        logger.error(f"Error archiving audit logs: {str(e)}")
        return {"status": "error", "message": str(e)}
