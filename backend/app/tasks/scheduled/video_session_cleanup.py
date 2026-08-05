import logging
from app.celery_app import celery

logger = logging.getLogger(__name__)


@celery.task(name="tasks.scheduled.video_session_cleanup.purge_stale_video_rooms")
def purge_stale_video_rooms():
    logger.info("Executing task: purge_stale_video_rooms")
    try:
        from app.models.appointment import Appointment
        from datetime import datetime, timedelta

        stale_threshold = datetime.utcnow() - timedelta(hours=2)
        stale_sessions = Appointment.query.filter(
            Appointment.appointment_date <= stale_threshold,
            Appointment.status == "IN_PROGRESS",
        ).all()

        for session in stale_sessions:
            session.status = "COMPLETED"

        logger.info(f"Purged {len(stale_sessions)} stale telehealth video rooms.")
        return {"status": "success", "purged_rooms": len(stale_sessions)}
    except Exception as e:
        logger.error(f"Error purging video sessions: {str(e)}")
        return {"status": "error", "message": str(e)}
